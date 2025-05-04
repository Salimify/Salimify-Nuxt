<template>
  <ClientOnly>
    <div class="giscus-wrapper" :key="`${route.fullPath}-${isDark}`" ref="giscus"/>
  </ClientOnly>
</template>

<script setup lang="ts">
import {onMounted, watch, ref} from 'vue'
import {useRoute} from 'vue-router'
import {isDark} from '~/logic'

const route = useRoute()
const giscus = ref<HTMLElement>()

const injectGiscus = (isDark: boolean) => {
  if (!giscus.value || giscus.value?.hasChildNodes()) return

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'Salimify/blog-giscus')
  script.setAttribute('data-repo-id', 'R_kgDOOjpH-Q')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOOjpH-c4Cpt3v')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-theme', isDark ? 'dark' : 'light') // or dynamic based on dark mode
  script.setAttribute('data-lang', 'en')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  giscus.value?.appendChild(script)
}

onMounted(async () => {
  await nextTick()
  injectGiscus(isDark?.value ?? false)
});

watch( () => route.fullPath, async () => {
  if (giscus.value) {
    await nextTick()
    giscus.value!.innerHTML = ''
    injectGiscus(isDark?.value ?? false)
  }
})

watch( () => isDark?.value, async () => {
  if (giscus.value) {
    await nextTick()
    giscus.value!.innerHTML = ''
    injectGiscus(isDark?.value ?? false)
  }
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 2rem;
  text-align: left;
}
</style>
