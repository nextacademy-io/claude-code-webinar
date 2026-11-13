# Claude in a box

A dev container with Claude Code and Node. Commands Claude runs execute in the container, not on
your machine. The repo files stay on your machine and are mounted in.

Only use a dev container with repos you trust. With `--dangerously-skip-permissions`, the box does
not stop a malicious project from taking what is in it, including the sign-in in `~/.claude`. See
[Development containers](https://code.claude.com/docs/en/devcontainer).

## You need

- Docker. On Windows: Docker Desktop with the WSL2 backend.
- Node.js on your machine. The container start runs one `node` command there.
- Claude Code on your machine, for `claude setup-token` (see below).
- VS Code with the
  [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers),
  or the Dev Containers CLI (below).

## Sign in first

The container has no browser. The sign-in opens the link in the browser on your machine, but the
answer often never reaches Claude Code in the container. So prepare a token before the start:

1. Clone this repo.
2. Run `claude setup-token` on your machine.
3. Put the token into `.devcontainer/.env` as `CLAUDE_CODE_OAUTH_TOKEN=…` (see `.env.example`).
   The file is git-ignored and created empty when missing.

The file is read when the container is created, not on every start: after a change, run
**Dev Containers: Rebuild Container**. The token uses your
Claude subscription, and the commands Claude runs do not see it (see the layers below).

Want to try the browser sign-in anyway? If the browser shows a login code instead of returning,
paste it into the terminal. A Docker volume keeps that sign-in, one volume per repo, also across
rebuilds.

## Start it

In VS Code:

1. Open the repo.
2. Run **Dev Containers: Reopen in Container** from the Command Palette (`Ctrl+Shift+P`).
3. Open a terminal in the container and run `claude`.

Without VS Code:

```bash
npx @devcontainers/cli up --workspace-folder .
npx @devcontainers/cli exec --workspace-folder . claude
```

The first start takes a few minutes: it pulls the image, installs Claude Code, `bubblewrap`,
`socat` and the slide packages.

## Three layers

| Layer | Where | What it does |
|---|---|---|
| Token hidden | `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` in `devcontainer.json` | Removes credentials from the environment of every Bash command, hook and MCP server Claude starts. Claude Code keeps the token for its own calls. |
| No reading secrets | `permissions.deny` in `.claude/settings.json` | Claude may not read `.env*`, `~/.claude/.credentials.json`, `~/.ssh` or `~/.aws`. |
| Sandbox on | `sandbox.enabled` in `.claude/settings.json` | Bash commands run in the sandbox. It applies the deny rules to scripts too. |

The sandbox runs on macOS, Linux and WSL2, not on native Windows. In the container it needs
`bubblewrap` and `socat`, which the container installs. With Docker Desktop it needs no further
setting. The container stays the outer wall.

## Check each layer

Run these in Claude in the container. Claude may ask before it runs a command: say yes, the
sandbox has the last word.

| Layer | Ask Claude | Expected |
|---|---|---|
| Sandbox ready | `/sandbox`, tab Dependencies | Lists no missing package. |
| Sandbox not weakened | Show the `sandbox` key of `~/.claude/settings.json`. | No `enableWeakerNestedSandbox`, unless you set it for the `/proc` error below. If it is there without need, delete it. |
| Token hidden | Run `env \| grep -c CLAUDE_CODE_OAUTH_TOKEN` | `0`. Only meaningful with a token in `.devcontainer/.env`. |
| No reading secrets | Read `.devcontainer/.env`. | Refused by a deny rule. |
| Sandbox | Run `node -e "console.log(require('fs').readFileSync('.devcontainer/.env', 'utf8'))"` | Fails with `EACCES: permission denied`. |

## The task in the box

[TASK.md](../TASK.md) runs most smoothly on your own machine. In the box it works with two changes:

1. Clone clash-conference into your home folder, not into this repo, and install Chromium's system
   libraries, which the image lacks:
   ```bash
   cd ~ && git clone https://github.com/nextacademy-io/clash-conference.git && cd clash-conference
   sudo npx playwright install-deps chromium
   ```
2. Turn the token scrub off for this terminal, and leave the sandbox off in clash-conference:
   ```bash
   export CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=0
   claude
   ```
   With the scrub on, every Bash command needs the sandbox, and in the sandbox the app's dev
   server and tests do not run. The `export` holds for this terminal, also for the restarts in
   TASK.md (`/exit`, `claude --continue`). A new terminal needs it again.

The price: commands Claude runs can then read your sign-in, a token from `.devcontainer/.env` in
their environment or `~/.claude/.credentials.json`. The deny rules of this repo do not apply in
clash-conference either. The container stays the outer wall, so do this only with repos you trust.

Your clone lives only in this container: a rebuild deletes it, with every commit you did not push.
In VS Code, port 3001 is forwarded, so the app opens at `http://localhost:3001` on your machine.

## The slides in the container

```bash
npm --prefix slides run dev
```

Then open `http://localhost:3030`. VS Code forwards the port.

## When it gets stuck

- **Empty files such as `package.json`, `.npmrc` or `.env` appear** in a folder where Claude ran
  commands. Claude Code leaves them as placeholders when it runs commands in the container. Do not
  commit them; the `.gitignore` files in the repo root and in `effort-race/` hide them. If a tool
  on your machine complains about an empty `package.json`, delete them.
- **Every Bash command fails with `bwrap: cannot open /proc/sys/user/max_user_namespaces`.** This
  happens in a project that does not turn the sandbox on. Turn it on there: run `/sandbox`, or put
  `{ "sandbox": { "enabled": true } }` into that project's `.claude/settings.local.json`. For
  clash-conference, see [The task in the box](#the-task-in-the-box) instead.
- **Commands fail with `Can't mount proc on /newroot/proc: Operation not permitted`.** Some Docker
  setups do not let the sandbox mount `/proc`. Set
  `{ "sandbox": { "enableWeakerNestedSandbox": true } }` in `~/.claude/settings.json` in the
  container, never in a repo. It weakens the sandbox, so use it only inside the container.
- **The sign-in is not saved.** The volume is created owned by root; each start hands it to the
  user `node`. Run **Dev Containers: Rebuild Container** once. A rebuild keeps the volume, but
  deletes everything else in the container, such as a clone in your home folder.
- **Start from scratch.** A rebuild keeps the volume and the sign-in. To remove them too, delete
  the volume whose name starts with `claude-code-config-` (`docker volume ls`).
