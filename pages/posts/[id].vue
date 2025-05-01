<script setup lang="ts">
import BlogScaffold from '~/components/blog/BlogScaffold.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { usePostById } from '~/logic/usePostById'
import { computed } from 'vue'
import { type PostData } from '~/components/interfaces/interfaces'
import TagChip from "~/components/blog/TagChip.vue";
import {salimifyWebsite} from "~/logic/local-strings";

const { t } = useI18n()

const { frontmatter, loading } = await usePostById().fetchPost()

const route = useRoute()

const articleFullPath = computed(() =>
    `${salimifyWebsite}${route.fullPath}`
)

if (frontmatter.value) {
  const blogData = frontmatter.value as PostData

  useHead({
    title: `${blogData.title} | StackOverFlous by ${blogData.author.name}`,
    meta: [
      { name: 'description', content: blogData.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: articleFullPath.value },
      { property: 'og:title', content: blogData.title },
      { property: 'og:description', content: blogData.description },
      { property: 'og:image', content: blogData.cover.img },
      { name: 'twitter:url', content: articleFullPath.value },
      { name: 'twitter:title', content: blogData.title },
      { name: 'twitter:description', content: blogData.description },
      { name: 'twitter:image', content: blogData.cover.img },
      { name: 'article:published_time', content: blogData.createdAt },
      { name: 'twitter:label1', content: 'Written by' },
      { name: 'twitter:data1', content: blogData.author.name }
    ],
    link: [{ rel: 'canonical', href: articleFullPath.value }]
  })
}
</script>

<template>
  <div class="post-container">
    <!-- Content Ready -->
    <div v-if="frontmatter">
      <BlogScaffold
          :title="frontmatter.title"
          :description="frontmatter.description"
          :author="frontmatter.author"
          :cover="frontmatter.cover"
          :read-time="frontmatter.readTime"
          :created-at="frontmatter.createdAt"
          :tags="frontmatter.tags"
      />

      <!-- Main Article Body -->
      <div class="prose prose-body" v-html="frontmatter.content" />

      <!-- Footer Tags -->
      <div class="tags-footer">
        <TagChip
            v-for="tag in frontmatter.tags"
            :key="tag.id"
            :label="tag.name"
        />
      </div>
    </div>

    <!-- Loading -->
    <p v-else-if="loading" class="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
      {{ t('text.loading') }}
    </p>

    <!-- Error -->
    <p v-else class="text-center text-sm text-red-500 mt-12">
      {{ t('text.load-failed') }}
    </p>
  </div>
</template>

<style scoped>
.post-container {
  @apply max-w-7xl mx-auto mt-8 py-6 pt-4 px-4 sm:px-12 lg:px-16 rounded-2xl bg-white dark:bg-[#18181c];
}

.prose-body {
  @apply prose dark:prose-invert mx-auto mt-10 prose-img:rounded-lg prose-img:shadow-sm max-w-5xl;
}

.tags-footer {
  @apply mt-10 flex flex-wrap gap-3 justify-center sm:justify-start;
}
</style>
