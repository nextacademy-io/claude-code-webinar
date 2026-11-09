<script setup lang="ts">
// D09 — Permissions as a gate. A tool call reaches the harness; a rule
// decides, or you do. Five of the six modes change how often you are asked (dontAsk, for scripts, is left out).
// Layout: the ask box sits right of the rule, between the allow path (top) and
// the deny path (bottom); your yes and no flow into those same two paths. The
// viewBox is cropped to the drawing and fits a concept slide's graphic slot
// (about 852 × 300), so the smallest text renders at 14 px.
const modes = [
  { key: 'manual', label: 'manual', meaning: 'asks before edits and commands' },
  { key: 'accept', label: 'accept edits', meaning: 'file edits pass, most commands ask' },
  { key: 'plan', label: 'plan', meaning: 'looks, plans, edits no code' },
  { key: 'auto', label: 'auto', meaning: 'a classifier blocks the risky actions instead of asking' },
  { key: 'bypass', label: 'bypass', meaning: 'rarely asks — sandbox only' },
]
</script>

<template>
  <svg viewBox="0 0 852 286" class="w-full h-auto max-h-full" role="img" aria-label="Permissions gate">
    <defs>
      <marker id="d9-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="var(--na-zinc-400)" />
      </marker>
    </defs>

    <!-- tool call -->
    <rect x="2" y="65" width="130" height="46" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-accent-500)" stroke-width="2" />
    <text x="67" y="84" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">tool call</text>
    <text x="67" y="102" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 14px">from the model</text>
    <line x1="134" y1="88" x2="172" y2="88" stroke="var(--na-zinc-400)" stroke-width="2" marker-end="url(#d9-arrow)" />

    <!-- rule diamond -->
    <g v-click="1">
      <polygon points="270,46 366,88 270,130 174,88" fill="var(--na-bg-raised)" stroke="var(--na-primary-400)" stroke-width="2.5" />
      <text x="270" y="84" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">a rule</text>
      <text x="270" y="102" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 14px">in settings?</text>
    </g>

    <!-- allow / deny straight from the rule -->
    <g v-click="2">
      <path d="M 270 46 V 30 H 630" fill="none" stroke="var(--na-zinc-400)" stroke-width="2" marker-end="url(#d9-arrow)" />
      <text x="390" y="22" text-anchor="middle" fill="var(--na-success-500)" font-weight="600" style="font-size: 15px">allow</text>
      <path d="M 270 130 V 150 H 630" fill="none" stroke="var(--na-zinc-400)" stroke-width="2" marker-end="url(#d9-arrow)" />
      <text x="390" y="170" text-anchor="middle" fill="var(--na-error-500)" font-weight="600" style="font-size: 15px">deny</text>
    </g>

    <!-- no rule → ask you; your yes and no join the same two paths -->
    <g v-click="3">
      <line x1="368" y1="88" x2="426" y2="88" stroke="var(--na-zinc-400)" stroke-width="2" marker-end="url(#d9-arrow)" />
      <text x="397" y="78" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 14px">no rule</text>
      <rect x="428" y="66" width="168" height="44" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-zinc-200)" stroke-width="2.5" />
      <text x="512" y="84" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">ask you</text>
      <text x="512" y="102" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 14px">the permission prompt</text>
      <line x1="512" y1="64" x2="512" y2="33" stroke="var(--na-zinc-400)" stroke-width="2" marker-end="url(#d9-arrow)" />
      <text x="522" y="54" fill="var(--na-success-500)" font-weight="600" style="font-size: 15px">yes</text>
      <line x1="512" y1="112" x2="512" y2="147" stroke="var(--na-zinc-400)" stroke-width="2" marker-end="url(#d9-arrow)" />
      <text x="522" y="136" fill="var(--na-error-500)" font-weight="600" style="font-size: 15px">no</text>
    </g>

    <!-- outcomes -->
    <rect x="632" y="2" width="218" height="56" rx="8" fill="var(--na-primary-900)" stroke="var(--na-success-500)" stroke-width="2" />
    <text x="741" y="24" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">harness runs the tool</text>
    <text x="741" y="44" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 14px">result goes back to the model</text>
    <rect x="632" y="122" width="218" height="56" rx="8" fill="var(--na-bg-raised)" stroke="var(--na-error-500)" stroke-width="2" />
    <text x="741" y="144" text-anchor="middle" fill="var(--na-fg)" font-weight="700" style="font-size: 16px">nothing runs</text>
    <text x="741" y="164" text-anchor="middle" fill="var(--na-fg-muted)" style="font-size: 14px">the model is told why</text>

    <!-- modes -->
    <text x="2" y="206" fill="var(--na-fg-muted)" font-weight="600" style="font-size: 14px">MODE  ·  how often the gate asks you</text>
    <g v-for="(m, i) in modes" :key="m.key">
      <rect :x="2 + i * 170" y="216" width="158" height="36" rx="18" fill="var(--na-bg-raised)" stroke="var(--na-zinc-600)" stroke-width="1.5" />
      <g v-click="4 + i"><rect :x="2 + i * 170" y="216" width="158" height="36" rx="18" fill="var(--na-primary-900)" stroke="var(--na-accent-500)" stroke-width="2.5" /></g>
      <text :x="81 + i * 170" y="240" text-anchor="middle" fill="var(--na-fg)" font-weight="600" style="font-size: 16px">{{ m.label }}</text>
      <text v-click="[4 + i, 5 + i]" x="2" y="280" fill="var(--na-accent-400)" style="font-size: 16px">{{ m.label }}: {{ m.meaning }}</text>
    </g>
  </svg>
</template>
