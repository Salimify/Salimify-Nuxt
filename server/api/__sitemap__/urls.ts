import {pageSize, strapiBackend} from '~/logic/local-strings'

export default defineSitemapEventHandler(async () => {
    const urls: string[] = []

    const res = await $fetch(`${strapiBackend}/api/posts?populate=*`)
    const posts = res.data

    for (const post of posts) {
        if (post?.locale === 'en' && post?.slug) {
            urls.push(`/posts/${post.slug}`)
        }
    }

    const pageCount = Math.ceil(Math.max(0, posts.length - 1) / pageSize)


    for (let i = 1; i <= pageCount; i++) {
        urls.push(i === 1 ? '/' : `/${i}`)
    }

    return urls
})
