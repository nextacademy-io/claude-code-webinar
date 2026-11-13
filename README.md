# Claude Code Black Belt: the webinar repo

Slides, a task, a hook and a cheat sheet from the one-hour webinar "Claude Code Black Belt" by
[nextacademy.io](https://www.nextacademy.io), held on 11 November 2026.

The webinar shows on a real app how a coding agent works, and how to set limits it cannot cross:
the loop, a question that skips the loop, permissions, hooks, advice versus law, subagents, Claude
in a box, and why autonomy is earned by verification.

## What is in here

| File | What it is |
|---|---|
| [`TASK.md`](TASK.md) | The task: build the two rules from the webinar yourself, on [clash-conference](https://github.com/nextacademy-io/clash-conference), specs first, and guard the tests and the database with two hooks. |
| [`cheat-sheet.pdf`](cheat-sheet.pdf) | Four harnesses, one loop: the same moves in Claude Code, GitHub Copilot, Codex and OpenCode, each with its documentation link. |
| [`guard-tests/`](guard-tests/) | A hook for Claude Code: Claude writes new tests freely, a change to a committed test needs your approval. With its own tests. |
| [`slides/`](slides/) | The slides as a [Slidev](https://sli.dev) deck. The notes under each slide are the trainer's cues, in German. |
| [`claude-code-webinar.pdf`](claude-code-webinar.pdf) | The same slides as a PDF, without notes. |
| [`subagents/`](subagents/) | The prompt that started three Explore checkers in the webinar, and `rule-checker`: your own subagent that can read but never edit. |
| [`effort-race/`](effort-race/) | The race from the webinar: the same review at low and high effort, measured and scored. Run it yourself. |
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
`npm run export` writes `claude-code-webinar.pdf` to the repository root.

## Claude in a box

A dev container with Claude Code and Node: commands Claude runs execute in the container, not on
your machine. Three layers keep secrets from them: the token is scrubbed from their environment,
deny rules block reading secrets, and the Bash sandbox applies those rules to scripts too.

You need Docker, Node.js on your machine and VS Code with the Dev Containers extension.

1. On your machine, run `claude setup-token` and put the token into `.devcontainer/.env` as
   `CLAUDE_CODE_OAUTH_TOKEN=…` (git-ignored, see `.env.example`).
2. Open this repo in VS Code with the Dev Containers extension and run
   **Dev Containers: Reopen in Container**.
3. Run `claude` in the container terminal.

Setup without VS Code, how to check each layer and what to do when it gets stuck:
[docs/devcontainer.md](docs/devcontainer.md). Every claim in this repo with its source:
[docs/sources.md](docs/sources.md).

Only use a dev container with repos you trust. See
[Development containers](https://code.claude.com/docs/en/devcontainer).

## Go further

The course **Mastering Claude Code** builds the steps where nobody watches: subagents, agent teams,
workflows, MCP servers, `/batch` and CI. Three days, 24–26 November 2026. Book by 18 November 2026
with the code `TD2SJ59H` and save 25 %: https://www.nextacademy.io/de/workshops/claude-code

© nextacademy.io, a project of SunsetPicnic UG (haftungsbeschränkt). The folders `guard-tests/`,
`subagents/`, `effort-race/`, `.devcontainer/` and `.claude/` are MIT licensed, READMEs included,
see [LICENSE](LICENSE): copy them into your projects. The slides, the cheat sheet and the other
documents: all rights reserved.
