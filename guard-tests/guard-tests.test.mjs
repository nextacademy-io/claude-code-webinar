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

function run(input, cwd = project, state = stateDir, extraEnv = {}) {
  const result = spawnSync(process.execPath, [HOOK], {
    input: typeof input === "string" ? input : JSON.stringify(input),
    env: { ...process.env, CLAUDE_PROJECT_DIR: cwd, GUARD_TESTS_STATE_DIR: state, ...extraEnv },
    encoding: "utf8",
    timeout: 10000,
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

// On Linux and macOS a backslash is an ordinary character, not a separator.
test("a Windows path with backslashes is recognised", { skip: process.platform !== "win32" && "Windows paths only" }, () => {
  const file = `${project.replace(/\//g, "\\")}\\tests\\talks.spec.ts`;
  assert.equal(run(edit(file)).decision, "ask");
});

test("a relative path is recognised", () => {
  assert.equal(run(edit("tests/talks.spec.ts")).decision, "ask");
});

test("a committed test spelled in another case is recognised", () => {
  assert.equal(run(edit("Tests/Talks.spec.ts")).decision, "ask");
});

test("GIT_LITERAL_PATHSPECS does not hide a committed test", () => {
  const result = run(edit("tests/talks.spec.ts"), project, stateDir, { GIT_LITERAL_PATHSPECS: "1" });
  assert.equal(result.decision, "ask");
});

test("a long line of git options does not hang the hook", () => {
  const command = "git" + " --x".repeat(40) + " version; cd tests && printf x > talks.spec.ts";
  const result = run(shell("Bash", command));
  assert.equal(result.code, 2);
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
  ["Bash", "cd tests && printf x > talks.spec.ts"],
  ["Bash", "sed -Ei 's/a/b/' tests/talks.spec.ts"],
  ["Bash", "sed --in-place 's/a/b/' tests/talks.spec.ts"],
  ["Bash", "cd -- tests && printf x > talks.spec.ts"],
  ["Bash", "printf x >| tests/talks.spec.ts"],
  ["Bash", "git -C tests restore talks.spec.ts"],
  ["Bash", "git -c core.autocrlf=false checkout -- tests/talks.spec.ts"],
  ["Bash", "printf x >tests/talks.spec.ts"],
  ["Bash", "printf x >>tests/talks.spec.ts"],
  ["Bash", "printf x >|tests/talks.spec.ts"],
  ["Bash", "printf x 2>tests/talks.spec.ts"],
  ["PowerShell", "Set-Location -Path tests; 'x' > talks.spec.ts"],
  ["PowerShell", "Set-Location -LiteralPath tests; 'x' > talks.spec.ts"],
  ["PowerShell", "Push-Location tests; 'x' > talks.spec.ts"],
  ["Bash", "git stash push -- tests/"],
  ["Bash", "git clean -f tests/"],
  ["Bash", "awk -i inplace '{print}' tests/talks.spec.ts"],
  ["Bash", "patch tests/talks.spec.ts fix.diff"],
  ["Bash", "dd if=old.ts of=tests/talks.spec.ts"],
  ["Bash", "ln -sf ../old.ts tests/talks.spec.ts"],
  ["Bash", "rsync -a backup/ tests/"],
  ["PowerShell", "sc tests\\talks.spec.ts '// x'"],
  ["PowerShell", "ac tests\\talks.spec.ts '// x'"],
  ["PowerShell", "ni tests\\talks.spec.ts -Force"],
  ["PowerShell", "ri tests\\talks.spec.ts"],
  ["PowerShell", "cpi old.ts tests\\talks.spec.ts"],
  ["PowerShell", "Get-ChildItem tests | ri"],
  ["Bash", "find tests -name '*.ts' -exec ln -sf {} /tmp/x \\;"],
  ["Bash", "npm ci && patch -p1 tests/talks.spec.ts < fix.diff"],
  ["Bash", "for f in tests/*.spec.ts; do patch \"$f\" < fix.diff; done"],
  ["Bash", "if [ -f tests/talks.spec.ts ]; then dd if=old.ts of=tests/talks.spec.ts; fi"],
  ["Bash", "time patch tests/talks.spec.ts fix.diff"],
  ["Bash", "/usr/bin/patch tests/talks.spec.ts fix.diff"],
  ["Bash", "find tests -name '*.spec.ts' | xargs -n 1 ln -sf ../stub.ts"],
  ["PowerShell", "$null = ni tests\\talks.spec.ts -ItemType File -Force"],
  ["PowerShell", "Get-ChildItem tests -Filter *.ts | ri; git status"],
  ["PowerShell", "(Get-ChildItem tests | ri)"],
  ["PowerShell", "clc tests\\talks.spec.ts"],
  ["Bash", "ls tests/*.spec.ts | xargs -I {} ln -sf ../stub.ts {}"],
  ["Bash", "sudo -u node ln -sf ../stub.ts tests/talks.spec.ts"],
  ["Bash", "sh -c 'patch tests/talks.spec.ts fix.diff'"],
  ["Bash", "LC_ALL=C patch tests/talks.spec.ts fix.diff"],
  ["Bash", "powershell -Command \"ri tests\\talks.spec.ts\""],
  ["Bash", "printf x >& tests/talks.spec.ts"],
  ["Bash", "npx eslint --fix tests/talks.spec.ts"],
  ["Bash", "npx prettier --write tests/"],
  ["PowerShell", "xcopy /y old.ts tests\\talks.spec.ts"],
  ["PowerShell", "robocopy backup tests talks.spec.ts"],
  ["PowerShell", "cmd /c mklink /J t tests"],
  ["PowerShell", "(Get-Item tests\\talks.spec.ts).Delete()"],
  ["Bash", "cd \"C:\\Users\\me\\OneDrive - Contoso\\app\\tests\" && printf x > talks.spec.ts"],
  ["Bash", "printf x > \"/Users/me/My Projects/app/tests/talks.spec.ts\""],
  ["PowerShell", "Set-Location \"C:\\Users\\me\\OneDrive - Contoso\\app\\tests\"; 'x' > talks.spec.ts"],
  ["Bash", "perl -0pi -e 's/accepted/refused/' tests/talks.spec.ts"],
  ["Bash", "sed -I '' 's/accepted/refused/' tests/talks.spec.ts"],
  ["Bash", "gsed -i 's/accepted/refused/' tests/talks.spec.ts"],
  ["PowerShell", "Remove-Item lib\\old.ts,tests\\talks.spec.ts"],
  ["Bash", "sed -i 's/validateTalk/validateTalkInput/g' {lib,tests}/*.ts"],
  ["Bash", "rm -rf tests*"],
  ["Bash", "cd tests && printf x >& talks.spec.ts"],
  ["Bash", "find tests -name 'talks.spec.ts' -delete"],
  ["Bash", "git update-index --force-remove tests/talks.spec.ts"],
  ["Bash", "git reset -q HEAD~1 -- tests/talk-rules.spec.ts"],
  ["PowerShell", "$f = Get-Item tests\\talks.spec.ts; $f.Delete()"],
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
  ["Bash", "cd tests && npx playwright test talks.spec.ts 2>&1"],
  ["Bash", "cd tests && npx playwright test talks.spec.ts > /dev/null"],
  ["Bash", "npx playwright test tests/talk-rules.spec.ts 2>&1 | tail"],
  ["Bash", 'git add tests/talk-rules.spec.ts && git commit -m "add talk rule specs"'],
  ["Bash", "git -C tests status"],
  ["Bash", "git log --oneline -- tests/"],
  ["Bash", "git checkout origin/webinar-solution -- .claude/hooks/guard-db.mjs .claude/settings.json"],
  ["Bash", 'git add tests/talk-rules.spec.ts && git commit -m "restore the checkout rule specs"'],
  ["PowerShell", "cd tests; npx playwright test 2>$null"],
  ["PowerShell", "Set-Location -Path tests; npx playwright test *> $null"],
  ["Bash", "npm install && npx playwright test tests/talks.spec.ts"],
  ["Bash", "grep -ri talk tests/"],
  ["Bash", "grep -rni talk tests/"],
  ["Bash", "git diff --patch tests/"],
  ["Bash", "npx playwright test tests/ac.spec.ts"],
  ["PowerShell", "Select-String -Path tests\\*.ts -Pattern 'ni'"],
  ["Bash", "npx playwright test tests/move-talk.spec.ts"],
  ["Bash", "cat tests/copy.spec.ts"],
  ["Bash", "grep -rn \"copy\" tests/"],
  ["Bash", "git log --oneline --grep=move -- tests/"],
  ["Bash", "grep -rn \"talk.delete(\" tests/"],
]) {
  test(`${tool} passes: ${command}`, () => {
    const r = run(shell(tool, command));
    assert.equal(r.code, 0);
    assert.equal(r.decision, null);
  });
}

// A working directory inside tests/ counts like naming the folder

const inTests = (command) => ({ ...shell("Bash", command), cwd: path.join(project, "tests") });

test("a shell write with the working directory inside tests/ is blocked", () => {
  const r = run(inTests("sed -i 's/a/b/' talks.spec.ts"));
  assert.equal(r.code, 2);
  assert.match(r.stderr, /Blocked/);
});

test("a redirect with the working directory inside tests/ is blocked", () => {
  assert.equal(run(inTests("printf x > talks.spec.ts")).code, 2);
});

test("running tests with the working directory inside tests/ passes", () => {
  const r = run(inTests("npx playwright test talks.spec.ts 2>&1"));
  assert.equal(r.code, 0);
  assert.equal(r.decision, null);
});

// When the hook cannot check, it does not let the call through

test("when the session marker cannot be written it asks", () => {
  const blocker = path.join(stateDir, "a-file");
  writeFileSync(blocker, "");
  const r = run(edit(path.join(project, "tests", "talks.spec.ts"), "session-c"), project, path.join(blocker, "sub"));
  assert.equal(r.code, 0);
  assert.equal(r.decision, "ask");
});

test("an unexpected error inside the hook is blocked", () => {
  const r = run("null");
  assert.equal(r.code, 2);
  assert.match(r.stderr, /Blocked/);
});

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
