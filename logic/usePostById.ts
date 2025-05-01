import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { parseMarkdown } from '~/logic/markdown'
import type { CoverImage, PostData } from '~/components/interfaces/interfaces'
import { strapiBackend } from '~/logic/local-strings'

const DEFAULT_COVER: CoverImage = {
    img: '/article.png',
    alt: 'No image available',
}

const DEFAULT_AUTHOR_IMAGE = '/author.png' // fallback

const formatDate = (dateStr: string, locale = 'en-US'): string =>
    new Date(dateStr).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Etc/GMT-1',
    })

const estimateReadTime = (text: string): string => {
    const words = text.trim().split(/\s+/).length
    return `${Math.ceil(words / 200)} min`
}

export function usePostById() {
    const frontmatter = ref<PostData | null>(null)
    const loading = ref(false)
    const route = useRoute()

    const fetchPost = async () => {
        try {
            loading.value = true
            const slug = route.params.id

            // 1. Get post (with populated author relation if available)
            const postRes = await fetch(
                `${strapiBackend}/api/posts?filters[slug][$eq]=${slug}&populate=*`
            )
            const { data } = await postRes.json()

            if (!data || data.length === 0) {
                throw new Error('Post not found')
            }

            const post = data[0]
            const coverData = post.coverImage

            const cover: CoverImage = coverData
                ? {
                    img: strapiBackend + (coverData.formats?.small?.url ?? coverData.url),
                    alt: coverData.alternativeText || 'Cover image',
                }
                : DEFAULT_COVER

            const authorId = post.author?.documentId
            let authorData = null

            if (authorId) {
                const authorRes = await fetch(`${strapiBackend}/api/authors/${authorId}?populate=avatar`)
                const { data: author } = await authorRes.json()

                const avatar = author?.avatar
                authorData = {
                    name: author.name,
                    profileImage: avatar?.formats?.small?.url
                        ? strapiBackend + avatar.formats.small.url
                        : avatar?.url
                            ? strapiBackend + avatar.url
                            : DEFAULT_AUTHOR_IMAGE,
                    links: [],
                }
            }

            frontmatter.value = {
                title: post.title,
                description: post.content.slice(0, 150) + '...',
                author: authorData as any ?? {
                    name: 'Unknown',
                    profileImage: DEFAULT_AUTHOR_IMAGE,
                    links: [],
                },
                cover,
                readTime: estimateReadTime(post.content),
                createdAt: formatDate(post.createdAt),
                content: parseMarkdown(post.content),
                tags: post.tags || [],
            }
        } catch (error) {
            console.error('Error fetching post or author:', error)
        } finally {
            loading.value = false
        }
        return {
            frontmatter,
            loading,
            fetchPost,
        }
    }

    return {
        fetchPost,
    }
}
