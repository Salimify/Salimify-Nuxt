import { useHead } from '#imports'
import type {PostData} from "~/interfaces/post.interface";
import type {FlatCoverImage} from "~/interfaces/cover-image.interface";

export function usePostMeta(blogData: PostData, articleFullPath: string) {
    useHead({
        title: `${blogData.title} | StackOverFlous by Salimify`,
        titleTemplate: '%s',
        meta: [
            { name: 'description', content: blogData.description },
            { name: 'author', content: blogData.author.name },
            { name: 'robots', content: 'index, follow' },

            { property: 'og:type', content: 'article' },
            { property: 'og:site_name', content: 'StackOverFlous' },
            { property: 'og:url', content: articleFullPath },
            { property: 'og:title', content: blogData.title },
            { property: 'og:description', content: blogData.description },
            { property: 'og:image', content: (blogData.cover as unknown as FlatCoverImage).img },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:locale:alternate', content: 'de_DE' },
            { property: 'og:locale:alternate', content: 'fr_FR' },
            { property: 'article:author', content: blogData.author.name },
            { property: 'article:published_time', content: blogData.createdAt },
            ...(blogData.tags?.length
                ? blogData.tags.map(tag => ({
                    property: 'article:tag',
                    content: tag
                }))
                : []),

            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@Salimify' },
            {
                name: 'twitter:creator',
                content: `@Salimify`
            },
            { name: 'twitter:title', content: blogData.title },
            { name: 'twitter:description', content: blogData.description },
            { name: 'twitter:image', content: (blogData.cover as unknown as FlatCoverImage).img },
            { name: 'twitter:label1', content: 'Written by' },
            { name: 'twitter:data1', content: blogData.author.name }
        ],
        link: [{ rel: 'canonical', href: articleFullPath }]
    })
}
