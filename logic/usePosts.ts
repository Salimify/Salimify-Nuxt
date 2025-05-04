import {stripMarkdown} from '~/logic/markdown'
import type {Post, MappedPost} from '~/components/interfaces/post.interface'
import type {Tag} from '~/components/interfaces/tag.interface'
import {strapiBackend} from "~/logic/local-strings";

const DEFAULT_COVER = {
    img: '/article.png',
    alt: 'No image available',
}

const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

export async function fetchPostsPure(): Promise<{
    articles: MappedPost[]
    heroArticle: MappedPost | null
    tags: Tag[]
}> {
    const postsRes = await $fetch<{ data: Post[] }>(`${strapiBackend}/api/posts?populate=*`)
    const tagsRes = await $fetch<{ data: Tag[] }>(`${strapiBackend}/api/tags`)

    const mapped: MappedPost[] = postsRes.data.map((post) => ({
        id: post.id,
        title: post.title,
        description: post?.shortDescription
            ? post.shortDescription
            : stripMarkdown(post.content).slice(0, 400) + '...',
        cover: post.coverImage?.formats?.small?.url
            ? {
                img: strapiBackend + post.coverImage?.formats.small.url,
                alt: post.coverImage?.alternativeText || 'Cover image',
            }
            : DEFAULT_COVER,
        createdAt: formatDate(post.createdAt),
        slug: `/posts/${post.slug}`,
        tagIds: post.tags?.map((tag: Tag) => tag.id) || [],
    }))

    return {
        articles: mapped,
        heroArticle: mapped[0] || null,
        tags: tagsRes.data || [],
    }
}
