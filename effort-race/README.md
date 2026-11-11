# Effort race: does more thinking make a better move?

The race from the webinar. The same review prompt runs N times at `low` and at `high` effort, both
levels at the same time, on the same model. Every answer is kept and scored against the four bugs
hidden in `review.ts`. While it runs, one horse per level gallops over one hurdle per run.

## Run it

You need Node.js and Claude Code (`claude` on the path), logged in.

1. Make an empty folder outside any repository and copy `measure.mjs` and `review.ts` into it.
   Inside a repository Claude Code loads that repository's `CLAUDE.md` and hooks, and the
   measurement no longer compares like with like.
2. Unset `CLAUDE_CODE_EFFORT_LEVEL`. It overrides `--effort`, and the script refuses to start while
   it is set.
3. In that folder:

```bash
node measure.mjs 5
```

| Command | What it does |
|---|---|
| `node measure.mjs` | three runs at `low` and at `high` |
| `node measure.mjs 5` | five runs per level |
| `node measure.mjs 5 low,medium,high` | five runs at each listed level |
| `node measure.mjs score` | score the runs already in `runs/`, start nothing |
| `--plain` | no animation, one line per finished run |
| `--rightward` | the horses run left to right; by default they run right to left, the way most emoji fonts draw 🏇 |

Every answer lands in `runs/<level>-NN.json` plus a readable `.md` copy. A second call numbers on
from the last run, so `5` twice gives ten per level. Delete `runs/` to start over.

## Read the result

The table shows per run which of the four bugs the answer describes, the bug lines and any other
line it names, cache reads and writes, output tokens and cost. Below it, one line per level: how
many runs found all four, and the spread of output tokens.

- Compare output tokens, not cost: the first run of a level writes the prompt cache and costs
  several times more at the same output.
- The score is a heuristic on the words an answer uses. When a run looks off, read its `.md`.
- The faster horse only finished first. Whether it found more is in the table.

Measured for the course, ten runs per level on Sonnet 5.5:

| level | all four bugs | false positives | output tokens, median |
|---|---|---|---|
| low | 10 of 10 runs | 0 | 1366 |
| high | 10 of 10 runs | 0 | 1658 |

High spent its extra tokens on longer proofs, not on more findings. That holds for this small task
and this model. Measure your own.
