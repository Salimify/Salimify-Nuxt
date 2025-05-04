<template>
  <ClientOnly>
    <NuxtLinkLocale :to="article.slug as any" class="hero-article group" aria-label="Read featured article">
      <div class="hero-img-wrapper">
        <img
            :src="article.cover.img"
            :alt="article.cover.alt || article.title"
            class="hero-img"
            loading="lazy"
        />
      </div>
      <div class="hero-content">
        <p class="hero-date">
          {{ article.createdAt }}
        </p>
        <h2 class="hero-title">
          {{ article.title }}
        </h2>
        <p class="hero-desc" v-html="article.description"></p>
      </div>
    </NuxtLinkLocale>
  </ClientOnly>
</template>

<script setup lang="ts">
import type {MappedPost} from "~/interfaces/post.interface";

defineProps<{ article: MappedPost }>()
</script>

<style scoped>
.hero-article {
  @apply flex flex-col sm:flex-row items-start gap-6 rounded-xl p-6 sm:p-8 bg-white dark:bg-[#18181c] border border-transparent shadow-md transition-all duration-300 ease-in-out;
  @apply hover:shadow-xl hover:-translate-y-[2px] hover:border-blue-400/30 dark:hover:border-blue-500/30;
}

.hero-img-wrapper {
  @apply relative w-full sm:w-2/5 aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden;
}

.hero-img {
  @apply absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105;
}

.hero-content {
  @apply flex-1 space-y-3 pt-1 sm:pt-0;
}

.hero-date {
  @apply text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide;
}

.hero-title {
  @apply text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors;
}

.hero-desc {
  @apply text-base leading-relaxed text-gray-600 dark:text-gray-300;
}
</style>
