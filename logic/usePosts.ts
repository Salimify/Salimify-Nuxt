import { strapiBackend } from '~/logic/local-strings'
import { stripMarkdown } from '~/logic/markdown'

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

export async function fetchPostsPure() {
    const [postsResponse, tagsResponse] = await Promise.all([
        fetch(`${strapiBackend}/api/posts?populate=*`),
        fetch(`${strapiBackend}/api/tags`),
    ])

    const { data: postData } = await postsResponse.json()
    const { data: tagData } = await tagsResponse.json()

    const mapped = postData.map((post: any) => ({
        id: post.id,
        title: post.title,
        description: post?.shortDescription
            ? post.shortDescription
            : stripMarkdown(post.content).slice(0, 400) + '...',
        cover: post.coverImage?.formats?.small?.url
            ? {
                img: strapiBackend + post.coverImage.formats.small.url,
                alt: post.coverImage.alternativeText || 'Cover image',
            }
            : DEFAULT_COVER,
        createdAt: formatDate(post.createdAt),
        slug: `/posts/${post.slug}`,
        tagIds: post.tags?.map((tag: any) => tag.id) || [],
    }))

    return {
        articles: mapped,
        heroArticle: mapped[0] || null,
        tags: tagData,
    }
}
