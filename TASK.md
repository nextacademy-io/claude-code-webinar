# Task: two rules, held by the harness

> App: [clash-conference](https://github.com/agilino/clash-conference) · Start: `webinar-start` · Solution: `webinar-solution`

## You will end up with

A talk can no longer start in the past, and no two talks share a room and a start. Claude cannot
edit your tests, and cannot run the seed or the reset on its own. `npm test` still reseeds the
database, by design.

## Do this

1. **Set up.** You need Node.js 20.19+, 22.12+ or 24+ (not 21 or 23), npm and Git.
   ```bash
   git clone https://github.com/agilino/clash-conference.git
   cd clash-conference
   git checkout webinar-start
   npm install
   npm run setup
   npm run dev
   ```
   Open `http://localhost:3001`: three draft talks. Run `npm test` once in a second terminal. All green.
   Careful: `npm test` and `npm run setup` delete every talk you entered by hand.

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
   > later in the same room. Times relative to now. Use the exact messages above. Run it. Do not
   > touch app code yet.

   Nine specs: five red, four already pass.

5. **Lock the tests.** Add `"permissions": { "deny": ["Edit(tests/**)"] }` to `.claude/settings.json`,
   or use `/permissions`. Ask Claude to change a spec: the edit is denied.

6. **Implement.**
   > Make both rules pass. Validation messages live in lib/validation.ts, the room check goes through
   > lib/data/talks.ts, and the Server Action returns it as a field error. Run npm test.

   One old test now fails: `a start in the past is accepted`. Claude cannot edit it and should stop
   and ask. The rule changed the product, so you change that test, by hand.

7. **Guard the database.** `git checkout origin/webinar-solution -- .claude/hooks .claude/settings.json`,
   then restart the session: `/exit`, `claude --continue`. Send:
   > Run npm run db:seed now. I allow it.

   The hook blocks it and says why, even though you allowed it.

8. **Let go.** Pick a third rule of your own (for example a title of at most 80 characters).
   Write its spec yourself, by hand: the deny rule keeps Claude out of `tests/`. Run it, see it fail,
   commit it. Then hand over the work:
   > /goal The new spec passes, npm test passes and npm run lint has no warnings. Show the output of both commands in your last message.

   Claude builds the rule and runs until the suite is green. The goal is judged from what the chat
   shows, so the proof has to be in the chat. What the goal does not hold is the boundary "nothing
   under `tests/` changes": the deny rule from step 5 holds that, not the goal.

## Check

- `npm test` green.
- `git status --short tests/` is empty: Claude changed nothing under `tests/`. `git log --stat -- tests/`
  shows your own commits there.
- `npm run db:seed` through Claude is blocked. An edit under `tests/` through Claude's edit tool is denied.

## Stuck?

- Compare with `git diff webinar-start origin/webinar-solution`.
- No agent installed: read that diff and predict, before you open it, which of the nine specs are red
  on `webinar-start`.
- Another harness: steps 5 and 7 have a counterpart in each tool. See `cheat-sheet.pdf`, the boxes
  "Lock the tests" and "A hook that blocks".

## Go further

Next is Task 19 in the course Mastering Claude Code: publish a talk to CLASH from this app. On the
branch `19-start` the Publish button answers 404: it needs the CLASH server you build in Task 19.
