<script setup lang="ts">
// The deck's one docs-link affordance: a chain icon plus the word "docs", bottom-right,
// in the same spot on every slide — not bottom-left, where Slidev's navigation bar pops
// up on hover. The concept, code-live and section layouts render it from a slide's `docs:`
// frontmatter field — it never goes in a slide body, where it would make a text-only
// concept slide count as having a graphic. One per slide, official docs only.
// A real <a href>, so it works in the HTML deck and in the exported PDF.
defineProps<{ href: string }>()
</script>

<template>
  <a :href="href" target="_blank" rel="noopener" class="na-doclink" :title="href">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </svg>
    <span>docs</span>
  </a>
</template>

<style scoped>
/* right matches the concept layout's px-16 padding; bottom sits inside every layout's
   bottom padding, below the lines, so it never pushes or overlaps slide content */
.na-doclink {
  position: absolute;
  right: 4rem;
  bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  color: var(--na-fg-muted);
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.15s, color 0.15s;
}
.na-doclink:hover {
  opacity: 1;
  color: var(--na-accent-500);
}
</style>
