<script setup lang="ts">
import {computed} from 'vue'
import {marked} from 'marked'
import {useI18n} from 'vue-i18n'
import {useLocalizedPrivacy} from '~/logic/useLocalizedPrivacy'

const {t} = useI18n()
const {data, pending, error} = useLocalizedPrivacy()

const html = computed(() => {
  return data.value?.Content ? marked(data.value.Content) : ''
})
</script>

<template>
  <section class="max-w-3xl mx-auto px-4 py-8">
    <div v-if="pending">{{ t('privacy.loading') }}</div>
    <div v-else-if="error" class="text-red-600">{{ t('privacy.error') }}</div>
    <div v-else v-html="html" class="prose dark:prose-invert max-w-none"/>
  </section>
</template>

<style scoped>
.prose :where(h1, h2, h3) {
  @apply mt-8 mb-4 font-semibold;
}

.prose p {
  @apply mb-4;
}
</style>
