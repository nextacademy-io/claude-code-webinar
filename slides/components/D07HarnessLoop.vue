<script setup lang="ts">
// D07 — The harness loop as a cycle. The model sits in the middle and only
// reasons and chooses; the harness ring around it does everything else:
// build prompt → call model → permission? → run tool → append result → call
// model again, until the model answers with text (exit to You).
// The ring is a wide ellipse with the stations on its diagonals, so the whole
// diagram fits a concept slide's graphic slot at 13 px text or more.
// Prop `hooks`: PreToolUse (before the permission check) and PostToolUse badges
// clipped onto the ring, a Stop pill at the exit, next to the exit path.
// Prop `btw`: add a /btw square next to You with a direct line to Model,
// bypassing the ring — a side question never enters the loop.
import { useId } from 'vue'

const props = withDefaults(defineProps<{ hooks?: boolean; btw?: boolean }>(), { hooks: false, btw: false })

// Marker ids are unique per instance. The deck shows this diagram on several slides and
// Slidev keeps the hidden ones in the DOM: with shared ids every url(#…) resolves to the
// first copy, and the browser paints no marker whose definition sits in a hidden slide.
const uid = useId()
const markerId = (name: string) => `d7-${name}-${uid}`
const marker = (name: string) => `url(#${markerId(name)})`

const CX = 520, CY = 167, RX = 240, RY = 128
// point on the ring at a parametric angle in degrees (0 = right, clockwise)
const pt = (deg: number) => ({ x: CX + RX * Math.cos((deg * Math.PI) / 180), y: CY + RY * Math.sin((deg * Math.PI) / 180) })
// stations on the ring (clockwise from the top left)
const stations = [
  { key: 'call', label: 'call model', deg: -135, click: 2 },
  { key: 'perm', label: 'permission?', deg: -45, click: 3 },
  { key: 'run', label: 'run tool', deg: 45, click: 4 },
  { key: 'append', label: 'append result', deg: 135, click: 5 },
]
const arc = (a: number, b: number) => {
  // arc along the ring from station a to station b (clockwise), trimmed so
  // arrowheads stop at the station boxes: the flat top and bottom runs need a
  // wider trim than the steep ends
  const trim = Math.abs(Math.sin((((a + b) / 2) * Math.PI) / 180)) > 0.5 ? 23 : 19
  const s = pt(a + trim), e = pt(b - trim)
  return `M ${s.x} ${s.y} A ${RX} ${RY} 0 0 1 ${e.x} ${e.y}`
}
const lit = (n: number) => (props.hooks || props.btw ? false : n)
</script>

<template>
  <svg viewBox="0 0 960 334" class="w-full h-auto max-h-full" role="img" aria-label="The harness loop">
    <defs>
      <marker :id="markerId('arrow')" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-zinc-400)" />
      </marker>
      <marker :id="markerId('arrow-accent')" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-accent-500)" />
      </marker>
      <marker :id="markerId('arrow-secondary')" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-secondary-500)" />
      </marker>
      <marker :id="markerId('arrow-secondary-rev')" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto-start-reverse">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-secondary-500)" />
      </marker>
    </defs>

    <!-- the ring = the harness -->
    <ellipse :cx="CX" :cy="CY" :rx="RX" :ry="RY" fill="none" stroke="var(--na-primary-700)" stroke-width="3" stroke-dasharray="6 8" />
    <text :x="CX - RX - 14" :y="CY + 6" text-anchor="end" fill="var(--na-primary-300)" font-weight="700" style="font-size: 17px">HARNESS</text>

    <!-- ring arrows between stations -->
    <g fill="none" stroke="var(--na-zinc-400)" stroke-width="2.5" :marker-end="marker('arrow')">
      <path :d="arc(-135, -45)" />
      <path :d="arc(-45, 45)" />
      <path :d="arc(45, 135)" />
      <path :d="arc(135, 225)" />
    </g>

    <!-- entry: You → build prompt → call model -->
    <g>
      <rect x="8" y="56.5" width="60" height="40" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-500)" stroke-width="2" />
      <text x="38" y="82.5" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 17px">You</text>
      <line x1="70" y1="76.5" x2="108" y2="76.5" stroke="var(--na-zinc-400)" stroke-width="2.5" :marker-end="marker('arrow')" />
      <text x="89" y="48" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 15px">message</text>
      <rect x="110" y="56.5" width="130" height="40" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
      <g v-click="lit(1)"><rect x="110" y="56.5" width="130" height="40" rx="8" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" /></g>
      <text x="175" y="82" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 16px">build prompt</text>
      <line x1="242" y1="76.5" x2="273" y2="76.5" stroke="var(--na-zinc-400)" stroke-width="2.5" :marker-end="marker('arrow')" />
    </g>

    <!-- stations -->
    <g v-for="s in stations" :key="s.key">
      <rect :x="pt(s.deg).x - 75" :y="pt(s.deg).y - 20" width="150" height="40" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="2" />
      <g v-click="lit(s.click)">
        <rect :x="pt(s.deg).x - 75" :y="pt(s.deg).y - 20" width="150" height="40" rx="8" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" />
      </g>
      <text :x="pt(s.deg).x" :y="pt(s.deg).y + 6" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 16px">{{ s.label }}</text>
    </g>

    <!-- the model in the centre -->
    <rect :x="CX - 100" :y="CY - 40" width="200" height="80" rx="12" fill="var(--na-bg-raised)" stroke="var(--na-primary-400)" stroke-width="3" />
    <text :x="CX" :y="CY - 5" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 22px">Model</text>
    <text :x="CX" :y="CY + 23" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 15px">reasons, then chooses</text>

    <!-- exit: text answer → You (turn ends) -->
    <g v-click="lit(6)">
      <path d="M 622 152 C 800 152, 905 160, 911 99" fill="none" stroke="var(--na-accent-500)" stroke-width="2.5" stroke-dasharray="7 5" :marker-end="marker('arrow-accent')" />
      <rect x="872" y="56.5" width="80" height="40" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-accent-500)" stroke-width="2" />
      <text x="912" y="82.5" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 17px">You</text>
      <text x="952" y="46" text-anchor="end" fill="var(--na-accent-500)" font-weight="600" style="font-size: 15px">text answer = turn ends</text>
    </g>

    <!-- hooks: PreToolUse sits on the arc from call model to permission?, before
         the permission check; PostToolUse on the arc after run tool -->
    <template v-if="hooks">
      <g v-click="1">
        <rect :x="pt(-90).x - 52" :y="pt(-90).y - 14" width="104" height="28" rx="14" fill="var(--na-accent-500)" />
        <text :x="pt(-90).x" :y="pt(-90).y + 5.5" text-anchor="middle" fill="var(--na-zinc-950)" font-weight="700" style="font-size: 15px">PreToolUse</text>
        <text :x="pt(-90).x" y="16" text-anchor="middle" fill="var(--na-accent-400)" font-weight="600" style="font-size: 15px">exit 2 → blocks the call, before any rule</text>
      </g>
      <g v-click="2">
        <rect :x="pt(90).x - 56" :y="pt(90).y - 14" width="112" height="28" rx="14" fill="var(--na-secondary-500)" />
        <text :x="pt(90).x" :y="pt(90).y + 5.5" text-anchor="middle" fill="var(--na-zinc-50)" font-weight="700" style="font-size: 15px">PostToolUse</text>
        <text :x="pt(90).x" y="327" text-anchor="middle" fill="var(--na-secondary-500)" font-weight="600" style="font-size: 15px">exit 2 → tool already ran, error goes to the model</text>
      </g>
      <g v-click="3">
        <rect x="820" y="168" width="60" height="28" rx="14" fill="var(--na-error-500)" />
        <text x="850" y="187.5" text-anchor="middle" fill="var(--na-zinc-50)" font-weight="700" style="font-size: 15px">Stop</text>
        <text x="952" y="220" text-anchor="end" fill="var(--na-error-500)" font-weight="600" style="font-size: 15px">exit 2 → turn stays open</text>
      </g>
    </template>

    <!-- btw: a square below the exit, with a direct line from Model that
         crosses the ring between permission? and run tool — a different
         colour from the ring/exit, reading as bypassing the loop rather
         than joining it -->
    <template v-if="btw">
      <g v-click="1">
        <path d="M 624 187 L 812 196" fill="none" stroke="var(--na-secondary-500)" stroke-width="2.5" stroke-dasharray="7 5" :marker-start="marker('arrow-secondary-rev')" :marker-end="marker('arrow-secondary')" />
        <rect x="814" y="176" width="92" height="40" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-secondary-500)" stroke-width="2.5" stroke-dasharray="5 4" />
        <text x="860" y="202" text-anchor="middle" fill="var(--na-secondary-500)" font-weight="700" style="font-size: 16px">/btw</text>
        <text x="860" y="240" text-anchor="middle" fill="var(--na-secondary-500)" font-weight="600" style="font-size: 15px">answers from context</text>
        <text x="860" y="260" text-anchor="middle" fill="var(--na-secondary-500)" font-weight="600" style="font-size: 15px">no tool, no new turn</text>
      </g>
    </template>
  </svg>
</template>
