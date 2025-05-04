import { strapiBackend } from '~/logic/local-strings'

export default defineSitemapEventHandler(async () => {
    const defaultLocale = 'en'
    const supportedLocales = ['en', 'de', 'fr']
    const pageCounts: Record<string, number> = {
        en: 3,
        de: 2,
        fr: 1
    }

    function localePrefix(locale: string, path: string) {
        return locale === defaultLocale ? path : `/${locale}${path}`
    }

    const urls: string[] = []

    for (const locale of supportedLocales) {
        const totalPages = pageCounts[locale]
        for (let i = 1; i <= totalPages; i++) {
            const path = i === 1 ? '' : `/${i}`
            urls.push(localePrefix(locale, path || '/'))
        }
    }

    // 👉 Add blog post entries
    const res = await $fetch(`${strapiBackend}/api/posts?populate=localizations`)
    const posts = res.data

    for (const post of posts) {
        if (!post?.slug) continue

        urls.push(localePrefix(defaultLocale, `/posts/${post.slug}`))

        const localizations = post.localizations || []
        for (const loc of localizations) {
            if (loc?.slug && loc?.locale) {
                urls.push(localePrefix(loc.locale, `/posts/${loc.slug}`))
            }
        }
    }

    return urls
})
