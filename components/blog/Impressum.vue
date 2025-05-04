<template>
  <section class="max-w-3xl mx-auto px-4 py-8">
    <div v-if="pending">{{ t('imprint.loading') }}</div>
    <div v-else-if="error" class="text-red-600">{{ t('imprint.error') }}</div>
    <div v-else v-html="html" class="prose dark:prose-invert max-w-none"/>
  </section>
</template>

<script setup lang="ts">
import {marked} from 'marked'
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useLocalizedImprint} from "~/logic/useLocalizedImprint";

const {t} = useI18n()
const {data, pending, error} = useLocalizedImprint()

const html = computed(() => {
  return (data.value as Imprint)?.Imprint ? marked(data.value.Imprint) : ''
})
</script>

<style scoped>
.prose :where(h1, h2, h3) {
  @apply mt-8 mb-4 font-semibold;
}

.prose p {
  @apply mb-4;
}
</style>
