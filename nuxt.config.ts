// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  // @ts-ignore
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: './en.json' },
      { code: 'fr', name: 'Français', file: './fr.json' },
      { code: 'de', name: 'Deutsch', file: './de.json' }
    ]
  },
  googleFonts: {
    families: {
      'DM+Sans': [400, 500, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
  },
  plugins: [],
  css: [
    '~/styles/main.css',
    '~/styles/markdown.css'
  ],
  build: {
    transpile: ['@vueuse/core']
  }
})
