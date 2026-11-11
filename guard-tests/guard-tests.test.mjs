// Tests for guard-tests.mjs. Run: node --test guard-tests/guard-tests.test.mjs
// Each test pipes a sample tool call into the hook, as the Claude Code docs
// suggest, and checks the exit code and the decision it prints.

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOOK = path.join(path.dirname(fileURLToPath(import.meta.url)), "guard-tests.mjs");
let project;
let stateDir;

function git(...args) {
  const result = spawnSync("git", ["-c", "user.name=test", "-c", "user.email=test@example.com", ...args], {
    cwd: project,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
}

// A small project: two committed tests, one committed app file, one new test.
before(() => {
  project = mkdtempSync(path.join(tmpdir(), "guard-tests-"));
  stateDir = mkdtempSync(path.join(tmpdir(), "guard-tests-state-"));
  mkdirSync(path.join(project, "tests"));
  mkdirSync(path.join(project, "lib"));
  writeFileSync(path.join(project, "tests", "talks.spec.ts"), "// old test\n");
  writeFileSync(path.join(project, "tests", "rooms.spec.ts"), "// another old test\n");
  writeFileSync(path.join(project, "lib", "validation.ts"), "// app code\n");
  git("init", "-q");
  git("add", ".");
  git("commit", "-q", "-m", "start");
  writeFileSync(path.join(project, "tests", "talk-rules.spec.ts"), "// new test, not committed\n");
});

after(() => {
  rmSync(project, { recursive: true, force: true });
  rmSync(stateDir, { recursive: true, force: true });
});

function run(input, cwd = project) {
  const result = spawnSync(process.execPath, [HOOK], {
    input: typeof input === "string" ? input : JSON.stringify(input),
    env: { ...process.env, CLAUDE_PROJECT_DIR: cwd, GUARD_TESTS_STATE_DIR: stateDir },
    encoding: "utf8",
  });
  const output = result.stdout ? JSON.parse(result.stdout).hookSpecificOutput : {};
  return {
    code: result.status,
    decision: output.permissionDecision ?? null,
    reason: output.permissionDecisionReason ?? "",
    stderr: result.stderr,
  };
}

const edit = (file, session_id) => ({
  session_id,
  tool_name: "Edit",
  tool_input: { file_path: file, old_string: "a", new_string: "b" },
});
const write = (file) => ({ tool_name: "Write", tool_input: { file_path: file, content: "x" } });
const shell = (tool, command) => ({ tool_name: tool, tool_input: { command } });

// Old tests need you: first refused with a reason for Claude, then asked

test("first edit on a committed test is refused, with the reason for Claude", () => {
  const r = run(edit(path.join(project, "tests", "talks.spec.ts"), "session-a"));
  assert.equal(r.code, 0);
  assert.equal(r.decision, "deny");
  assert.match(r.reason, /committed test.*Tell the user/s);
});

test("the next edit on the same test in the same session asks", () => {
  assert.equal(run(edit(path.join(project, "tests", "talks.spec.ts"), "session-a")).decision, "ask");
});

test("another committed test in the same session is refused first", () => {
  assert.equal(run(edit(path.join(project, "tests", "rooms.spec.ts"), "session-a")).decision, "deny");
});

test("a new session is refused first again", () => {
  assert.equal(run(edit(path.join(project, "tests", "talks.spec.ts"), "session-b")).decision, "deny");
});

// Without a session id the hook cannot count attempts, so it asks right away

test("Edit on a committed test asks", () => {
  const r = run(edit(path.join(project, "tests", "talks.spec.ts")));
  assert.equal(r.code, 0);
  assert.equal(r.decision, "ask");
});

test("Write over a committed test asks", () => {
  assert.equal(run(write(path.join(project, "tests", "talks.spec.ts"))).decision, "ask");
});

test("a Windows path with backslashes is recognised", () => {
  const file = `${project.replace(/\//g, "\\")}\\tests\\talks.spec.ts`;
  assert.equal(run(edit(file)).decision, "ask");
});

test("a relative path is recognised", () => {
  assert.equal(run(edit("tests/talks.spec.ts")).decision, "ask");
});

// New tests are free

test("Write of a new test passes silently", () => {
  const r = run(write(path.join(project, "tests", "capacity.spec.ts")));
  assert.equal(r.code, 0);
  assert.equal(r.decision, null);
});

test("Edit on a new, uncommitted test passes silently", () => {
  assert.equal(run(edit(path.join(project, "tests", "talk-rules.spec.ts"))).decision, null);
});

test("Edit on app code passes silently", () => {
  const r = run(edit(path.join(project, "lib", "validation.ts")));
  assert.equal(r.code, 0);
  assert.equal(r.decision, null);
});

test("a file outside the project passes silently", () => {
  assert.equal(run(edit(path.join(tmpdir(), "tests", "x.spec.ts"))).decision, null);
});

// Shell writes under tests/ are blocked

for (const [tool, command] of [
  ["Bash", "sed -i 's/accepted/refused/' tests/talks.spec.ts"],
  ["Bash", "echo '// x' > tests/talks.spec.ts"],
  ["Bash", "git checkout -- tests/"],
  ["Bash", "rm tests/talks.spec.ts"],
  ["PowerShell", "Set-Content tests\\talks.spec.ts '// x'"],
  ["PowerShell", "Remove-Item .\\tests\\talks.spec.ts"],
  ["PowerShell", "'// x' | Out-File -FilePath tests/talks.spec.ts"],
  ["Bash", "cd tests && sed -i 's/accepted/refused/' talks.spec.ts"],
  ["PowerShell", "Set-Location tests; Set-Content talks.spec.ts '// x'"],
]) {
  test(`${tool} blocks: ${command}`, () => {
    const r = run(shell(tool, command));
    assert.equal(r.code, 2);
    assert.match(r.stderr, /Blocked/);
  });
}

// Shell commands that only read or run tests pass

for (const [tool, command] of [
  ["Bash", "npm test"],
  ["Bash", "npx playwright test tests/talks.spec.ts 2>&1"],
  ["Bash", "git status --short -- tests/"],
  ["Bash", "git diff --name-status HEAD -- tests/"],
  ["Bash", "cd tests && npx playwright test talks.spec.ts"],
  ["Bash", "cat tests/talks.spec.ts"],
  ["PowerShell", "Get-Content tests\\talks.spec.ts"],
  ["Bash", "echo done > notes.txt"],
]) {
  test(`${tool} passes: ${command}`, () => {
    const r = run(shell(tool, command));
    assert.equal(r.code, 0);
    assert.equal(r.decision, null);
  });
}

// When the hook cannot check, it does not let the call through

test("outside a git repository it asks", () => {
  const plain = mkdtempSync(path.join(tmpdir(), "guard-tests-nogit-"));
  try {
    assert.equal(run(edit(path.join(plain, "tests", "talks.spec.ts")), plain).decision, "ask");
  } finally {
    rmSync(plain, { recursive: true, force: true });
  }
});

test("unreadable input is blocked", () => {
  assert.equal(run("not json").code, 2);
});
