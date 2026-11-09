# Claude Code Black Belt: the webinar repo

Slides, a task and a cheat sheet from the one-hour webinar "Claude Code Black Belt" by
[nextacademy.io](https://www.nextacademy.io), held on 11 November 2026.

The webinar shows on a real app how a coding agent works, and how to set limits it cannot cross:
the loop, a question that skips the loop, permissions, hooks, advice versus law, the sandbox, and
why autonomy is earned by verification.

## What is in here

| File | What it is |
|---|---|
| [`TASK.md`](TASK.md) | The task: build the two rules from the webinar yourself, on [clash-conference](https://github.com/agilino/clash-conference), and lock them with a deny rule and a hook. |
| [`cheat-sheet.pdf`](cheat-sheet.pdf) | Four harnesses, one loop: the same moves in Claude Code, GitHub Copilot, Codex and OpenCode, each with its documentation link. |
| [`guard-tests/`](guard-tests/) | A hook for Claude Code: Claude writes new tests freely, a change to a committed test needs your approval. With its own tests. |
| [`slides/`](slides/) | The slides as a [Slidev](https://sli.dev) deck. The notes under each slide explain it in German. |

The verification kit is the branch `webinar-solution` of clash-conference: the deny on `tests/**`,
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

## Go further

The course **Mastering Claude Code** builds the steps where nobody watches: subagents, agent teams,
workflows, MCP servers, `/batch` and CI. Three days, 24–26 November 2026. Book by 18 November 2026
and save 25 %: https://www.nextacademy.io/de/workshops/claude-code

© nextacademy.io, a project of SunsetPicnic UG (haftungsbeschränkt). All rights reserved.
