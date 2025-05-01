<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>
<template>
  <div class="h-50vh flex items-center justify-center text-center px-4">
    <div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ t('not-found') }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        {{ t('not-found.description') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  .h-50vh {
    min-height: 50vh;
  }
</style>
