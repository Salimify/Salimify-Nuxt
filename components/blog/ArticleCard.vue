<script setup lang="ts">
import type {Article} from "~/components/interfaces/blog.interfaces";

defineProps<{ article: Article }>()
</script>

<template>
  <NuxtLinkLocale
      :to="article.slug as any"
      class="group article-card"
      aria-label="Read article"
  >
    <div class="img-wrapper">
      <img
          :src="article.cover.img"
          :alt="article.cover.alt || article.title"
          class="card-img"
          loading="lazy"
      />
    </div>
    <div class="card-content">
      <p class="card-date">
        {{ article.createdAt }}
      </p>
      <h3 class="card-title">
        {{ article.title }}
      </h3>
      <p class="card-desc" v-html="article.description"></p>
    </div>
  </NuxtLinkLocale>
</template>


<style scoped>
.article-card {
  @apply block bg-white dark:bg-[#18181c] shadow-md transition-all duration-300 ease-in-out border border-transparent;
  @apply rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-400/30 dark:hover:border-blue-500/30;
  @apply hover:-translate-y-[2px];
}

.img-wrapper {
  @apply relative aspect-[16/9] bg-gray-100 dark:bg-gray-800;
}

.card-img {
  @apply absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105;
}

.card-content {
  @apply p-5 space-y-3;
}

.card-date {
  @apply text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide;
}

.card-title {
  @apply text-lg font-semibold leading-snug text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors;
}

.card-desc {
  @apply text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3;
}
</style>
