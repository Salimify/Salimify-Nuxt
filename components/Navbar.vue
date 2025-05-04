<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
import {useI18n} from 'vue-i18n'
import {isDark, toggleDark} from '~/logic'
import {portfolioWebsiteLink} from '~/config/local-strings.config'
import {Sun, Moon} from 'lucide-vue-next'
import LocaleSwitcher from '~/components/blog/LocaleSwitcher.vue'

const {t} = useI18n()

const isScrolled = ref(false)

if (import.meta.client) {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 0
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
}
</script>

<template>
  <nav :class="['navbar', isScrolled ? 'rounded-b-xl' : 'rounded-2xl']">
      <div class="navbar-left">
        <NuxtLinkLocale to="/" class="logo" aria-label="Home">
          <img src="/salimify.svg" alt="S logo" class="w-8 h-8 filter dark:invert invert-0"/>
        </NuxtLinkLocale>

        <NuxtLinkLocale to="/" aria-label="Home">
          <header>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              <span class="text-blue-500">Stack</span>OverFlous
            </h1>
            <div class="w-5 h-1 bg-blue-500 mt-1 rounded"></div>
          </header>
        </NuxtLinkLocale>
      </div>
    <div class="navbar-right">
      <button
          class="icon-btn"
          :title="t('button.toggle_dark')"
          @click="toggleDark()"
      >
        <ClientOnly>
          <component :is="isDark ? Sun : Moon" class="w-5 h-5"/>
        </ClientOnly>
      </button>

      <LocaleSwitcher/>

      <a
          :href="portfolioWebsiteLink"
          target="_blank"
          rel="noopener noreferrer"
          class="portfolio-btn"
      >
        {{ t('button.my-portfolio') }}
      </a>
    </div>
  </nav>
</template>


<style scoped>
.navbar {
  @apply flex items-center justify-between px-6 py-3 mx-auto max-w-7xl sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur;
  @apply border border-gray-200 dark:border-none;
  @apply transition-all duration-300;
}

.navbar-left {
  @apply flex items-center space-x-4;
}

.logo {
  @apply inline-block p-1 rounded-full hover:opacity-90 transition;
}

.navbar-right {
  @apply flex items-center space-x-2;
}

.icon-btn {
  @apply p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300;
}

.portfolio-btn {
  @apply hidden sm:inline-block px-4 py-1.5 text-sm font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 transition;
}
</style>
