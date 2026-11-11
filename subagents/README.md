# Subagents: checkers that cannot change anything

In the webinar one prompt started three `Explore` subagents at once. Each checked one thing in its
own context window and sent back one line. Only the three answers landed in the main conversation,
not the files they read.

```text
Use three Explore subagents in parallel, read only:
1. Does the app refuse a start in the past?
2. Does it refuse two talks in one room at one start?
3. Which files under tests/ changed? (git status --short -- tests/)
Each answers in one line with file:line.
```

`rule-checker.md` is the same idea as your own subagent. Its tools are `Read`, `Grep` and `Glob`
only, so it can look but never edit: a checker that cannot change a test cannot bend one either.

## Use it

1. Copy `rule-checker.md` to `.claude/agents/` in your project (or `~/.claude/agents/` for all
   projects).
2. Run `/agents` in Claude Code: `rule-checker` must appear.
3. Ask for it by name, one rule per checker:

```text
Use three rule-checker subagents in parallel, one per rule:
a start in the past is refused, two talks never share a room and a start,
a talk cannot be saved without a title.
```

Docs: https://code.claude.com/docs/en/sub-agents
