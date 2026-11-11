// Effort race: run the same review prompt N times at low and at high effort, both levels at the
// same time, keep every answer, and score each run against the four bugs of review.ts by the
// words it uses to describe them. While the runs go, one horse per level gallops over one hurdle
// per run.
//
//   node measure.mjs            three runs at low and at high
//   node measure.mjs 5          five runs per level
//   node measure.mjs 5 low      five runs at one level, or a list: 5 low,medium,high
//   node measure.mjs score      score the runs already in ./runs, start nothing
//   --plain                     no animation, one line per finished run
//   --rightward                 the horses run left to right (default: right to left, the way
//                               most emoji fonts draw the horse)
//
// Run it in an empty folder that holds review.ts and this file, outside any repository. Answers
// land in ./runs/<level>-NN.json plus a readable .md copy. Existing runs are kept, and a second
// call numbers on from the last run, so "5" twice gives ten per level. Every call ends with the
// score table and one summary line per level.
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const PROMPT = 'Read @review.ts. Find correctness bugs. Do not edit. For each finding: line, impact, proof.'
const MODEL = 'sonnet'
// The four bugs of review.ts: the line each sits on, and words an answer uses when it describes
// that behaviour, in English or German.
const BUGS = [
  { line: 16, name: 'cancelled joinable', words: /cancel|abgesagt|abgebrochen|storniert/i },
  { line: 18, name: 'null capacity is 0', words: /unlimited|unbegrenzt|\?\?\s*0|\bnull\b/i },
  { line: 19, name: '> instead of >=', words: />=|off.by.one|one (?:too many|more)|überbuch|überschr/i },
  { line: 21, name: 'sort mutates', words: /\bsort|mutat|in.place|verändert/i },
]
const PERFECT = `${BUGS.length}/${BUGS.length}`
const runsDir = join(process.cwd(), 'runs')

async function main() {
  const { scoreOnly, runsPerLevel, levels, plain, rightward } = parseArgs(process.argv.slice(2))
  if (!scoreOnly) {
    checkLabFolder()
    const race = new Race(levels, runsPerLevel, { animate: !plain && process.stdout.isTTY, rightward })
    race.begin()
    await Promise.all(levels.map((level, lane) => runLane(level, lane, runsPerLevel, race)))
    await race.end()
  }
  const rows = scoreRuns()
  if (!rows.length) {
    console.log('no runs in ./runs yet')
    return
  }
  console.table(rows)
  printSummary(rows)
  console.log('Compare output tokens, not cost_usd: runs that wrote the prompt cache cost several times more at the same output.')
  console.log('The score is a heuristic on the words each answer uses. Read runs/<id>.md when a run looks off.')
}

function parseArgs(args) {
  const flags = args.filter((arg) => arg.startsWith('--'))
  const rest = args.filter((arg) => !arg.startsWith('--'))
  const plain = flags.includes('--plain')
  const rightward = flags.includes('--rightward')
  if (rest[0] === 'score') return { scoreOnly: true }
  const runsPerLevel = Number(rest[0] ?? 3)
  const levels = rest[1] ? rest[1].split(',') : ['low', 'high']
  if (!(Number.isInteger(runsPerLevel) && runsPerLevel > 0)) {
    console.error('usage: node measure.mjs [N] [level,level,...] [--plain] [--rightward]   or   node measure.mjs score')
    process.exit(1)
  }
  return { scoreOnly: false, runsPerLevel, levels, plain, rightward }
}

function checkLabFolder() {
  if (!existsSync(join(process.cwd(), 'review.ts'))) {
    console.error('review.ts is not in this folder. Copy it here first.')
    process.exit(1)
  }
  if (process.env.CLAUDE_CODE_EFFORT_LEVEL) {
    console.error(`CLAUDE_CODE_EFFORT_LEVEL is set to "${process.env.CLAUDE_CODE_EFFORT_LEVEL}". It overrides --effort. Unset it first.`)
    process.exit(1)
  }
  mkdirSync(runsDir, { recursive: true })
}

// The next free index for a level, so a second call adds runs instead of skipping them.
function nextIndex(level) {
  const taken = readdirSync(runsDir)
    .map((name) => name.match(new RegExp(`^${level}-(\\d+)\\.json$`)))
    .filter(Boolean)
    .map((match) => Number(match[1]))
  return taken.length ? Math.max(...taken) + 1 : 1
}

// One lane of the race: the runs of one level, one after the other.
async function runLane(level, lane, count, race) {
  const first = nextIndex(level)
  for (let index = first; index < first + count; index++) {
    const ok = await runOnce(level, index, race)
    race.cleared(lane, ok)
  }
}

// One print-mode run. Saves runs/<id>.json and runs/<id>.md, or says why not. True when saved.
async function runOnce(level, index, race) {
  const id = `${level}-${String(index).padStart(2, '0')}`
  const file = join(runsDir, `${id}.json`)
  if (existsSync(file)) {
    race.log(`${id}: exists, kept`)
    return true
  }
  const result = await callClaude(level)
  if (result.status !== 0 || !result.stdout) {
    race.log(`${id}: failed (exit ${result.status}) ${result.error?.message ?? ''}\n${(result.stderr || '').slice(0, 400)}`)
    return false
  }
  let answer
  try {
    answer = JSON.parse(result.stdout)
  } catch {
    race.log(`${id}: stdout is not JSON, nothing saved\n${result.stdout.slice(0, 400)}`)
    return false
  }
  if (answer.is_error) {
    race.log(`${id}: claude reported an error, nothing saved\n${String(answer.result ?? '').slice(0, 400)}`)
    return false
  }
  writeFileSync(file, result.stdout)
  writeFileSync(join(runsDir, `${id}.md`), `# ${id}\n\n${answer.result ?? ''}\n`)
  race.log(`${id}: output_tokens ${answer.usage?.output_tokens}, total_cost_usd ${answer.total_cost_usd}`)
  return true
}

function callClaude(level) {
  const env = { ...process.env }
  delete env.CLAUDECODE // a nested "claude" refuses to start while it is set; dropping it lets this script run from a Claude Code session
  const claudeArgs = ['-p', '--model', MODEL, '--effort', level, '--output-format', 'json', PROMPT]
  // On Windows "claude" is a .cmd shim that only starts through a shell, and a shell splits the
  // prompt at spaces unless it is quoted. Elsewhere the args pass through as they are.
  const child =
    process.platform === 'win32'
      ? spawn(['claude', ...claudeArgs.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg))].join(' '), { env, shell: true })
      : spawn('claude', claudeArgs, { env })
  return new Promise((resolve) => {
    let stdout = ''
    let stderr = ''
    child.stdout.setEncoding('utf8').on('data', (chunk) => (stdout += chunk))
    child.stderr.setEncoding('utf8').on('data', (chunk) => (stderr += chunk))
    child.on('error', (error) => resolve({ status: null, stdout, stderr, error }))
    child.on('close', (status) => resolve({ status, stdout, stderr }))
  })
}

// The race on screen: per level an air line (the horse while it jumps) and a ground line (track,
// hurdles, horse, finish). Up to five times a second the lines are overwritten in place, in one
// write and only when something changed, so the picture does not flicker; log lines are printed
// above it. Without a terminal, or with --plain, only the log lines are printed.
const HORSE = '🏇' // two columns wide in a terminal
const FRAME_MS = 200
const GALLOP = 2 // columns per frame when a horse runs to its hurdle and over it
const APPROACH_S = 25 // how fast a horse closes in on the next hurdle while its run is going

class Race {
  constructor(levels, runs, { animate, rightward }) {
    this.animate = animate
    this.rightward = rightward
    this.runs = runs
    this.startedAt = Date.now()
    this.frame = 0
    this.drawn = 0
    this.width = Math.max(24, Math.min(48, (process.stdout.columns || 80) - 28))
    this.hurdles = Array.from({ length: runs }, (_, k) => Math.round(((k + 1) * (this.width - 4)) / (runs + 1)) + 2)
    this.label = Math.max(...levels.map((level) => level.length)) + 2
    this.lanes = levels.map((level) => ({ level, done: 0, failed: [], from: 0, runStart: Date.now(), jump: null, finishedAt: null }))
  }

  begin() {
    if (!this.animate) return
    process.stdout.write('\x1b[?25l') // hide the cursor
    process.on('SIGINT', () => {
      clearInterval(this.timer)
      process.stdout.write('\x1b[?25h\n')
      process.exit(130)
    })
    this.draw()
    this.timer = setInterval(() => this.tick(), FRAME_MS)
  }

  async end() {
    if (!this.animate || !this.timer) return
    await new Promise((resolve) => setTimeout(resolve, 1500)) // let the last horse reach the finish
    clearInterval(this.timer)
    this.timer = null
    for (const lane of this.lanes) this.land(lane)
    this.draw()
    process.stdout.write('\x1b[?25h\n') // show the cursor again
  }

  log(message) {
    if (!this.animate) return console.log(message)
    this.erase()
    console.log(message)
    this.draw()
  }

  // A run of this lane is over: the horse jumps its hurdle, or knocks it down when the run failed.
  cleared(lane, ok) {
    const state = this.lanes[lane]
    this.land(state)
    const hurdle = this.hurdles[state.done]
    if (!ok) state.failed.push(state.done)
    state.done++
    if (state.done === this.runs) state.finishedAt = Date.now()
    const from = this.position(state)
    const to = hurdle + 2
    state.jump = { frame: this.frame, from, to, hurdle, over: ok, frames: Math.max(4, Math.ceil((to - from) / GALLOP)) }
  }

  land(state) {
    if (!state.jump) return
    state.from = state.jump.to
    state.runStart = Date.now()
    state.jump = null
  }

  tick() {
    this.frame++
    for (const state of this.lanes) {
      if (state.jump && this.frame - state.jump.frame >= state.jump.frames) this.land(state)
    }
    this.draw()
  }

  // Where the horse stands on the track, in columns from the start.
  position(state) {
    if (state.jump) {
      const t = Math.min(1, (this.frame - state.jump.frame) / state.jump.frames)
      return state.jump.from + (state.jump.to - state.jump.from) * t
    }
    const finished = state.done === this.runs
    const target = finished ? this.width - 3 : Math.max(state.from, this.hurdles[state.done] - 3)
    const seconds = (Date.now() - state.runStart) / 1000
    const closing = 1 - Math.exp(-seconds / (finished ? 0.5 : APPROACH_S))
    return state.from + (target - state.from) * closing
  }

  // In the air only while passing over the hurdle, so a horse gallops up to it and then jumps.
  airborne(state) {
    if (!state.jump || !state.jump.over) return false
    const at = this.position(state)
    return at >= state.jump.hurdle - 2.5 && at <= state.jump.hurdle + 0.5
  }

  laneLines(state) {
    const at = Math.min(this.width - 2, Math.round(this.position(state)))
    const inAir = this.airborne(state)
    const ground = Array(this.width).fill('.')
    this.hurdles.forEach((column, k) => (ground[column] = state.failed.includes(k) ? 'x' : 'H'))
    ground[this.width - 1] = '|'
    const air = Array(this.width).fill(' ')
    const row = inAir ? air : ground
    if (!inAir && at > 0 && state.done < this.runs && ground[at - 1] === '.') ground[at - 1] = this.frame % 10 < 5 ? '~' : '-'
    row[at] = HORSE
    row[at + 1] = '' // the horse is two columns wide
    const shown = (cells) => (this.rightward ? cells : [...cells].reverse()).join('')
    const clock = state.finishedAt ? `🏁 ${minutes(state.finishedAt - this.startedAt)}` : minutes(Date.now() - state.runStart)
    return [' '.repeat(this.label) + shown(air), state.level.padEnd(this.label) + shown(ground) + `  ${state.done}/${this.runs}  ${clock}`]
  }

  // Overwrite the block in place: cursor up, each line followed by "erase to end of line", all in
  // one synchronized write. Skipped when the picture is the same as last time.
  draw() {
    const header = `Effort race · ${this.runs} run${this.runs === 1 ? '' : 's'} per level · ${minutes(Date.now() - this.startedAt)}`
    const lines = [header, ...this.lanes.flatMap((state) => this.laneLines(state))]
    const picture = lines.join('\n')
    if (this.drawn && picture === this.last) return
    const up = this.drawn ? `\x1b[${this.drawn}A\r` : ''
    process.stdout.write(`\x1b[?2026h${up}${lines.map((line) => line + '\x1b[K').join('\n')}\n\x1b[?2026l`)
    this.drawn = lines.length
    this.last = picture
  }

  // Clear the block, so a log line can be printed where it stood; the next draw starts fresh below.
  erase() {
    if (!this.drawn) return
    process.stdout.write(`\x1b[${this.drawn}A\r\x1b[0J`)
    this.drawn = 0
    this.last = null
  }
}

function minutes(ms) {
  const seconds = Math.floor(ms / 1000)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

// Scoring: a bug counts as found when the answer describes its behaviour (the words in BUGS), not
// when it merely cites the line. The line numbers an answer names are listed as a second signal:
// the four bug lines, and any other line for you to judge. This is a heuristic. When a run looks
// off, read runs/<id>.md.
function scoreRuns() {
  const files = existsSync(runsDir) ? readdirSync(runsDir) : []
  return files.filter((name) => name.endsWith('.json')).sort().map(scoreRun)
}

function scoreRun(fileName) {
  const answer = JSON.parse(readFileSync(join(runsDir, fileName), 'utf8'))
  const text = answer.result ?? ''
  const found = BUGS.filter((bug) => bug.words.test(text))
  const namedLines = linesNamedIn(text)
  const bugLines = BUGS.map((bug) => bug.line)
  const otherLines = [...namedLines].filter((line) => !bugLines.includes(line)).sort((a, b) => a - b)
  return {
    run: fileName.replace('.json', ''),
    model: Object.keys(answer.modelUsage ?? {}).join('+'), // every model the run touched, e.g. a haiku helper next to sonnet
    turns: answer.num_turns,
    found: `${found.length}/${BUGS.length}`,
    'not found': BUGS.filter((bug) => !found.includes(bug)).map((bug) => bug.name).join(', ') || '-',
    'bug lines named': bugLines.filter((line) => namedLines.has(line)).join(',') || '-',
    'other lines': otherLines.join(',') || '-',
    'cache read': answer.usage?.cache_read_input_tokens,
    'cache write': answer.usage?.cache_creation_input_tokens,
    'output tokens': answer.usage?.output_tokens,
    cost_usd: Number(answer.total_cost_usd).toFixed(4),
  }
}

// Every line number the answer names: "line 16", "Line: 16", "**Line** 16", "lines 16 and 18",
// "Zeile 16" (German), "l. 16", "review.ts:16", and in a table every cell of the column headed
// "Line" or "Zeile". A range such as "Lines 18–20" or "18 to 20" names every line in it.
// A bare "16:" without the word does not count.
function linesNamedIn(text) {
  const lines = new Set()
  let lineColumn = -1
  for (const row of text.split('\n')) {
    if (!/^\s*\|/.test(row)) {
      lineColumn = -1
      continue
    }
    const cells = row.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.replace(/[*`\s]/g, ''))
    const header = cells.findIndex((cell) => /^(?:lines?|zeilen?|l\.?)$/i.test(cell))
    if (header >= 0) {
      lineColumn = header
      continue
    }
    if (lineColumn < 0 || !cells[lineColumn]) continue
    for (const part of cells[lineColumn].matchAll(/(\d+)(?:[-–](\d+))?/g)) {
      const from = Number(part[1])
      const to = part[2] ? Math.min(Number(part[2]), from + 50) : from
      for (let line = from; line <= to; line++) lines.add(line)
    }
  }
  const pattern = /(?:\b(?:lines?|zeilen?|l\.)|review\.ts)[\s:#*_`]*(\d+(?:\s*(?:[-–,&/]|and|und|to|bis)\s*\d+)*)/gi
  for (const match of text.matchAll(pattern)) {
    for (const part of match[1].matchAll(/(\d+)(?:\s*(?:[-–]|to|bis)\s*(\d+))?/gi)) {
      const from = Number(part[1])
      const to = part[2] ? Math.min(Number(part[2]), from + 50) : from
      for (let line = from; line <= to; line++) lines.add(line)
    }
  }
  return lines
}

// One line per level: how many runs described every bug, and the spread of output tokens.
function printSummary(rows) {
  const levelOf = (row) => row.run.split('-')[0]
  for (const level of new Set(rows.map(levelOf))) {
    const levelRows = rows.filter((row) => levelOf(row) === level)
    const outputs = levelRows.map((row) => row['output tokens']).sort((a, b) => a - b)
    const mean = Math.round(outputs.reduce((sum, n) => sum + n, 0) / outputs.length)
    const perfectRuns = levelRows.filter((row) => row.found === PERFECT).length
    console.log(`${level}: ${levelRows.length} runs, ${PERFECT} in ${perfectRuns}, output tokens min ${outputs[0]} median ${median(outputs)} mean ${mean} max ${outputs[outputs.length - 1]}`)
  }
}

function median(sorted) {
  const mid = sorted.length >> 1
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}

main() // last, so the class and constants above exist when it runs
