<script setup lang="ts">
// G3 — Same task, two approaches. Left: careless, tall stack, full/red
// context bar. Right: engineered, short stack, mostly-empty/green context
// bar. Both columns share the same fixed stack height so bars and
// captions line up. Reused as every task block's stop slide (see
// slides/sections/*.md) — the trainer stops here, mid-build, before the
// careless side is ever really sent.
//
// Click count = careless.length + engineered.length + 2 (one per item,
// plus the two bars). A note's [click] markers must match this exactly —
// see CLAUDE.md's block-order rule.
const props = withDefaults(defineProps<{
  careless?: string[]
  engineered?: string[]
  carelessLabel?: string
  engineeredLabel?: string
  carelessPct?: number
  engineeredPct?: number
  closingLine?: string
}>(), {
  careless: () => [
    'grep -r "notif" app/',
    'read 40 files',
    'guess the notification model',
    'guess the Server Action shape',
    'write code, hope it compiles',
  ],
  engineered: () => [
    '@lib/data/notifications.ts',
    '@app/actions/clashes.ts',
    '@prisma/schema.prisma',
    'Plan Mode: review before a byte moves',
  ],
  carelessLabel: 'Careless',
  engineeredLabel: 'Engineered',
  carelessPct: 85,
  engineeredPct: 18,
  closingLine: 'Same task. The difference is what you let into the window in the first place.',
})

// careless items: clicks 1..N. Careless bar: click N+1.
// engineered items: clicks N+2..N+1+M. Engineered bar + closing line: click N+M+2.
const carelessBarClick = props.careless.length + 1
const lastClick = props.careless.length + props.engineered.length + 2
</script>

<template>
  <div class="w-full grid grid-cols-2 gap-8 items-end">
    <!-- careless -->
    <div class="flex flex-col items-center gap-2">
      <div class="text-base font-semibold" style="color: var(--na-fg-muted)">{{ carelessLabel }}</div>
      <div class="flex flex-col-reverse justify-start gap-1 w-full" style="height: 11.5rem">
        <div
          v-for="(step, i) in careless" :key="step"
          v-click="i + 1"
          class="na-card px-3 py-1.5 text-sm"
          style="border-color: var(--na-zinc-700)"
        >{{ step }}</div>
      </div>
      <div v-click="carelessBarClick" class="w-full rounded overflow-hidden flex" style="border: 1px solid var(--na-zinc-700)">
        <div class="h-5" :style="{ width: carelessPct + '%', background: 'var(--na-error-500)', opacity: 0.85 }" />
        <div class="h-5 flex-1" style="background: var(--na-zinc-900)" />
      </div>
      <div v-click="carelessBarClick" class="text-sm" style="color: var(--na-error-500)">context: ~{{ carelessPct }}% consumed</div>
    </div>

    <!-- engineered -->
    <div class="flex flex-col items-center gap-2">
      <div class="text-base font-semibold" style="color: var(--na-fg-muted)">{{ engineeredLabel }}</div>
      <div class="flex flex-col-reverse justify-start gap-1 w-full" style="height: 11.5rem">
        <div
          v-for="(step, i) in engineered" :key="step"
          v-click="carelessBarClick + 1 + i"
          class="na-card px-3 py-1.5 text-sm font-mono"
          style="border-color: var(--na-primary-500)"
        >{{ step }}</div>
      </div>
      <div v-click="lastClick" class="w-full rounded overflow-hidden flex" style="border: 1px solid var(--na-zinc-700)">
        <div class="h-5" :style="{ width: engineeredPct + '%', background: 'var(--na-success-500)' }" />
        <div class="h-5 flex-1" style="background: var(--na-zinc-900)" />
      </div>
      <div v-click="lastClick" class="text-sm" style="color: var(--na-success-500)">context: ~{{ engineeredPct }}% consumed</div>
    </div>

    <p v-click="lastClick" class="col-span-2 text-base text-center mt-1">
      {{ closingLine }}
    </p>
  </div>
</template>
