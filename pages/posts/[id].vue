<script setup lang="ts">
import BlogScaffold from '~/components/blog/BlogScaffold.vue'
import {useI18n} from 'vue-i18n'
import {useRoute} from 'vue-router'
import {usePostById} from '~/logic/usePostById'
import {computed} from 'vue'
import TagChip from "~/components/blog/TagChip.vue";
import {salimifyWebsite} from "~/config/local-strings.config";
import Giscus from "~/components/blog/Giscus.vue";
import {usePostMeta} from "~/logic/usePostMeta";

const {t} = useI18n()
const route = useRoute()

const {frontmatter, loading} = await usePostById().fetchPost()
const articleFullPath = computed(() =>
    `${salimifyWebsite}${route.fullPath}`
)

const {locale} = useI18n()


if (frontmatter.value) {
  const blogData = frontmatter.value as any
  usePostMeta(blogData, articleFullPath.value)
}
</script>

<template>
  <div class="post-container">
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
      <div class="prose prose-body" v-html="frontmatter.content"/>
      <div class="tags-footer">
        <TagChip
            v-for="tag in frontmatter.tags"
            :key="tag.id"
            :label="tag.name"
        />
      </div>
      <Giscus />
    </div>

    <p v-else-if="loading" class="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
      {{ t('text.loading') }}
    </p>

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
