// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
import type {ModuleOptions} from "@nuxtjs/seo";

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
    strategy: 'prefix_except_default',
    pages: {
      '[page]': {
        de: '/de/:page',
        fr: '/fr/:page'
      }
    },
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
  },
  robots: {
    enabled: true,
    allow: '/',
    sitemap: 'https://salimify.com/sitemap.xml'
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    loc: "https://salimify.com/",
    alternates: [
      { hreflang: "de", href: "https://salimify.com/de" },
      { hreflang: "fr", href: "https://salimify.com/fr" },
      { hreflang: "x-default", href: "https://salimify.com/" }
    ]
  }
})
