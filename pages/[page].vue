<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { usePaginatedPosts } from '~/logic/usePaginatedPosts'
import TagChip from "~/components/blog/TagChip.vue";
import AboutMeCard from "~/components/blog/AboutMeCard.vue";
import HeroArticle from "~/components/blog/HeroArticle.vue";
import ArticleCard from "~/components/blog/ArticleCard.vue";

const route = useRoute()
const currentPage = parseInt(route.params.page as string) || 1

const {
  filteredArticles,
  heroArticle,
  paginatedArticles,
  pageCount,
  fetchPosts,
  tags,
  selectedTagId,
  getTagsForPost
} = usePaginatedPosts(currentPage)

onMounted(fetchPosts)
</script>


<template>
  <div class="blog-container">

    <!-- About Me -->
    <section class="about-section">
      <AboutMeCard />
    </section>

    <!-- Tag Filters -->
    <section class="tags-section">
      <div class="flex flex-wrap gap-3 justify-center sm:justify-start">
        <TagChip
            label="All"
            :active="selectedTagId === null"
            :clickable="true"
            @click="() => { selectedTagId = null }"
        />
        <TagChip
            v-for="tag in tags"
            :key="tag.id"
            :label="tag.name"
            :active="selectedTagId === tag.id"
            :clickable="true"
            @click="() => { selectedTagId = tag.id }"
        />
      </div>
    </section>

    <!-- Hero Article -->
    <section v-if="heroArticle" class="hero-section">
      <HeroArticle :article="heroArticle" />
    </section>

    <!-- Article Grid -->
    <section v-if="paginatedArticles.length" class="articles-grid">
      <ArticleCard
          v-for="article in paginatedArticles"
          :key="article.id"
          :article="article"
          :tags="getTagsForPost(article.id)"
      />
    </section>

    <!-- Pagination -->
    <section v-if="pageCount > 0" class="pagination">
      <NuxtLink
          v-for="n in pageCount"
          :key="n"
          :to="`/${n}`"
          class="pagination-button"
          :class="{ 'active': n === 1 }"
      >
        {{ n }}
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.blog-container {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16;
}

.about-section {
  @apply mx-auto;
}

.tags-section {
  @apply flex justify-start flex-wrap gap-3;
}

.hero-section {
  @apply transition-all;
}

.articles-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12;
}

.pagination {
  @apply flex justify-center gap-2 mt-12;
}

.pagination-button {
  @apply px-4 py-2 rounded-full text-sm transition font-medium border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700;
}

.pagination-button.active {
  @apply bg-blue-500 text-white shadow-sm;
}
</style>
