<template>
  <div class="relative inline-block">
    <button
        @click="open = !open"
        class="text-xl px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {{ currentFlag }}
    </button>
    <div
        v-if="open"
        class="absolute right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-md py-1 z-50 min-w-[120px]"
    >
      <button
          v-for="loc in availableLocales"
          :key="loc.code"
          @click="switchLocale(loc.code)"
          class="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <span class="text-lg">{{ loc.flag }}</span>
        <span class="text-gray-700 dark:text-gray-300">{{ loc.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'

const {locale, locales, setLocale} = useI18n()
const route = useRoute()
const router = useRouter()

const open = ref(false)

const availableLocales = computed(() =>
    (locales.value as any[]).map(l => ({
      code: l.code,
      name: l.name,
      flag: l.flag || '🏳️'
    }))
)

const currentFlag = computed(() => {
  return availableLocales.value.find(l => l.code === locale.value)?.flag || '🌐'
})

const switchLocale = async (code: string) => {
  open.value = false
  if (code === locale.value) return
  await setLocale(code)
  await router.push({path: route.fullPath, query: route.query})
}
</script>
