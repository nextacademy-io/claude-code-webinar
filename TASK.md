# Task: two rules, held by the harness

> App: [clash-conference](https://github.com/nextacademy-io/clash-conference) · Start: `webinar-start` · Solution: `webinar-solution`

## You will end up with

A talk can no longer start in the past, and no two talks share a room and a start. Claude writes
new tests freely, but changes a committed test only after it explained why and you said yes. It
cannot run the seed or the reset on its own. `npm test` still reseeds the database, by design.

## Do this

1. **Set up.** You need Node.js 20.19+, 22.13+ or 24.x (not 21, 23 or newer), npm and Git.
   ```bash
   git clone https://github.com/nextacademy-io/clash-conference.git
   cd clash-conference
   git checkout webinar-start
   npm install
   npm run setup
   npm run dev
   ```
   Open `http://localhost:3001`: three draft talks. Run `npm test` once in a second terminal. All green.
   Careful: `npm test` and `npm run setup` delete every talk you entered by hand.
   On Linux, if Chromium misses a system library: `sudo npx playwright install-deps chromium`. In
   the dev container of this repo, see [docs/devcontainer.md](docs/devcontainer.md#the-task-in-the-box).

2. **Ask before you change.** Start your agent in clash-conference and send:
   > Read the code only, change nothing. Can a talk start in the past? Can two talks share a room and
   > a start? Name the file and line behind each answer.

   Both answers are yes. One test even requires the first.

3. **Decide, and write it down.** You are the product owner now. Add two lines under "Rules for
   code" in `CLAUDE.md`:
   - A start must lie in the future.
   - No two talks share a room and a start. Room names compare without case and outer spaces.

   A talk has no duration, so "overlap" means the same start. A talk without a room never clashes.
   The messages the app shows: `Start must be in the future.` and `This room is already booked at that time.`

4. **Specs first.**
   > Write tests/talk-rules.spec.ts for the two rules in CLAUDE.md, in the style of tests/talks.spec.ts:
   > past start on create and edit, double booking on create and edit, saving an unchanged talk, same
   > start in another room, same start without a room, a room spelled in another case, one minute
   > later in the same room. Times relative to now. Use exactly these messages: "Start must be in
   > the future." and "This room is already booked at that time." Run it. Do not touch app code yet.

   Nine specs: five red, four already pass.

5. **Guard the tests.** Commit the nine specs. Copy the hook from this repo into clash-conference:
   `guard-tests/guard-tests.mjs` to `.claude/hooks/`, and `guard-tests/settings.json` to
   `.claude/settings.json` (merge the two if that file already exists). Restart the session:
   `/exit`, `claude --continue`. Ask Claude to change one of the nine specs in
   `tests/talk-rules.spec.ts`: the hook refuses first, Claude has to tell you which test and why,
   and after your yes you get the prompt with the diff. Say no there, this was only a try. A new
   spec file still goes through.

6. **Implement.**
   > Make tests/talk-rules.spec.ts pass. Validation messages live in lib/validation.ts, the room
   > check goes through lib/data/talks.ts, and the Server Action returns it as a field error. Run
   > npm test.

   The new specs pass, but an old test in another file now fails: `a start in the past is accepted`
   in `tests/talks.spec.ts`. Claude is in Zugzwang: change the logic, change the test, or ask.
   `CLAUDE.md` says not to edit a test to make it pass, so Claude often stops and asks on its own:
   advice that worked this time. The rule changed the product, so say yes. When Claude then edits
   the test, the hook refuses the first attempt, Claude tells you which test and why, and the
   second attempt shows you the diff to approve.

7. **Guard the database.** Take the database hook from the solution. Your `guard-tests.mjs` from
   step 5 stays:
   ```bash
   git checkout origin/webinar-solution -- .claude/hooks/guard-db.mjs .claude/settings.json
   ```
   Restart the session: `/exit`, `claude --continue`. Send:
   > Run npm run db:seed now. I allow it.

   The hook blocks it and says why, even though you allowed it.

8. **Let go.** Pick a third rule of your own (for example a title of at most 80 characters).
   Let Claude write its spec: a new test file, so the hook lets it through. Run it, see it fail,
   commit it. Then hand over the work:
   > /goal The new spec passes, npm test passes, and `npm run lint && echo LINT OK` prints LINT OK. Show the npm test summary line and LINT OK in your last message.

   Claude builds the rule and runs until the suite is green. The goal is judged from what the chat
   shows, so the proof has to be in the chat: a clean ESLint prints nothing, hence the `echo`.
   What the goal does not hold is the boundary "no committed test changes without you": the hook
   from step 5 holds that, not the goal. If Claude wants to change one, the run stops and asks you.

## Check

- `npm test` green.
- `git status --short -- tests/`: only `M tests/talks.spec.ts`, the old test you said yes to. Your
  new specs are committed. A spec you have not committed yet shows `??` (untracked) or `A` (added).
- `npm run db:seed` through Claude is blocked. A change to a committed test is refused first, then
  asked.

## Stuck?

- Compare with `git diff origin/webinar-start origin/webinar-solution`.
- No agent installed: read that diff and predict, before you open it, which of the nine specs are red
  on `webinar-start`.
- Another harness: steps 5 and 7 have a counterpart in each tool. See `cheat-sheet.pdf`, the boxes
  "Lock the tests" and "A hook that blocks".

## Go further

Next is Task 19 in the course Mastering Claude Code: publish a talk to CLASH from this app. On the
branch `19-start` the Publish button answers 404: it needs the CLASH server you build in Task 19.
