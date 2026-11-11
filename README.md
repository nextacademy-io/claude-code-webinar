# Claude Code Black Belt: the webinar repo

Slides, a task, a hook and a cheat sheet from the one-hour webinar "Claude Code Black Belt" by
[nextacademy.io](https://www.nextacademy.io), held on 11 November 2026.

The webinar shows on a real app how a coding agent works, and how to set limits it cannot cross:
the loop, a question that skips the loop, permissions, hooks, advice versus law, subagents, Claude
in a box, and why autonomy is earned by verification.

## What is in here

| File | What it is |
|---|---|
| [`TASK.md`](TASK.md) | The task: build the two rules from the webinar yourself, on [clash-conference](https://github.com/agilino/clash-conference), specs first, and guard the tests and the database with two hooks. |
| [`cheat-sheet.pdf`](cheat-sheet.pdf) | Four harnesses, one loop: the same moves in Claude Code, GitHub Copilot, Codex and OpenCode, each with its documentation link. |
| [`guard-tests/`](guard-tests/) | A hook for Claude Code: Claude writes new tests freely, a change to a committed test needs your approval. With its own tests. |
| [`slides/`](slides/) | The slides as a [Slidev](https://sli.dev) deck. The notes under each slide are the trainer's cues, in German. |
| [`slides.pdf`](slides.pdf) | The same slides as a PDF, without notes. |
| [`subagents/`](subagents/) | The three checkers from the webinar, and `rule-checker`: a subagent that can read but never edit. |
| [`effort-race/`](effort-race/) | The race from the webinar: the same review at low and high effort, measured and scored. Run it with your own model. |
| [`.devcontainer/`](.devcontainer/) | Claude in a box: a dev container with Claude Code and Node, ready to open. |

The verification kit is the branch `webinar-solution` of clash-conference: the hook `guard-tests`,
the hook that guards `dev.db`, and the rules in `CLAUDE.md`.

## Show the slides

You need Node.js 20.19+, 22.12+ or 24+ and npm.

```bash
cd slides
npm install
npm run dev
```

The deck opens at `http://localhost:3030`. Notes: `http://localhost:3030/presenter/`.
`npm run export` writes a PDF to `slides/dist/`.

## Claude in a box

You need Docker, Node.js on your machine, and VS Code with the
[Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

1. Clone this repo and open it in VS Code.
2. Run **Dev Containers: Reopen in Container** from the Command Palette (`Ctrl+Shift+P`).
3. Open a terminal in the container and run `claude`. Sign in once; a volume keeps the sign-in.

No browser sign-in possible? Run `claude setup-token` on your machine and put the token into
`.devcontainer/.env` as `CLAUDE_CODE_OAUTH_TOKEN=…` (see `.env.example`). The file is git-ignored
and created empty when missing; it is loaded when the container starts. The token uses your Claude
subscription.

Three layers keep secrets from the commands Claude runs:

- `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` in the container removes credentials from the environment of
  every Bash command, hook and MCP server Claude starts. Claude Code keeps the token for its own calls.
- `.claude/settings.json` denies Claude reading `.env*`, `~/.claude/.credentials.json`, `~/.ssh` and
  `~/.aws`.
- The same file turns on the Bash sandbox. Windows has none; inside the Linux container it applies
  the deny rules to scripts too. The container installs `bubblewrap` and `socat`, which the sandbox
  needs on Linux, and sets `enableWeakerNestedSandbox` in its own user settings, not in the repo.
  Check with `/sandbox`: its Dependencies tab must not list either package.

Test it in the container: ask Claude to run a script that opens `.devcontainer/.env`. It must fail.

The scrub leaves empty stub files such as `package.json`, `.npmrc` and `.env` in the repo root. Git
ignores them. If a tool on your machine complains about an empty `package.json`, delete them.

Commands Claude runs execute in the container, not on your machine. The repo files stay on your
machine and are mounted in. The slides run in the container too: `npm --prefix slides run dev`,
then open `http://localhost:3030`.

Only use a dev container with repos you trust: a malicious project can take what is in the box,
including the sign-in in `~/.claude`. See
[Development containers](https://code.claude.com/docs/en/devcontainer).

## Go further

The course **Mastering Claude Code** builds the steps where nobody watches: subagents, agent teams,
workflows, MCP servers, `/batch` and CI. Three days, 24–26 November 2026. Book by 18 November 2026
and save 25 %: https://www.nextacademy.io/de/workshops/claude-code

© nextacademy.io, a project of SunsetPicnic UG (haftungsbeschränkt). All rights reserved.
