<script setup lang="ts">
// layout: concept — a graphic dominates; at most three short lines of text.
// When a slide has no graphic, the lines move to the middle and grow.
// When it has neither graphic nor lines, the heading becomes the statement.
// Frontmatter:
//   heading?: string
//   lines?: string[]   up to 3 short supporting lines, shown below the graphic
//   docs?: string      one official docs URL, drawn bottom-right as the docs link
import { computed, useSlots, Comment, Text, Fragment, type VNode } from 'vue'
import DocLink from '../components/DocLink.vue'

const props = withDefaults(defineProps<{ heading?: string; lines?: string[]; docs?: string }>(), {
  lines: () => [],
})

const slots = useSlots()
function hasContent(nodes: VNode[] | undefined): boolean {
  if (!nodes) return false
  return nodes.some((n) => {
    if (n.type === Comment) return false
    if (n.type === Text) return String(n.children).trim().length > 0
    if (n.type === Fragment) return hasContent(n.children as VNode[])
    return true
  })
}
const hasGraphic = computed(() => hasContent(slots.default?.()))
const hasLines = computed(() => props.lines.length > 0)
</script>

<template>
  <div
    class="slidev-layout relative w-full h-full flex flex-col px-16 py-12"
    :class="{ 'na-no-graphic': !hasGraphic, 'na-statement': !hasGraphic && !hasLines }"
  >
    <h1 v-if="heading" class="mb-6 shrink-0">{{ heading }}</h1>
    <div v-if="hasGraphic" class="na-graphic flex-1 min-h-0 flex items-center justify-center">
      <slot />
    </div>
    <ul v-if="hasLines" class="na-lines mt-6 shrink-0 space-y-1">
      <li
        v-for="(line, i) in lines.slice(0, 3)"
        :key="i"
        class="text-lg"
        :style="{ color: i === 0 ? 'var(--na-fg)' : 'var(--na-fg-muted)' }"
      >
        {{ line }}
      </li>
    </ul>
    <DocLink v-if="docs" :href="docs" />
  </div>
</template>

<style scoped>
/* code blocks on concept slides: one consistent width and size */
:deep(.na-graphic > .slidev-code-wrapper),
:deep(.na-graphic > pre) { width: 100%; max-width: 48rem; }
:deep(.na-graphic .slidev-code) { font-size: 1rem; line-height: 1.5; }
.na-no-graphic > .na-lines { margin: auto 0; max-width: 60rem; }
.na-no-graphic > .na-lines li { font-size: 1.75rem; line-height: 1.35; }
.na-no-graphic > .na-lines li + li { margin-top: 0.75rem; }
.na-statement > h1 { margin: auto 0; font-size: 3.5rem; max-width: 62rem; }
</style>
