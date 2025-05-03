<script setup lang="ts">
import {isDark, toggleDark} from '~/logic'
import {githubLink, portfolioWebsiteLink} from '~/logic/local-strings'
import {useI18n} from 'vue-i18n'
import {Sun, Moon, Globe, Info, Github} from 'lucide-vue-next'

const {t, availableLocales, locale} = useI18n()
const localePath = useLocalePath()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>
<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-icons">
        <button
            class="footer-icon"
            :title="t('button.toggle_dark')"
            @click="toggleDark()"
        >
          <ClientOnly>
            <component :is="isDark ? Sun : Moon"/>
          </ClientOnly>
        </button>

        <button
            class="footer-icon"
            :title="t('button.toggle_langs')"
            @click="toggleLocales()"
        >
          <Globe/>
        </button>

        <a
            :href="portfolioWebsiteLink"
            rel="noopener noreferrer"
            target="_blank"
            class="footer-icon"
            :title="t('button.about')"
        >
          <Info/>
        </a>

        <a
            :href="githubLink"
            class="footer-icon"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
        >
          <Github/>
        </a>
      </div>

      <p class="footer-note text-sm text-gray-500 dark:text-gray-400 text-center">
        <NuxtLinkLocale to="/impressum" class="underline hover:text-blue-500 dark:hover:text-blue-400">
          {{ t('footer.impressum') }}
        </NuxtLinkLocale>
        &nbsp;|&nbsp;
        <NuxtLinkLocale to="/datenschutz" class="underline hover:text-blue-500 dark:hover:text-blue-400">
          {{ t('footer.privacy') }}
        </NuxtLinkLocale>
        &nbsp;—&nbsp;
        {{ t('footer.note', {symbol: '♥', name: 'Salimify'}) }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  @apply w-full mt-2 py-10;
}

.footer-inner {
  @apply max-w-4xl mx-auto flex flex-col items-center gap-6 px-4;
}

.footer-icons {
  @apply flex gap-5 justify-center;
}

.footer-icon {
  @apply text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition transform hover:scale-110;
}

.footer-icon svg {
  @apply w-5 h-5;
}

.footer-note {
  @apply text-sm text-gray-500 dark:text-gray-400 text-center;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
}

.footer-link {
  @apply underline hover:text-blue-500 dark:hover:text-blue-400 transition;
}

.heart {
  @apply text-red-500 dark:text-red-400;
  font-size: 1rem;
}
</style>
