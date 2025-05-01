<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Twitter, Mail } from 'lucide-vue-next'
import {
  githubLink,
  linkedinLink,
  portfolioWebsiteLink,
  twitterLink,
} from '~/logic/local-strings'
import { process } from 'std-env'

const { t } = useI18n()

const fullText = ref('')
const typedText = ref(process.server ? t('intro.desc') : '')

onMounted(() => {
  fullText.value = t('intro.desc')

  let index = 0
  let isDeleting = false
  const typeSpeed = 15
  const deleteSpeed = 10
  const pauseTime = 4000

  const type = () => {
    if (!isDeleting) {
      typedText.value = fullText.value.slice(0, index++)
      if (index > fullText.value.length) {
        isDeleting = true
        setTimeout(type, pauseTime)
        return
      }
    } else {
      typedText.value = fullText.value.slice(0, --index)
      if (index === 0) {
        isDeleting = false
      }
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed)
  }

  type()
})

const openLink = () => {
  if (process.client) {
    window.open(portfolioWebsiteLink, '_blank')
  }
}

const sendEmail = () => {
  if (process.client) {
    window.open('mailto:contact@salimify.com')
  }
}
</script>

<template>
  <aside class="about-card">
    <div class="about-card__content max-w-6xl">
      <div class="text-block">
        <h2 class="name">
          <a :href="portfolioWebsiteLink" target="_blank" rel="noopener noreferrer">
            <span class="highlight">{{ t('intro.name') }}</span> {{ t('intro.last-name') }}
          </a>
        </h2>

        <p class="description typewriter">
          {{ typedText }}<span class="cursor">|</span>
        </p>

        <div class="socials">
          <a href="#" class="icon" @click.prevent="sendEmail" aria-label="Email">
            <Mail class="icon" />
          </a>
          <a :href="githubLink" target="_blank" aria-label="GitHub">
            <Github class="icon" />
          </a>
          <a :href="linkedinLink" target="_blank" aria-label="LinkedIn">
            <Linkedin class="icon" />
          </a>
          <a :href="twitterLink" target="_blank" aria-label="Twitter">
            <Twitter class="icon" />
          </a>
        </div>
      </div>

      <div class="image-placeholder">
        <img
            src="/salim-cover-2.png"
            alt="Salim's profile"
            class="hero__profile"
            @click="openLink"
        />
      </div>
    </div>
  </aside>
</template>


<style scoped>
.about-card {
  @apply relative rounded-2xl bg-white dark:bg-[#18181c];

  @apply p-8 mt-8;

  @apply md:px-8 md:mt-0 md:pt-[100px] md:pb-0 md:rounded-none md:absolute md:top-0 md:left-0 md:right-0;
}

.about-card__content {
  @apply flex flex-col-reverse md:flex-row items-center justify-between rounded-2xl gap-8 mx-auto;
  }

.text-block {
  @apply max-w-xl text-center md:text-left;
}

.name {
  @apply text-2xl font-semibold text-gray-900 dark:text-white;
}

.highlight {
  @apply text-blue-600 dark:text-blue-400;
}

.description {
  @apply mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed;
}

.socials {
  @apply mt-5 flex justify-center md:justify-start gap-5 text-gray-500 dark:text-gray-300;
}

.icon {
  @apply w-5 h-5 text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition;
}

.image-placeholder {
  @apply flex-shrink-0;
}

.hero__profile {
  @apply object-cover transition cursor-pointer opacity-90 hover:opacity-100 rounded-full md:rounded-none w-32 h-32 md:w-full md:h-full;
  max-width: 350px;

}

.description.typewriter {
  @apply whitespace-pre-wrap break-words leading-relaxed;

  min-height: calc(1.7rem * 6); /* Mobile default */
}

@media (min-width: 768px) {
  .description.typewriter {
    min-height: calc(1.7rem * 3); /* md and up */
  }
}

.cursor {
  animation: blink 1s step-start infinite;
  color: #3b82f6; /* adjust to your brand color */
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
