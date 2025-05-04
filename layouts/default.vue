<script setup lang="ts">
import {salimifyWebsite} from '~/config/local-strings.config'

const title = 'StackOverFlous | Tech Blog by Salim'

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: 'A developer-focused blog covering full stack web development. Dive into practical tutorials, engineering insights, and modern best practices with Java, Spring Boot, Javascript, Angular, React, Vue, Node.js, and more.',
    },
    {
      name: 'keywords',
      content: 'tech blog, web development, full stack tutorials, frontend frameworks, Angular guides, React tips, VueJS blog, Angular tutorials, Coding architecture best practices, NodeJS backend, Spring Boot development, Java articles, coding practices, developer insights',
    },
    {property: 'og:title', content: title},
    {property: 'og:site_name', content: 'Salimify'},
    {property: 'og:locale', content: 'en_US'},
    {property: 'og:locale:alternate', content: 'fr_FR'},
    {
      property: 'og:description',
      content: 'Explore a full stack development blog featuring hands-on articles, tutorials, and insights on modern web technologies.'
    },
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: salimifyWebsite},
    {property: 'og:image', content: 'https://salimify.com/salim.png'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {
      name: 'twitter:description',
      content: 'Frontend and backend development tips, patterns, and tutorials for modern software engineering.'
    },
    {name: 'twitter:image', content: 'https://salimify.com/salim.png'},
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.svg'
    }
  ],
  script: [
    {
      src: 'https://analytics.salimify.com/script.js',
      'data-website-id': 'ecb800c3-7873-4a71-b1c9-316f039c16b2',
      'data-do-not-track': 'true',
      async: true,
      defer: true,
    }
  ]
})
</script>

<template>
  <main class="px-4 py-10 text-gray-700 dark:text-gray-200">
    <Navbar/>
    <NuxtPage />
    <Footer/>
  </main>
</template>
