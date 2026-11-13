# Sources

The evidence behind every factual claim in this repo: slides, READMEs and task. Checked 13 November 2026. Found an error? Write to adam@agilino.ch.

## Slides

### Fluent is not the same as true

| Claim | Source | Quote |
|---|---|---|
| Claude reads your code on its own | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "You don't need to specify which files to read or what commands to run. Claude figures that out." |
| Without a tool call first, the answer comes from training and can be wrong | Not in the docs | Observed in the live demo: the quick question got a confident wrong answer with no tool call before it. |
| Edit deny rules also cover `sed` and `tee` in Bash | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Read and Edit deny rules apply to Claude's built-in file tools, to file commands Claude Code recognizes in Bash, such as `cat`, `head`, `tail`, `sed`, and `tee`" |
| Edit deny rules also cover `>` in Bash | [Configure permissions](https://code.claude.com/docs/en/permissions) | "for `> file`, `>> file`, or `2> file`, the check covers your `Edit` allow and deny rules" |
| The `tee` check needs a recent version | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Claude Code checks `tee` targets in v2.1.269 and later." |

### The loop

| Claim | Source | Quote |
|---|---|---|
| Claude Code is the harness around the model | [Glossary](https://code.claude.com/docs/en/glossary) | "Claude Code is the harness; Claude is the model inside it." |
| The harness runs the tools and the gate | [Glossary](https://code.claude.com/docs/en/glossary) | "The harness supplies file access, shell execution, permission gating, memory loading, and the loop that chains actions together." |
| The tool result goes back to the model | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "Each tool use returns information that feeds back into the loop, informing Claude's next decision." |
| A text answer ends the turn | [Glossary](https://code.claude.com/docs/en/glossary) | "A turn begins when you send a message and ends when Claude finishes responding, with any number of tool calls in between." |

### A question that skips the loop

| Claim | Source | Quote |
|---|---|---|
| `/btw` does not stop the running work | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) | "The side question runs independently and doesn't interrupt the main turn." |
| `/btw` answers from the window, without tools | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) | "`/btw` sees your full conversation, or the subagent transcript you have open, but has no tools." |
| `/btw` adds nothing to the conversation | [Commands](https://code.claude.com/docs/en/commands) | "Ask a side question about the current session without adding to the conversation." |

### Thinking time: more effort, better move?

| Claim | Source | Quote |
|---|---|---|
| Effort sets how deep it may think; the model decides per step | [Model configuration](https://code.claude.com/docs/en/model-config) | "lets the model decide whether and how much to think on each step based on task complexity" |
| `low` and `high` exist on current models | [Model configuration](https://code.claude.com/docs/en/model-config) | "The available effort levels depend on the model." |
| `--effort` sets it at launch | [Model configuration](https://code.claude.com/docs/en/model-config) | "pass a level name to set it for a single session when launching Claude Code" |
| More thinking does not change what the loop may do | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Permission rules are enforced by Claude Code, not by the model." |

### Permissions

| Claim | Source | Quote |
|---|---|---|
| A rule from settings decides first | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Rules are evaluated in order: deny, then ask, then allow." |
| No rule: you are asked | [Configure permissions](https://code.claude.com/docs/en/permissions) | "A permission prompt shows what Claude is about to do, followed by your options." |
| The mode sets what runs without asking | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "Choose a permission mode to set what Claude can do without asking you." |
| Manual asks before edits and commands | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "Claude asks before file edits and shell commands" |
| Accept edits lets file edits through | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "Claude edits files and runs common filesystem commands like `mkdir` and `mv` without asking, still asks for other commands" |
| Plan only looks | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "Claude explores and proposes a plan without editing your source files" |
| Auto: a classifier blocks risky actions | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "a classifier reviews most actions in the background and blocks the risky ones instead of asking you" |
| Bypass asks almost never | [Permission modes](https://code.claude.com/docs/en/permission-modes) | "Even in `bypassPermissions` mode, each of the actions no mode auto-approves gets a prompt or a denial" |

### Hooks

| Claim | Source | Quote |
|---|---|---|
| A hook is your own shell command | [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide) | "Hooks are user-defined shell commands." |
| Before a tool, exit 2 blocks it | [Hooks reference](https://code.claude.com/docs/en/hooks) | PreToolUse, exit 2: "Blocks the tool call" |
| Exit 2 counts as a deny | [Hooks reference](https://code.claude.com/docs/en/hooks) | "A hook that blocks by exiting 2 routes the same way as `"deny"`" |
| The block holds whatever the rules or mode allow | [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide) | "a hook that returns `permissionDecision: "deny"` blocks the tool even in `bypassPermissions` mode or with `--dangerously-skip-permissions`." |
| After a tool, exit 2 gives the model the error | [Hooks reference](https://code.claude.com/docs/en/hooks) | PostToolUse, exit 2: "Shows stderr to Claude; the tool already ran" |
| At the exit, exit 2 keeps the turn open | [Hooks reference](https://code.claude.com/docs/en/hooks) | Stop, exit 2: "Prevents Claude from stopping, continues the conversation" |

### Advice vs. law

| Claim | Source | Quote |
|---|---|---|
| CLAUDE.md is advice and can be missed | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | "Claude reads it and tries to follow it, but there's no guarantee of strict compliance" |
| For a hard limit, use a hook | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | "To block an action regardless of what Claude decides, use a PreToolUse hook instead." |
| A hook runs outside the model, every time | [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide) | "certain actions always happen rather than relying on the LLM to choose to run them" |
| "I allow it" in the chat does not lift a block | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Instructions in your prompt or `CLAUDE.md` shape what Claude tries to do, but they don't change what Claude Code allows." |
| `--short` gives two-letter codes | [git-status](https://git-scm.com/docs/git-status) | "Give the output in the short-format." |
| `??` means untracked | [git-status](https://git-scm.com/docs/git-status) | "?? is used for untracked paths." |
| `A` means added, `M` means modified | [git-status](https://git-scm.com/docs/git-status) | Legend: "added" for `A`, "modified" for `M`. |
| A Bash deny rule checks the command text, so `/bin/rm` gets past `Bash(rm *)` | [Configure permissions](https://code.claude.com/docs/en/permissions) | "It doesn't match the same program invoked in a different form, so a deny or ask rule covers the invocation Claude usually produces and isn't a security boundary around the program." |
| What the text does not show, the sandbox holds | [Configure permissions](https://code.claude.com/docs/en/permissions) | "For filesystem and network enforcement that doesn't depend on the command text, use sandboxing." |

### The race: low vs. high

| Claim | Source | Quote |
|---|---|---|
| Course run: ten runs per level, both found all four bugs | Not in the docs | Observed for the course on Sonnet 5.5. Numbers in [effort-race/README.md](../effort-race/README.md). |
| High spends more tokens, by a varying amount | Not in the docs | Observed: two series, medians 1366 vs. 1658 and 894 vs. 2846 output tokens. |

### Subagents: three checkers, one prompt

| Claim | Source | Quote |
|---|---|---|
| Each subagent has its own context window | [Subagents](https://code.claude.com/docs/en/sub-agents) | "Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions." |
| Only the answer comes back | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "the subagent's tool calls stay out of your context, and Claude gets back a summary when the subagent finishes." |
| Several can run in parallel | [Subagents](https://code.claude.com/docs/en/sub-agents) | "For independent investigations, spawn multiple subagents to work simultaneously" |
| Explore has no Edit and no Write | [Subagents](https://code.claude.com/docs/en/sub-agents) | "read-only tools; Write and Edit are denied" |
| The three checkers take about 25 seconds | Not in the docs | Observed in rehearsal on clash-conference. |

### Your own checker: rule-checker.md

| Claim | Source | Quote |
|---|---|---|
| A subagent is one Markdown file | [Subagents](https://code.claude.com/docs/en/sub-agents) | "Subagents are Markdown files with YAML frontmatter." |
| `tools:` limits what it can do | [Subagents](https://code.claude.com/docs/en/sub-agents) | "To restrict tools, use the `tools` field as an allowlist or the `disallowedTools` field as a denylist." |
| `.claude/agents/` for one project | [Subagents](https://code.claude.com/docs/en/sub-agents) | "Project subagents (`.claude/agents/`) are ideal for subagents specific to a codebase." |
| `~/.claude/agents/` for all projects | [Subagents](https://code.claude.com/docs/en/sub-agents) | "User subagents (`~/.claude/agents/`) are personal subagents available in all your projects." |
| Or ask Claude to create it | [Subagents](https://code.claude.com/docs/en/sub-agents) | "To create one, ask Claude to write it for you, or write the file yourself." |
| New `agents/` folder: restart once | [Subagents](https://code.claude.com/docs/en/sub-agents) | "after creating a scope's first agent file in a new `agents` directory, restart to load it." |
| Call it by name | [Subagents](https://code.claude.com/docs/en/sub-agents) | "Name the subagent and Claude typically delegates" |

### Isolated agents: Claude in a box

| Claim | Source | Quote |
|---|---|---|
| Commands run in the container, files stay on your machine | [Development containers](https://code.claude.com/docs/en/devcontainer) | "commands Claude runs execute inside it rather than on the host machine, while edits to your project files appear in your local repository as you work." |
| The Claude Code feature installs it | [Development containers](https://code.claude.com/docs/en/devcontainer) | "Claude Code installs into any dev container through the Claude Code Dev Container Feature." |
| In bypass mode a malicious project can take what is in the box, even `~/.claude` | [Development containers](https://code.claude.com/docs/en/devcontainer) | "When executed with `--dangerously-skip-permissions`, dev containers do not prevent a malicious project from exfiltrating anything accessible inside the container" |
| Trusted repos only | [Development containers](https://code.claude.com/docs/en/devcontainer) | "Only use dev containers when developing with trusted repositories, and monitor Claude's activities." |
| `claude setup-token` makes a token | [Authentication](https://code.claude.com/docs/en/authentication) | "generate a one-year OAuth token with `claude setup-token`" |
| Reopen in Container | [Development containers](https://code.claude.com/docs/en/devcontainer) | "run Dev Containers: Reopen in Container from the Command Palette." |
| Sessions stay in the volume | [Development containers](https://code.claude.com/docs/en/devcontainer) | "Claude Code stores its authentication token, user settings, and session history under the `~/.claude` directory." |

### What we added to the box

| Claim | Source | Quote |
|---|---|---|
| Commands Claude runs don't see the token | [Environment variables](https://code.claude.com/docs/en/env-vars) | "Claude Code removes credentials from the environments of the subprocesses it starts, such as Bash commands, hooks, and stdio MCP servers." |
| Claude Code keeps it for its own calls | [Environment variables](https://code.claude.com/docs/en/env-vars) | "The Claude Code process keeps the credentials for its own API calls." |
| Deny rules block reading secrets | [Configure permissions](https://code.claude.com/docs/en/permissions) | "To block Claude's file tools from reading a file or directory, add a `Read` deny rule for its path" |
| Native Windows has no sandbox, WSL2 and Linux do | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "The sandbox runs on macOS, Linux, and WSL2. On native Windows, Claude Code runs commands unsandboxed." |
| `"sandbox": { "enabled": true }` turns it on | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "set `sandbox.enabled` to `true` in a settings file" |
| Without the sandbox, a script can still open `.env` | [Configure permissions](https://code.claude.com/docs/en/permissions) | "For OS-level enforcement that blocks all processes from accessing a path, enable the sandbox." |
| In the sandbox, scripts are bound too | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "all commands running inside the sandbox, including their child processes, respect them." |

### Autonomy is earned by verification

| Claim | Source | Quote |
|---|---|---|
| With `/goal`, a model checks the goal | [Keep Claude working toward a goal](https://code.claude.com/docs/en/goal) | "After each turn, a model checks whether the condition holds." |

### The steps where nobody watches

| Claim | Source | Quote |
|---|---|---|
| `/batch` splits the work into units | [Commands](https://code.claude.com/docs/en/commands) | "decomposes the work into 5 to 30 independent units, and presents a plan." |
| Each unit is tested and ends in a PR or a report | [Commands](https://code.claude.com/docs/en/commands) | "Each subagent implements its unit, runs tests, and opens a PR or reports what happened." |
| CI: a PR opens, an agent reviews it | [GitHub Actions](https://code.claude.com/docs/en/github-actions) | "runs its skill when a pull request is opened, updated, reopened, or marked ready for review." |
| Nobody has to start it | [GitHub Actions](https://code.claude.com/docs/en/github-actions) | "when the workflow provides a `prompt` input, Claude runs without waiting for a mention" |

## guard-tests

| Claim | Source | Quote |
|---|---|---|
| First refusal: Claude gets the reason | [Hooks reference](https://code.claude.com/docs/en/hooks) | "For `"deny"`, shown to Claude." |
| Second time: Claude Code asks you | [Hooks reference](https://code.claude.com/docs/en/hooks) | "`"ask"` prompts the user to confirm." |
| The docs say the prompt shows the hook's reason | [Hooks reference](https://code.claude.com/docs/en/hooks) | "For `"ask"`, shown to the user in the permission prompt." |
| In our test the prompt showed only the diff | Not in the docs | Observed, Claude Code 2.1.321, Windows. |
| A shell write under `tests/` is blocked with exit 2 | [Hooks reference](https://code.claude.com/docs/en/hooks) | PreToolUse, exit 2: "Blocks the tool call" |
| "Committed" means tracked; `git add` is enough | [Pro Git: Recording Changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) | "Tracked files are files that were in the last snapshot, as well as any newly staged files" |
| `/hooks` shows the hook | [Hooks reference](https://code.claude.com/docs/en/hooks) | "Type `/hooks` in Claude Code to open a read-only browser for your configured hooks." |
| `node --test` runs the hook's tests | [Node.js test runner](https://nodejs.org/api/test.html) | "The Node.js test runner can be invoked from the command line by passing the --test flag" |
| `??`, `A`, `M` in `git status --short` | [git-status](https://git-scm.com/docs/git-status) | "?? is used for untracked paths." |
| Tested on Windows, Bash and PowerShell tool | Not in the docs | Observed, Claude Code 2.1.321, Windows. |
| A script such as `node -e` writes unseen by the hook | Not in the docs | Limit of `guard-tests.mjs`: it reads only the command text. |
| `git restore .` is not checked | Not in the docs | Limit of `guard-tests.mjs`, named on purpose. |
| The prompt offered only Yes or No | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Sometimes a permission prompt offers only a one-time approval, with no "don't ask again" option" |
| Without `|| exit 2`, a missing hook would let the call through | [Hooks reference](https://code.claude.com/docs/en/hooks) | "Exit code 1 without valid JSON output is a non-blocking error unless the hook is one whose failure blocks the action" |
| In `claude -p` the change is denied | [Hooks reference](https://code.claude.com/docs/en/hooks) | "When Claude Code denies the call in a `-p` run where no one can answer that prompt, Claude reads the reason in the tool result instead." |
| In `dontAsk` the change is denied | [Permission modes](https://code.claude.com/docs/en/permission-modes) | "anything that would prompt is denied" |

## Subagents

| Claim | Source | Quote |
|---|---|---|
| Each checker works in its own context window | [Subagents](https://code.claude.com/docs/en/sub-agents) | "the subagent does that work in its own context and returns only the summary." |
| Only the answers land in the main conversation | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "the subagent's tool calls stay out of your context" |
| Explore is read only | [Subagents](https://code.claude.com/docs/en/sub-agents) | "A fast, read-only agent optimized for searching and analyzing codebases." |
| `Read`, `Grep`, `Glob` only: it cannot edit | [Subagents](https://code.claude.com/docs/en/sub-agents) | "To restrict tools, use the `tools` field as an allowlist" |
| Without `tools:` it would get every tool | [Subagents](https://code.claude.com/docs/en/sub-agents) | "Inherits every tool available to subagents if omitted." |
| `.claude/agents/` or `~/.claude/agents/` | [Subagents](https://code.claude.com/docs/en/sub-agents) | "User subagents (`~/.claude/agents/`) are personal subagents available in all your projects." |
| Claude can create it for you | [Subagents](https://code.claude.com/docs/en/sub-agents) | "To create one, ask Claude to write it for you, or write the file yourself." |
| `Bash(git *)` in `tools:` hands over the whole shell | Not in the docs | Observed: a subagent with `tools: Read, Bash(find *)` got the whole Bash tool and ran `touch` (tested 13 November 2026, Claude Code 2.1.322). |
| A running session picks up files in an existing folder | [Subagents](https://code.claude.com/docs/en/sub-agents) | "the next delegation uses the updated definition, with no restart needed." |
| A new folder needs a restart | [Subagents](https://code.claude.com/docs/en/sub-agents) | "The watcher covers only directories that existed when the session started" |
| Ask for it by name | [Subagents](https://code.claude.com/docs/en/sub-agents) | "Name the subagent and Claude typically delegates" |

## Claude in a box

| Claim | Source | Quote |
|---|---|---|
| You need VS Code with Dev Containers | [Development containers](https://code.claude.com/docs/en/devcontainer) | "Install VS Code and the Dev Containers extension." |
| A volume keeps the sign-in | [Development containers](https://code.claude.com/docs/en/devcontainer) | "mount a named volume at `~/.claude` and set `CLAUDE_CONFIG_DIR` to the same path" |
| One volume per repo | [Development containers](https://code.claude.com/docs/en/devcontainer) | "include the `${devcontainerId}` variable in the source name." |
| No browser: token in `CLAUDE_CODE_OAUTH_TOKEN` | [Authentication](https://code.claude.com/docs/en/authentication) | "copy it and set it as the `CLAUDE_CODE_OAUTH_TOKEN` environment variable wherever you want to authenticate" |
| The browser sign-in often does not come back into the container | Not in the docs | Observed in this dev container while preparing the webinar (November 2026): the sign-in in the host browser went through, Claude Code in the container never received it. |
| A login code can be pasted instead | [Authentication](https://code.claude.com/docs/en/authentication) | "If your browser shows a login code instead of redirecting back after you sign in, paste it into the terminal at the `Paste code here if prompted` prompt." |
| The token uses your subscription | [Authentication](https://code.claude.com/docs/en/authentication) | "This token authenticates with your Claude subscription and requires a Pro, Max, Ultra, Team, or Enterprise plan." |
| The scrub covers Bash, hooks and MCP servers | [Environment variables](https://code.claude.com/docs/en/env-vars) | "such as Bash commands, hooks, and stdio MCP servers." |
| Claude Code keeps the token for its own calls | [Environment variables](https://code.claude.com/docs/en/env-vars) | "The Claude Code process keeps the credentials for its own API calls." |
| `~/` in a rule means your home folder | [Configure permissions](https://code.claude.com/docs/en/permissions) | `~/path`: "Path from home directory" |
| `.env*` matches at any depth | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Bare filenames follow gitignore semantics and match at any depth" |
| Native Windows has no sandbox, WSL2 does | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "To use the sandbox on a Windows machine, run Claude Code inside a WSL2 distribution." |
| In the container it binds scripts too | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "Paths and domains from both sandbox settings and permission rules are merged into the final sandbox configuration." |
| The sandbox needs `bubblewrap` and `socat` on Linux | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "On Linux and WSL2, the sandbox relies on these packages" |
| Without them, commands run unsandboxed | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "when the platform doesn't support the sandbox or the dependency check at startup fails, Claude Code runs commands without sandboxing." |
| `enableWeakerNestedSandbox` only inside a container | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "Only use this setting when the outer container already provides the isolation boundary you need" |
| The error it fixes | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "`Can't mount proc on /newroot/proc: Operation not permitted`" |
| `/sandbox` turns it on for one project | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "Claude Code saves it to your project's local settings at `.claude/settings.local.json`" |
| Docker Desktop needs no further setting | Not in the docs | Observed: the sandbox ran in this dev container without `enableWeakerNestedSandbox`, Docker Desktop 27.3.1 on WSL2 (tested 13 November 2026, Claude Code 2.1.322). |
| With the token scrub, Bash fails in a project without the sandbox | Not in the docs | Observed in this dev container: `bwrap: cannot open /proc/sys/user/max_user_namespaces: Read-only file system` for every Bash command until `sandbox.enabled` was set (tested 13 November 2026, Claude Code 2.1.322). |
| In the sandbox, `localhost` belongs to one command | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "a sandboxed command's `localhost` is private to that command." |
| clash-conference's dev server and tests do not run in the sandbox | Not in the docs | Observed in this dev container: Turbopack failed with "reading file … .bash_profile … Permission denied (os error 13)", the test web server timed out; `excludedCommands` for `npm test` did not help (tested 13 November 2026, Claude Code 2.1.322). |
| `sudo npx playwright install-deps chromium` is enough for the tests | Not in the docs | Observed in this dev container: afterwards `npm test` passed, 43 of 43 (tested 13 November 2026, Playwright 1.63.0). |
| The checks: approval first, then `EACCES` and `0` | Not in the docs | Observed in this dev container with the repo settings and a fake token (tested 13 November 2026, Claude Code 2.1.322). |
| `/sandbox` lists missing packages | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "the Dependencies tab in `/sandbox` lists which of `ripgrep`, `bubblewrap`, `socat`, and the seccomp filter your platform lacks." |
| The sandbox can leave empty stub files | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "the sandbox holds a write denial on a file that doesn't exist yet by creating a 0-byte read-only placeholder there" |
| Stubs named `package.json`, `.npmrc`, `.env` | Not in the docs | Observed: `claude -p` runs in this dev container left them in the working folder (tested 13 November 2026, Claude Code 2.1.322). The docs name only `.claude` settings paths. |
| Repo files stay on your machine, mounted in | [Development containers](https://code.claude.com/docs/en/devcontainer) | "The host repository is bind-mounted into the container as the workspace." |
| Trusted repos only | [Development containers](https://code.claude.com/docs/en/devcontainer) | "Only use dev containers when developing with trusted repositories" |
| The slides need Node.js 20.19+ or 22.12+ | [Vite: Getting Started](https://vite.dev/guide/) | "Vite requires Node.js version 20.19+, 22.12+." |

## Task

| Claim | Source | Quote |
|---|---|---|
| Node.js 20.19+, 22.12+ or 24.x, not 21, 23 or newer | [Prisma system requirements](https://www.prisma.io/docs/orm/reference/system-requirements) | Prisma ORM 7: "^20.19.0, ^22.12.0, or ^24.0.0" |
| On Node.js 22, at least 22.13 | [clash-conference `package-lock.json`](https://github.com/nextacademy-io/clash-conference/blob/webinar-start/package-lock.json) | `eslint-visitor-keys` engines: "^20.19.0 \|\| ^22.13.0 \|\| >=24" |
| The rules in CLAUDE.md are advice | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | "Claude treats them as context, not enforced configuration." |
| `claude --continue` picks the session up again | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "Resuming a session with `claude --continue` or `claude --resume` reopens it under the same session ID" |
| The restart is a safe step; hook edits usually load without one | [Settings files and precedence](https://code.claude.com/docs/en/settings) | "it applies most edits to the running session without a restart, including edits to `permissions`, `hooks`" |
| The hook refuses first, then asks with the diff | [Hooks reference](https://code.claude.com/docs/en/hooks) | "`"ask"` prompts the user to confirm." |
| `db:seed` is blocked even though you allowed it | [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide) | "This lets you enforce policy that users can't bypass by changing their permission mode." |
| `/goal` keeps Claude working | [Keep Claude working toward a goal](https://code.claude.com/docs/en/goal) | "Claude keeps working toward it without you prompting each step." |
| The goal is judged from the chat | [Keep Claude working toward a goal](https://code.claude.com/docs/en/goal) | "It doesn't run commands or read files independently, so write the condition as something Claude's own output can demonstrate." |
| The goal does not lift any limit | [Keep Claude working toward a goal](https://code.claude.com/docs/en/goal) | "A goal doesn't change your permission mode." |
| The goal with `echo LINT OK` is met | Not in the docs | Observed: met after 6 turns; "no warnings" without the `echo` was never met in 33 turns, since a clean ESLint prints nothing (tested 13 November 2026, Claude Code 2.1.322, Sonnet). |
| Step 7 keeps your `guard-tests.mjs` | Not in the docs | Observed: after the checkout of `guard-db.mjs` and `settings.json`, the step-5 hook stays and still denies an edit of a committed test (tested 13 November 2026). |
| `??`, `A`, `M` in the check | [git-status](https://git-scm.com/docs/git-status) | "X shows the status of the index and Y shows the status of the working tree." |

## Effort race

| Claim | Source | Quote |
|---|---|---|
| The same model at `low` and `high` | [Model configuration](https://code.claude.com/docs/en/model-config) | "Lower effort is faster and cheaper for straightforward tasks, while higher effort provides deeper reasoning for complex problems." |
| CLAUDE.md files of the folder and its parents load | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | "CLAUDE.md and CLAUDE.local.md files in the directory hierarchy above the working directory are loaded at launch." |
| `CLAUDE_CODE_EFFORT_LEVEL` overrides `--effort` | [Environment variables](https://code.claude.com/docs/en/env-vars) | "Takes precedence over `--effort`, `/effort`, and the `modelSettings` and `effortLevel` settings." |
| `sonnet` is the latest Sonnet | [Model configuration](https://code.claude.com/docs/en/model-config) | "Uses the latest Sonnet model for daily coding tasks" |
| The alias moves with new models | [Model configuration](https://code.claude.com/docs/en/model-config) | "Aliases point to the recommended version for your provider and update over time." |
| The first run writes the cache and costs more | [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | "Cache write tokens with a 5-minute TTL are 1.25 times the base input tokens price." |
| Later runs read the cache cheaply | [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | "Cache hits and refreshes on Claude Opus 5.5 and Claude Sonnet 5.5 are priced at 0.05x the base input price." |
| Ten runs per level: 10 of 10 each, medians 1366 and 1658 | Not in the docs | Observed for the course, Sonnet 5.5. |
| Another series: medians 894 and 2846 | Not in the docs | Observed, Sonnet 5.5. |

## Cheat sheet

"Four harnesses, one loop" ([cheat-sheet.pdf](../cheat-sheet.pdf)). Docs checked 13 November 2026.

### Claude Code

| Claim | Source | Quote |
|---|---|---|
| `claude` starts a session | [CLI reference](https://code.claude.com/docs/en/cli-reference) | `claude`: "Start interactive session" |
| `Esc` cancels the turn | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) | `Esc`: "Interrupt Claude, or close a dialog" |
| `Shift+Tab` switches the mode | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) | `Shift+Tab`: "Cycle permission modes" |
| `claude -c` resumes | [CLI reference](https://code.claude.com/docs/en/cli-reference) | "Continue most recent conversation in current directory" |
| `/help` | [Commands](https://code.claude.com/docs/en/commands) | "Show help and available commands" |
| `settings.json` in `.claude/` and `~/.claude/` | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works), [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "allow specific commands in `.claude/settings.json`"; "a settings file such as `~/.claude/settings.json`" |
| `/btw` for a side question | [Commands](https://code.claude.com/docs/en/commands) | "Ask a side question about the current session without adding to the conversation." |
| `@` mentions a file | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) | `@`, File path mention: "Trigger file path autocomplete." |
| `!` runs the shell, not the model | [Interactive mode](https://code.claude.com/docs/en/interactive-mode) | `!` at start: "Run a command directly, add its output to the session, and have Claude respond to it" |
| `/compact` | [Commands](https://code.claude.com/docs/en/commands) | "Free up context by summarizing the conversation so far." |
| `/clear` | [Commands](https://code.claude.com/docs/en/commands) | "Start a new conversation with empty context." |
| `/effort high` | [Commands](https://code.claude.com/docs/en/commands) | "Set the effort level: `low` to `xhigh`, `max`, or `auto`" |
| `/permissions` shows and sets rules | [Commands](https://code.claude.com/docs/en/commands) | "Manage allow, ask, and deny rules for tool permissions." |
| `/plan` | [Commands](https://code.claude.com/docs/en/commands) | "Enter plan mode directly from the prompt." |
| `acceptEdits` asks less | [Permission modes](https://code.claude.com/docs/en/permission-modes) | "`acceptEdits` mode lets Claude create and edit files in your working directory without prompting." |
| Six modes; deny rules hold in every one | [Permission modes](https://code.claude.com/docs/en/permission-modes) | "Deny rules block in every mode, including `bypassPermissions`." |
| An `Edit` deny also stops `sed`, `tee` and redirects | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Read and Edit deny rules apply to Claude's built-in file tools, to file commands Claude Code recognizes in Bash, such as `cat`, `head`, `tail`, `sed`, and `tee`, and to the targets of Bash redirections" |
| A script that opens the file is not covered; the sandbox is | [Configure permissions](https://code.claude.com/docs/en/permissions) | "For filesystem and network enforcement that doesn't depend on the command text, use sandboxing." |
| `--dangerously-skip-permissions` is bypass mode | [CLI reference](https://code.claude.com/docs/en/cli-reference) | "Skip permission prompts. Equivalent to `--permission-mode bypassPermissions`." |
| Bypass only in containers or VMs | [Configure permissions](https://code.claude.com/docs/en/permissions) | "Only use this mode in isolated environments like containers or VMs where Claude Code can't cause damage." |
| `CLAUDE.md`, else `AGENTS.md` | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | "By default, Claude reads `AGENTS.md` only when you have no `CLAUDE.md` in your working directory or above it." |
| The instruction file is context, not enforced | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | "Claude treats them as context, not enforced configuration." |
| Workaround: `@AGENTS.md` in `CLAUDE.md` | [How Claude remembers your project](https://code.claude.com/docs/en/memory) | "import it from a `CLAUDE.md`" |
| Hooks live in `settings.json`; `PreToolUse` blocks with exit 2 | [Hooks reference](https://code.claude.com/docs/en/hooks) | PreToolUse, exit 2: "Blocks the tool call" |
| Managed settings override all | [Configure permissions](https://code.claude.com/docs/en/permissions) | "with managed settings highest: no other level, including command line arguments, can override a managed permission rule." |
| `/sandbox`, off by default | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "The sandbox is off by default. To turn it on, run `/sandbox` in a session" |
| macOS, Linux, WSL2; not native Windows | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "The sandbox runs on macOS, Linux, and WSL2. On native Windows, Claude Code runs commands unsandboxed." |
| A second key turns off the unsandboxed retry | [Sandboxing](https://code.claude.com/docs/en/sandboxing) | "You can disable the unsandboxed retry by setting `"allowUnsandboxedCommands": false` in your sandbox settings." |
| `/goal`: a small model judges after each turn | [Keep Claude working toward a goal](https://code.claude.com/docs/en/goal) | "Claude Code sends the condition and the conversation so far to your configured small fast model." |
| It reads the chat and runs no tests | [Keep Claude working toward a goal](https://code.claude.com/docs/en/goal) | "It doesn't run commands or read files independently" |
| Workaround: a Stop hook runs the tests and exits 2 | [Hooks reference](https://code.claude.com/docs/en/hooks) | Stop, exit 2: "Prevents Claude from stopping, continues the conversation" |
| `/batch`: 5 to 30 units, a worktree each | [Commands](https://code.claude.com/docs/en/commands) | "decomposes the work into 5 to 30 independent units"; "one background subagent per unit in an isolated worktree" |
| A PR or a report per unit | [Commands](https://code.claude.com/docs/en/commands) | "opens a PR or reports what happened." |
| Issue to PR through the GitHub Action | [GitHub Actions](https://code.claude.com/docs/en/github-actions) | "Use it to turn issues into pull requests" |
| Headless: `claude -p` | [Run Claude Code programmatically](https://code.claude.com/docs/en/headless) | "To run Claude Code in non-interactive mode, pass `-p` with your prompt" |
| `claude-code-action@v1`, also on a schedule | [GitHub Actions](https://code.claude.com/docs/en/github-actions) | `uses: anthropics/claude-code-action@v1`; "runs in automation mode on any GitHub event, including a cron schedule." |
| The loop: gather, act, verify; the phases blend | [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | "three phases: gather context, take action, and verify results. These phases blend together." |
| Officially Claude only | [Other LLM gateways](https://code.claude.com/docs/en/llm-gateway) | "doesn't support routing Claude Code to non-Claude models through any gateway." |
| `ANTHROPIC_BASE_URL` | [Other LLM gateways](https://code.claude.com/docs/en/llm-gateway) | "`ANTHROPIC_BASE_URL` is the variable that points Claude Code at the gateway." |
| Other models via a compatible endpoint work | Not in the docs | Observed in our tests; unsupported by Anthropic. |
| Proprietary | [LICENSE.md](https://github.com/anthropics/claude-code/blob/main/LICENSE.md) | "All rights reserved. Use is subject to Anthropic's Commercial Terms of Service." |
| Best of N: not in the docs | Not in the docs | We searched the docs and found no best-of-N feature. |
| Workaround: one `--worktree` or `--cloud` session per attempt | [CLI reference](https://code.claude.com/docs/en/cli-reference) | `--worktree`: "Start Claude in an isolated git worktree"; `--cloud`: "With a task description, create a new cloud session." |

### GitHub Copilot CLI

| Claim | Source | Quote |
|---|---|---|
| `copilot` starts a session | [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview) | "Enter `copilot` to start Copilot CLI." |
| `Esc Esc` cancels the turn | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | `Esc`: "Cancel the current operation. Press twice to interrupt the running turn" |
| `Shift+Tab` switches the mode | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Cycle between standard, plan, and autopilot mode." |
| `--continue` resumes | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Resume the most recent session in the current working directory" |
| `/help` | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Show the help for interactive commands." |
| `settings.json` in `~/.copilot/` and the repo | [CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) | "By default, this directory is `~/.copilot`"; Repository scope: "`.github/copilot/settings.json`" |
| `/ask` or `/btw` for a side question | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | `/ask`, `/btw`: "Ask a quick side question without adding to the conversation history." |
| `@` mentions a file | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | `@ FILENAME`: "Include file contents in the context." |
| `!` runs the shell | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | `! COMMAND`: "Execute a command in your local shell, bypassing Copilot." |
| `/compact` | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Summarize the conversation history to reduce context window usage." |
| `/clear` | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Start a new conversation." |
| `--reasoning-effort` | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | `--effort=LEVEL, --reasoning-effort=LEVEL`: "Set the reasoning effort level" |
| `/permissions` switches the mode | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Switch between permission modes (`default`, `assisted`, `allow-all`), or show the current mode" |
| `/plan` | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Create an implementation plan before coding." |
| `assisted` asks less | [Allowing tools](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools) | "A large language model assesses eligible permission requests and automatically approves those it judges to be safe." |
| `--deny-tool`: exact or trailing path, no globs yet | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "exact or trailing-path-segment match; no glob support yet" |
| `--yolo` is bypass | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | `--yolo`: "Enable all permissions (equivalent to `--allow-all`)." |
| `AGENTS.md` and its own file, combined | [Adding custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) | "When multiple applicable user-level and repository instruction files exist, Copilot CLI combines their instructions." |
| Also `CLAUDE.md` and `GEMINI.md` | [Adding custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) | `CLAUDE.md`, `GEMINI.md`: "Agent instructions, discovered in the standard locations." |
| Hooks in `.github/hooks/NAME.json` | [Hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) | "`.github/hooks/*.json` in the repository root" |
| `preToolUse` blocks with exit 2 or `"deny"` | [Hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) | "For `permissionRequest` and `preToolUse`, exit `2` is treated as a deny."; "if any hook returns `"deny"`, the tool is blocked." |
| `postToolUse` cannot block | [Hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) | postToolUse "can modify the tool result or inject additional context for the model." No block field is documented. |
| Managed settings: a baseline, some keys enforced | [CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) | "For most keys, user settings can override that baseline."; "each managed `sandbox` value sets a floor that you cannot relax." |
| `/sandbox enable`, off by default | [Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings), [About local sandboxing](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes) | "Enter `/sandbox enable` in the Copilot CLI session."; "Local sandboxing is turned off by default." |
| macOS, Linux, Windows 11 25H2+ | [About local sandboxing](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes), [Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings) | "Local sandboxing is available on macOS, on Linux, and on recent Windows 11 builds."; "requires Windows 11 version 25H2 with update KB5124010 or later." |
| `sandbox.allowBypass: false` closes the hatch | [CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) | "Allow sandboxed commands to request a bypass for specific operations"; "Set to `false` to opt out." |
| `/goal` is the same command as `/autopilot` | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | `/autopilot [OBJECTIVE]`, `/goal [OBJECTIVE]`: "Start or refocus autopilot mode, optionally with an explicit objective" |
| The model decides it is done | [Using autopilot mode](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode) | "does not cause Copilot to keep working after it has decided the task is done." |
| `/fleet` splits a task among subagents | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Enable parallel subagent execution of parts of a task." |
| PRs via `/delegate` | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Delegate changes to a remote repository with an AI-generated pull request." |
| `copilot -p` headless | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Execute a prompt programmatically" |
| `--no-ask-user` for scripts | [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | "Disable the `ask_user` tool (the agent works autonomously without asking questions)." |
| In a run step, no official action | [Automating with GitHub Actions](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions) | "Install Copilot CLI on the runner so your workflow can invoke it as a command." |
| Own model: `baseUrl` in `providers.json` | [Adding LLM models](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-llm-models) | "For another OpenAI-compatible provider, change `baseUrl` to its API URL." |
| Also a local endpoint | [Adding LLM models](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-llm-models) | "Copilot checks for Ollama at `http://127.0.0.1:11434` by default." |
| A custom GitHub licence | [LICENSE.md](https://github.com/github/copilot-cli/blob/main/LICENSE.md) | "GitHub Copilot CLI License" |
| The agent loop: not in the CLI docs | Not in the docs | The CLI docs describe no plan-act-verify loop. |
| Best of N: not in the docs | Not in the docs | We searched the docs and found nothing. |

### OpenCode

| Claim | Source | Quote |
|---|---|---|
| `opencode` starts a session | [CLI](https://opencode.ai/docs/cli/) | "Run the CLI in a project to open the full-screen terminal interface" |
| `Esc` cancels the turn | [Keybinds](https://opencode.ai/docs/cli/keybinds/) | `session.interrupt`, `escape`: "Interrupt current session" |
| `Shift+Tab` cycles agents | [Keybinds](https://opencode.ai/docs/cli/keybinds/) | `agent.cycle`, `shift+tab`: "Next agent" |
| `run --continue` resumes | [Commands](https://opencode.ai/docs/cli/commands/) | `--continue`: "Continue the last session." |
| `Ctrl+P` opens the command palette | [Keybinds](https://opencode.ai/docs/cli/keybinds/) | `command.palette.show`, `ctrl+p`: "List available commands" |
| `opencode.jsonc` in `~/.config/opencode/` | [Config](https://opencode.ai/docs/config/) | "~/.config/opencode/opencode.json(c)" |
| `session.aside`, no default key | [Keybinds](https://opencode.ai/docs/cli/keybinds/) | `session.aside`, `none`: "Ask a side question" |
| `@` picks a file to attach | [TUI](https://opencode.ai/docs/cli/tui/) | "Type `@` to search for a file, then select it to attach that file to the prompt." |
| `!` on an empty prompt | [TUI](https://opencode.ai/docs/cli/tui/) | "Type `!` at the start of an empty prompt to enter shell mode." |
| `Ctrl+X c` compacts | [Keybinds](https://opencode.ai/docs/cli/keybinds/) | `session.compact`, `<leader>c`: "Compact the session" |
| `Ctrl+X n` starts fresh | [Keybinds](https://opencode.ai/docs/cli/keybinds/) | `session.new`, `<leader>n`: "Create a new session" |
| `Ctrl+T` cycles model variants | [Keybinds](https://opencode.ai/docs/cli/keybinds/) | `variant.cycle`, `ctrl+t`: "Cycle model variants" |
| No `/permissions`; rules in `opencode.jsonc` | [Permissions](https://opencode.ai/docs/permissions/) | "Add these ordered rules to `opencode.jsonc`:" |
| A plan agent | [Agents](https://opencode.ai/docs/agents/) | Plan: "Explores and plans without editing normal project files." |
| `run --auto`: all but deny | [Commands](https://opencode.ai/docs/cli/commands/) | `--auto`: "Auto-approve permissions that are not explicitly denied." |
| Rules are allow, ask or deny | [Permissions](https://opencode.ai/docs/permissions/) | "`allow`, `deny`, or `ask`" |
| The last matching rule wins | [Permissions](https://opencode.ai/docs/permissions/) | "The last matching rule wins, so the specific exceptions follow the broad rule." |
| `"action": "edit"`, `*` also matches `/` | [Permissions](https://opencode.ai/docs/permissions/) | `edit`: "Target path for `edit`, `write`, and `patch`"; `*`: "Zero or more characters, including `/`" |
| `AGENTS.md`, no `CLAUDE.md` | [Instructions](https://opencode.ai/docs/instructions/) | "OpenCode V2 recognizes `AGENTS.md` only. It does not use `CLAUDE.md` as a fallback." |
| Plugins in `.opencode/plugins/` | [Plugins](https://opencode.ai/docs/plugins/) | "immediate plugin package directories from every discovered `.opencode/plugins/` directory" |
| `execute.before` before a tool | [Server plugins](https://opencode.ai/docs/build/plugins/server) | `ctx.tool.hook("execute.before", ...)`: "Inspect or replace tool input before execution." |
| A plugin denies with `effect = "deny"` | [Server plugins](https://opencode.ai/docs/build/plugins/server) | `ctx.permission.hook("evaluate", ...)`; a hook "may change `effect` to `allow`, `ask`, or `deny`" |
| Policies: broader config wins; a repo cannot lift them | [Policies](https://opencode.ai/docs/policies/) | "Policies reverse that: statements from broader configuration are evaluated later, so they override narrower ones." |
| No sandbox | [SECURITY.md](https://github.com/anomalyco/opencode/blob/dev/SECURITY.md) | "OpenCode does not sandbox the agent." |
| The shell runs with your authority | [Permissions](https://opencode.ai/docs/permissions/) | "`shell` runs with the host user's filesystem, process, and network authority." |
| For isolation, a container or VM | [SECURITY.md](https://github.com/anomalyco/opencode/blob/dev/SECURITY.md) | "If you need true isolation, run OpenCode inside a Docker container or VM." |
| `/goal`: a reviewer confirms the objective | [Changelog v2.2.1](https://opencode.ai/changelog/v2.2.1) | "Run `/goal <objective>` in the TUI or Desktop to let the session continue until a reviewer confirms the objective is met." |
| What the reviewer checks | Not in the docs | We searched the docs and found nothing. |
| Fan-out and issue to PR: not in the V2 docs; subagents only | [Agents](https://opencode.ai/docs/agents/) | "Subagents run with fresh context in their own child sessions." |
| Headless: `opencode run` in a run step | [Commands](https://opencode.ai/docs/cli/commands/) | `opencode run --auto "Fix the failing test"`; the CI example installs the CLI with `npm install --global @opencode/cli`. |
| A GitHub action: not in the V2 docs | Not in the docs | The GitHub page is V1 only: "These are the docs for OpenCode V1." |
| The loop: model steps, a configurable limit | [Agents](https://opencode.ai/docs/agents/) | `steps`: "sets a positive maximum number of model steps." |
| A provider catalog | [Providers](https://opencode.ai/docs/providers) | "OpenCode includes a provider and model catalog from models.dev." |
| Finds Ollama, LM Studio and vLLM locally | [Providers](https://opencode.ai/docs/providers) | "LM Studio and vLLM also have built-in local discovery." |
| MIT | [LICENSE](https://github.com/anomalyco/opencode/blob/dev/LICENSE) | "MIT License" |
| Best of N: not in the docs | Not in the docs | We searched the docs and found nothing. |

### Codex CLI

| Claim | Source | Quote |
|---|---|---|
| `codex` starts a session | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Running `codex` with no subcommand launches the interactive terminal UI (TUI)." |
| Cancelling the turn: not in the docs; `Ctrl+C` closes the session | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Press Ctrl+C or run `/exit` to close the session." |
| `/permissions` switches the mode | [Permissions](https://learn.chatgpt.com/docs/permission-modes) | "In the CLI, enter `/permissions`." |
| `codex resume` | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Continue a previous interactive session by ID or resume the most recent chat." |
| Help: not in the docs | Not in the docs | No `?` or `/help` shortcut is documented. |
| `config.toml` in `.codex/` and `~/.codex/` | [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic) | "Codex stores user-level configuration at `~/.codex/config.toml`."; "add a `.codex/config.toml` file in your repo." |
| `/side` or `/btw` | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | `/side`, `/btw`: "Start an ephemeral side chat." |
| `@` mentions a file | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Type `@` to search for a file in the workspace and add its path to the prompt." |
| `!` runs the shell | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Prefix a line with `!` to run a local shell command under the current approval and sandbox settings." |
| `/compact` | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Summarize the visible chat to free tokens." |
| `/clear` | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Clear the terminal and start a fresh chat." |
| `/model` sets the effort too | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "Choose the active model (and reasoning effort, when available)." |
| `/plan` | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | Listed among "`/feedback`, `/goal`, `/init`, `/mcp`, `/plan`, `/review`, and `/status`." |
| "Approve for me" (`auto_review`) | [Permissions](https://learn.chatgpt.com/docs/permission-modes) | "Approve for me keeps the same workspace-write sandbox as Ask for approval, but eligible approval requests are routed through automatic review." |
| A sandbox plus an approval policy | [Permissions](https://learn.chatgpt.com/docs/permission-modes) | "Changing who reviews a request doesn't expand the sandbox." |
| A path deny blocks reads and writes | [Permission profiles](https://learn.chatgpt.com/docs/permissions) | `deny`: "Denies both reads and writes under the path." |
| A glob deny only blocks reads | [Permission profiles](https://learn.chatgpt.com/docs/permissions) | "`deny` glob patterns are supported as deny-read rules." |
| `AGENTS.md` from the root down | [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | "Starting at the project root (typically the Git root), Codex walks down to your current working directory." |
| Other names via `project_doc_fallback_filenames` | [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | `project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]` |
| Hooks in `.codex/hooks.json` | [Hooks](https://learn.chatgpt.com/docs/hooks) | Locations include "`<repo>/.codex/hooks.json`". |
| `PreToolUse` blocks with exit 2 | [Hooks](https://learn.chatgpt.com/docs/hooks) | "You can also use exit code `2` and write the blocking reason to `stderr`." |
| Not a complete enforcement boundary | [Hooks](https://learn.chatgpt.com/docs/hooks) | "Treat tool hooks as a useful guardrail, not a complete enforcement boundary." |
| Project config only when trusted | [Configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) | "Codex loads project-scoped config files only when you trust the project." |
| Admins enforce `requirements.toml` | [Managed configuration](https://learn.chatgpt.com/docs/enterprise/managed-configuration) | "admin-enforced constraints that users can't override" |
| Sandbox on by default, `sandbox_mode` | [Sandboxing](https://learn.chatgpt.com/docs/sandboxing) | "The default permissions mode applies sandboxing automatically."; "`workspace-write`: The agent can read files, edit within the workspace, and run routine local commands inside that boundary." |
| macOS, Linux, WSL2, native Windows in PowerShell | [Sandboxing](https://learn.chatgpt.com/docs/sandboxing) | "Codex uses the native Windows sandbox when you run in PowerShell" |
| Leaving asks, or auto review decides; rules forbid prefixes | [Sandboxing](https://learn.chatgpt.com/docs/sandboxing) | "Rules let you allow, prompt, or forbid command prefixes outside the sandbox." |
| `/goal`; the same chat decides; put the tests in the goal | [Long-running work](https://learn.chatgpt.com/docs/long-running-work) | "The goal text becomes both the first prompt and the completion criteria for the task."; "Add tests, measurements, or review criteria that prove the work is complete." |
| No fan-out command: cloud tasks, you open each PR | [Codex cloud](https://learn.chatgpt.com/docs/cloud) | "commit or open a pull request when you're ready." |
| `@codex review` reviews an open PR | [GitHub](https://learn.chatgpt.com/docs/third-party/github) | "In a pull request comment, mention `@codex review`." |
| `codex exec` for scripted runs | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | "for scripted or CI-style runs that should finish without human interaction." |
| `codex-action@v1` | [GitHub Action](https://learn.chatgpt.com/docs/github-action) | "openai/codex-action@v1"; it runs "`codex exec` under the permissions you specify." |
| The loop: plan, use tools, check, adapt | [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) | "the agent plans, uses tools, checks results, and adapts as needed." |
| Local models: `codex --oss` | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | Global flags, `--oss`: "Use a local open source model provider." |
| Apache-2.0 | [LICENSE](https://github.com/openai/codex/blob/main/LICENSE) | "Apache License" |
| Best of N: `codex cloud exec --attempts 4` | [CLI commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) | `--attempts`, `1-4`: "Number of assistant attempts (best-of-N) Codex cloud should run." |

### Course line

| Claim | Source | Quote |
|---|---|---|
| 24–26 November, online · EUR 1290 · book by 18 November 2026 with the code TD2SJ59H and save 25 % | Not in the docs | Course offer from nextacademy; booking code from the trainer, 13 November 2026. |
| A Pro subscription is enough (slide notes) | [Authentication](https://code.claude.com/docs/en/authentication) | "**Claude Pro, Max, or Ultra subscription**: log in with your claude.ai account." |
| Hook, checker, task and sheet in one repo | [nextacademy-io/claude-code-webinar](https://github.com/nextacademy-io/claude-code-webinar) | The QR code on the sheet points here. |
