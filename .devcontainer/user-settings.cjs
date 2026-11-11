// Runs in the container on every start, after the volume belongs to node.
// Merges the one sandbox key that only belongs in the box into the container user's settings;
// everything else in that file stays as it is.
const fs = require('fs')
const os = require('os')
const path = require('path')

const dir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude')
const file = path.join(dir, 'settings.json')

const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
const settings = text.trim() ? JSON.parse(text) : {}

// bubblewrap cannot mount a fresh /proc in an unprivileged container; the container is the outer wall
settings.sandbox = { ...settings.sandbox, enableWeakerNestedSandbox: true }

fs.writeFileSync(file, JSON.stringify(settings, null, 2) + '\n')
