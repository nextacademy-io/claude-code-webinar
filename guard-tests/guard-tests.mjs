// PreToolUse hook for Claude Code: new tests are free, old tests need you.
//
// - Edit or Write on a NEW test file (not yet in git): passes silently.
// - Edit or Write on a test file that git already tracks: a changed test is a
//   changed requirement, so a human decides, in two steps:
//   1. The first attempt is refused, and Claude reads why. Claude has to tell
//      you which test it wants to change and why.
//   2. If Claude tries the same file again in this session, Claude Code asks
//      you with the diff. The docs say the prompt also shows the hook's
//      reason; in our test (Claude Code 2.1.321, Windows) it showed only the
//      diff. Step 1 makes sure you hear the reason either way.
// - A Bash or PowerShell command that writes under a test folder: blocked with
//   exit 2. Claude has to use Edit or Write, where the rule above applies.
//
// The tool call arrives as JSON on stdin. If the hook cannot check something,
// it asks or blocks instead of letting the call through.

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

// Folders that hold your tests, relative to the project root.
const TEST_DIRS = ["tests/"];

// Where the hook remembers "Claude was told about this test in this session".
const STATE_DIR = process.env.GUARD_TESTS_STATE_DIR || path.join(tmpdir(), "claude-guard-tests");

const FILE_TOOLS = new Set(["Edit", "Write", "MultiEdit", "NotebookEdit"]);
const SHELL_TOOLS = new Set(["Bash", "PowerShell"]);

const toSlash = (p) => p.replace(/\\/g, "/");
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const dirNames = TEST_DIRS.map((d) => escape(d.replace(/\/$/, "")));

// A test folder named in a command: "tests/x", "./tests/x", "tests\x", "C:\app\tests\x",
// ">tests/x", and the folder alone, as in "cd tests && ...".
const mentionsTestDir = new RegExp(
  `(^|[\\s"'=(:>|\\\\/])(${dirNames.join("|")})([\\\\/\\s"';&|)]|$)`,
  "i",
);

// Changing into a test folder: "cd tests", "cd -- tests", "pushd ./tests",
// "Set-Location -Path tests", "Push-Location tests".
const entersTestDir = new RegExp(
  `\\b(cd|pushd|chdir|sl|Set-Location|Push-Location)\\s+(--?\\w*\\s+)*["']?[^\\s"';&|]*\\b(${dirNames.join("|")})\\b`,
  "i",
);

// A redirect into a file: "> x", ">> x" and ">| x", but not "2>&1", ">&2",
// "> /dev/null" or "> $null".
const redirectsToFile = />>?\|?(?!\s*(&|\/dev\/null|\$null|nul\b))\s*["']?[^\s>]/i;

// Commands that write, move or delete files.
const writesFiles = [
  new RegExp(`>>?\\|?\\s*["']?[^\\s"'|;&]*(${dirNames.join("|")})[\\\\/]`, "i"), // redirect into a test folder
  /\bsed\b[^|;&]*\s(-[a-zA-Z]*i|--in-place)/, // -i, -Ei, -i.bak, --in-place
  /\bperl\b[^|;&]*\s-[a-z]*i/,
  /\b(tee|mv|cp|rm|rmdir|touch|truncate|unlink|del|erase|move|copy|ren)\b/i,
  /\bgit(\s+(-[cC]\s+\S+|--?[\w-]+(=\S+)?))*\s+(checkout|restore|rm|mv|apply)\b/i, // also "git -C tests restore x"
  /\b(Set-Content|Add-Content|Out-File|Clear-Content|New-Item|Remove-Item|Move-Item|Copy-Item|Rename-Item)\b/i,
  /\[(System\.)?IO\.File\]::/i,
];

function decide(permissionDecision, reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision, permissionDecisionReason: reason },
    }),
  );
  process.exit(0);
}

function block(reason) {
  console.error(reason);
  process.exit(2);
}

// "tracked", "untracked" or "unknown" (git missing or not a repository).
function gitStatus(root, rel) {
  const result = spawnSync("git", ["ls-files", "-z", "--", rel], { cwd: root, encoding: "utf8" });
  if (result.status !== 0) return "unknown";
  return result.stdout.length > 0 ? "tracked" : "untracked";
}

// True the first time Claude touches this test in this session.
function firstAttempt(sessionId, rel) {
  const marker = path.join(STATE_DIR, createHash("sha256").update(`${sessionId}\n${rel}`).digest("hex"));
  if (existsSync(marker)) return false;
  try {
    mkdirSync(STATE_DIR, { recursive: true });
    writeFileSync(marker, "");
  } catch {
    decide("ask", `${rel} is a committed test. The hook could not write its marker in ${STATE_DIR}.`);
  }
  return true;
}

function checkFile(root, file, sessionId) {
  const rel = toSlash(path.relative(root, path.resolve(root, file)));
  if (rel.startsWith("../") || path.isAbsolute(rel)) return; // outside the project
  const inTestDir = TEST_DIRS.some((dir) => rel.toLowerCase().startsWith(dir.toLowerCase()));
  if (!inTestDir) return;

  const status = gitStatus(root, rel);
  if (status === "untracked") return; // a new test
  if (status === "unknown") {
    decide("ask", `Could not ask git whether ${rel} is a committed test.`);
  }
  if (sessionId && firstAttempt(sessionId, rel)) {
    decide(
      "deny",
      `${rel} is a committed test, so changing it changes a requirement. Do not work around this. ` +
        "Tell the user which test you want to change and why, and ask whether the product rule really changed. " +
        "If they agree, make the same edit again: they will get a permission prompt to approve it.",
    );
  }
  decide("ask", `${rel} is a committed test.`);
}

// True if the path is a test folder or lies inside one.
function isInTestDir(root, target) {
  const rel = `${toSlash(path.relative(root, path.resolve(root, target)))}/`.toLowerCase();
  return TEST_DIRS.some((dir) => rel.startsWith(dir.toLowerCase()));
}

function checkCommand(command, root, cwd) {
  // A working directory inside a test folder counts like naming the folder.
  const startsInside = Boolean(cwd) && isInTestDir(root, cwd);
  if (!startsInside && !mentionsTestDir.test(command)) return;
  const writes =
    writesFiles.some((pattern) => pattern.test(command)) ||
    ((startsInside || entersTestDir.test(command)) && redirectsToFile.test(command));
  if (!writes) return;
  block(
    `Blocked: this command writes under ${TEST_DIRS.join(", ")}. ` +
      "Use the Write tool for a new test and the Edit tool for a committed one, so the user can review changes to old tests.",
  );
}

// Last resort: an unexpected error blocks the call (exit 1 would let it through).
process.on("uncaughtException", (error) => block(`Blocked: guard-tests failed: ${error.message}`));

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    block("Blocked: guard-tests could not read the tool call.");
  }
  const tool = input.tool_name ?? "";
  const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();

  if (FILE_TOOLS.has(tool)) {
    const file = input.tool_input?.file_path ?? input.tool_input?.notebook_path ?? "";
    if (file) checkFile(root, file, input.session_id);
  } else if (SHELL_TOOLS.has(tool)) {
    checkCommand(input.tool_input?.command ?? "", root, input.cwd);
  }
  process.exit(0);
});
