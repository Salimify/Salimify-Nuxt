// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo',
  ],
  // @ts-ignore
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en-US', file: './en.json', name: 'English', flag: '🇬🇧' },
      { code: 'de', iso: 'de-DE', file: './de.json', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'fr', iso: 'fr-FR', file: './fr.json', name: 'Français', flag: '🇫🇷' },
    ],
    strategy: 'no_prefix',
  },
  googleFonts: {
    families: {
      'DM+Sans': [400, 500, 700],
    },
    display: 'swap',
    preconnect: true,
    preload: true,
  },
  plugins: [
    '~/plugins/prism.ts',
  ],
  css: [
    '~/styles/main.css',
    '~/styles/markdown.css'
  ],
  build: {
    transpile: ['@vueuse/core']
  },
  robots: {
    enabled: true,
    allow: '/',
    sitemap: 'https://salimify.com/sitemap.xml'
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  runtimeConfig: {
    public: {
      STRAPI_BACKEND: process.env.STRAPI_BACKEND || 'http://localhost:1337',
    },
  },
})
