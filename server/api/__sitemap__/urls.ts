import { pageSize } from '~/config/local-strings.config'
import type {Post} from "~/interfaces/post.interface";

export default defineSitemapEventHandler(async () => {
    const config = useRuntimeConfig()
    const strapiBackend = config.public.STRAPI_BACKEND

    const urls: string[] = []

    const res: { data: Post[]} = await $fetch(`${strapiBackend}/api/posts?populate=*`)
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
