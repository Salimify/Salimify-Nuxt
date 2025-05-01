<template>
  <span
      class="tag-chip"
      :class="[
      clickable ? 'hoverable' : 'cursor-default',
      active ? 'tag-active' : 'tag-default'
    ]"
      @click="clickable && $emit('click')"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  active?: boolean
  clickable?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.tag-chip {
  @apply inline-block px-4 py-1.5 rounded-full text-sm font-medium tracking-tight transition-all duration-300 ease-in-out;
  @apply select-none whitespace-nowrap transform;
  @apply ring-1 ring-inset ring-transparent;
}

.tag-chip::before {
  content: '#';
  margin-right: 0.25rem;
  opacity: 0.6;
}

/* Default appearance */
.tag-default {
  @apply bg-white border dark:border-none text-gray-700 dark:bg-dark-700 dark:text-gray-300;
}

/* Active (selected) */
.tag-active {
  @apply bg-blue-600 text-white dark:bg-blue-500;
  @apply shadow-md scale-100;
}

/* Hover effects */
.hoverable {
  @apply cursor-pointer hover:scale-[1.04] hover:shadow-sm;
  @apply hover:ring-blue-200 hover:ring-2;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
