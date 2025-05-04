<script setup lang="ts">
import type {BlogScaffoldProp} from '~/components/interfaces/blog.interfaces'
import TagChip from '~/components/blog/TagChip.vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {portfolioWebsiteLink} from '~/config/local-strings.config'
import {Link as LinkIcon} from 'lucide-vue-next'

const props = defineProps<BlogScaffoldProp>()
const router = useRouter()
const isUrlCopied = ref(false)
const {t} = useI18n()

const articleFullPath = computed(() =>
    `${window.location.origin}${router.currentRoute.value.path}`
)

const copyToClipboard = () => {
  navigator.clipboard.writeText(articleFullPath.value).then(() => {
    isUrlCopied.value = true
    setTimeout(() => (isUrlCopied.value = false), 2000)
  })
}

const openLink = () => {
  window.open(portfolioWebsiteLink, '_blank')
}
</script>

<template>
  <article>
    <h1 class="text-4xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white mt-10 mb-6">
      {{ props.title }}
    </h1>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6 gap-4">
      <div class="flex items-center gap-4">
        <img
            :src="props.author.profileImage"
            alt="Author"
            class="w-12 h-12 object-cover rounded-full cursor-pointer"
            @click="openLink"
        />
        <div class="flex flex-col">
          <span
              @click="openLink"
              class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {{ props.author.name }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            {{ t('post.meta', {createdAt: props.createdAt, readTime: props.readTime}) }}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        <TagChip
            v-for="tag in props.tags"
            :key="tag.id"
            :label="tag.name"
        />
        <div class="relative">
          <button
              @click="copyToClipboard"
              class="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition"
              :title="t('button.copy_link')"
          >
            <LinkIcon class="w-5 h-5"/>
          </button>
          <span
              v-if="isUrlCopied"
              class="absolute top-full mt-2 right-0 text-xs px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black"
          >
            {{ t('text.copied') }}
          </span>
        </div>
      </div>
    </div>
    <div>
      <div class="aspect-w-16 aspect-h-9">
        <img
            :src="props.cover.img"
            :alt="props.cover.alt"
            class="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div
          v-if="props.cover.alt"
          class="mt-2 text-xs font-light text-center text-gray-500 dark:text-gray-400"
      >
        {{ props.cover.alt }}
      </div>
    </div>
  </article>
</template>

<style scoped>
.aspect-w-16.aspect-h-9 {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.aspect-w-16.aspect-h-9 > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
