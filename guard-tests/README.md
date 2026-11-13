# guard-tests: new tests are free, old tests need you

A hook for Claude Code. Claude writes as many new tests as it likes. When it
wants to change a test that is already committed, it has to stop and ask you.
A changed test is a changed requirement, and that is your call.

A guard rail, not a lock: it makes Claude stop and explain in normal work. A
model that wants around it gets around it, for example with a script.
`git status --short -- tests/` shows what changed.

| Claude wants to | The hook |
|---|---|
| write a new test file under `tests/` | lets it through, adds no prompt of its own |
| edit or overwrite a committed test, first time | refuses and tells Claude why: Claude has to explain to you which test and why |
| the same edit again, after you said yes | Claude Code asks you with the diff |
| write under `tests/` from Bash or PowerShell | blocks it (exit 2), Claude has to use Edit or Write |
| touch anything else | stays out of the way |

Why two steps: the docs say the permission prompt shows the hook's reason, but
in our test (Claude Code 2.1.321, Windows) it showed only the diff. The first
refusal makes Claude say the reason in the chat either way.

"Committed" means git tracks the file, so `git add` is enough. A test Claude
created in this session stays free until you add or commit it.

## Install

1. Copy `guard-tests.mjs` to `.claude/hooks/` in your project.
2. Merge `settings.json` into `.claude/settings.json`.
3. Your tests live somewhere else? Change `TEST_DIRS` at the top of the script.
4. Run `/hooks` in Claude Code. `guard-tests` must appear under PreToolUse.

You need Node.js and git on the path.

## Test the hook

```bash
node --test guard-tests/guard-tests.test.mjs
```

The tests build a throwaway git repository, pipe sample tool calls into the
hook and check its answer: deny, ask, pass or block. Then try it live: ask
Claude for a new spec (the hook lets it through), then ask it to change a committed one.
Claude explains first, and after your yes you get the prompt.

## Know it afterwards

```bash
git status --short -- tests/
```

`??` is untracked: a new test. `A` is added: a new test you staged with `git add`.
`M` is modified: a changed old test. You approved it, or look again.

## Limits

- Tested on Windows, with the Bash and the PowerShell tool.
- A script that writes files on its own, such as `node -e` or `python -c`,
  is not seen by the hook. `git status` sees it.
- The shell check is strict on purpose: a command that names `tests`, or
  runs inside it, and writes, moves or deletes files is blocked, also after
  `cd tests`. Short command words such as `ln`, `patch` or `ri` count as a
  word of their own, so `grep ac tests/` is blocked too; `grep -ri talk tests/`
  and `grep 'ac' tests/` pass.
- A diff file can name the test as its target, so `patch -p1 -i fix.diff` or
  `git apply fix.diff` change a test without naming `tests`; the hook does not
  read the diff. `git status --short -- tests/` shows the result.
- A git command that rewrites the whole working tree without naming `tests`,
  such as `git restore .` or `git restore --source=<commit> .`, is not
  checked. `git status --short -- tests/` shows the result.
- The hook remembers per session and file that Claude was told, in a small
  marker in your temp folder (`GUARD_TESTS_STATE_DIR` to move it).
- In our test the prompt offered only Yes or No, no "don't ask again", so
  every change to an old test was asked. The docs say some prompts offer only a one-time approval.
- If `node` or the script is missing, `|| exit 2` in `settings.json` turns the
  error into a block: every edit and shell command stops until you fix it.
  Loud on purpose, a hook that fails silently would let every change through.
- Not tested with subagents that work in their own git worktree.
- In `claude -p` and in `dontAsk` mode a prompt cannot be shown, so the
  change is denied.
