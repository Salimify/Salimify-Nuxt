<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  pageCount: number
}>()

const localePath = useLocalePath()
const getPageLink = (n: number) =>
    n === 1 ? localePath('/' as any) : localePath({ name: 'paginated', params: { page: n } } as any)
</script>

<template>
  <nav class="pagination">
    <NuxtLink
        v-for="n in pageCount"
        :key="n"
        :to="getPageLink(n)"
        class="pagination-button"
        :class="{ active: n === currentPage }"
    >
      {{ n }}
    </NuxtLink>
  </nav>
</template>


<style scoped>
.pagination-button {
  @apply px-4 py-2 rounded-full text-sm transition font-medium border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700;
}
.pagination-button.active {
  @apply bg-blue-500 text-white shadow-sm;
}
</style>
