import { useHead } from '#imports'
import {siteMeta} from "~/config/site-meta.config";
import {useColorMode} from "@vueuse/core";

export function useGlobalMeta() {
    const url = useRequestURL()

    const isLiveDomain = !['localhost', '127.0.0.1'].includes(url.hostname)

    useHead({
        title: siteMeta.title,
        titleTemplate: '%s',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { name: 'description', content: siteMeta.description },
            { name: 'keywords', content: siteMeta.keywords },
            { name: 'author', content: siteMeta.name },
            { name: 'robots', content: 'index, follow' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

            { property: 'og:title', content: siteMeta.title },
            { property: 'og:description', content: siteMeta.description },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: siteMeta.name },
            { property: 'og:url', content: siteMeta.url },
            { property: 'og:image', content: siteMeta.ogImage },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:locale:alternate', content: 'fr_FR' },

            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: siteMeta.twitterHandle },
            { name: 'twitter:creator', content: siteMeta.twitterHandle },
            { name: 'twitter:title', content: siteMeta.title },
            { name: 'twitter:description', content: siteMeta.twitterDescription },
            { name: 'twitter:image', content: siteMeta.ogImage },

            { name: 'DC.title', content: siteMeta.title },
            { name: 'DC.description', content: siteMeta.description },
            { name: 'DC.creator', content: siteMeta.name },
            { name: 'DC.language', content: 'en' },
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.svg' },
            { rel: 'canonical', href: siteMeta.url },
        ],
        script: isLiveDomain ? [
            {
                src: 'https://analytics.salimify.com/script.js',
                'data-website-id': 'ecb800c3-7873-4a71-b1c9-316f039c16b2',
                'data-do-not-track': 'true',
                async: true,
                defer: true,
            }
        ] : []
    })
}
