<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { usePaginatedPosts } from '~/logic/usePaginatedPosts'
import TagChip from "~/components/blog/TagChip.vue";
import AboutMeCard from "~/components/blog/AboutMeCard.vue";
import ArticleCard from "~/components/blog/ArticleCard.vue";
import Pagination from "~/components/blog/Pagination.vue";

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => Number(route.params.page || 1))
const selectedTagId = computed({
  get: () => Number(route.query.tag || null),
  set: (val) => {
    router.push({ path: route.fullPath, query: { tag: val || undefined } })
  }
})

const {
  tags,
  heroArticle,
  paginatedArticles,
  pageCount,
  getTagsForPost
} = usePaginatedPosts(currentPage.value, selectedTagId)

definePageMeta({ name: 'paginated' })
</script>


<template>
  <div class="blog-container">
    <section class="about-section">
      <ClientOnly>
        <AboutMeCard />
      </ClientOnly>
    </section>

    <section class="tags-section">
      <TagChip label="All" :active="!selectedTagId" :clickable="true" @click="() => selectedTagId = null" />
      <TagChip
          v-for="tag in tags"
          :key="tag.id"
          :label="tag.name"
          :active="selectedTagId === tag.id"
          :clickable="true"
          @click="() => selectedTagId = tag.id"
      />
    </section>

    <ClientOnly>
      <section v-if="heroArticle" class="hero-section">
        <HeroArticle :article="heroArticle" />
      </section>
    </ClientOnly>

    <section v-if="paginatedArticles.length" class="articles-grid">
      <ArticleCard
          v-for="article in paginatedArticles"
          :key="article.id"
          :article="article"
          :tags="getTagsForPost(article)"
      />
    </section>

    <section v-if="pageCount > 1" class="pagination">
      <Pagination :current-page="currentPage" :page-count="pageCount" />
    </section>
  </div>
</template>

<style scoped>
.blog-container {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 md:py-14 space-y-8 md:mt-[315px];
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
</style>
