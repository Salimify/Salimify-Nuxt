import { fetchPostsPure } from '~/logic/usePosts'
import type {Ref} from "vue";

export function usePaginatedPosts(page: number, tagId: Ref<number | null> | null = null, pageSize = 3) {
    const { data } = useAsyncData(`posts-page-${page}`, () => fetchPostsPure())

    const articles = computed(() => data.value?.articles || [])
    const tags = computed(() => data.value?.tags || [])

    const filteredArticles = computed(() =>
        tagId?.value ? articles.value.filter(a => a.tagIds.includes(<number>tagId.value)) : articles.value
    )

    const heroArticle = computed(() => filteredArticles.value[0] || null)
    const paginatedArticles = computed(() => {
        const start = 1 + (page - 1) * pageSize
        return filteredArticles.value.slice(start, start + pageSize)
    })

    const pageCount = computed(() =>
        Math.ceil(Math.max(0, filteredArticles.value.length - 1) / pageSize)
    )

    const getTagsForPost = (post: any) =>
        post.tagIds.map((id: number) => tags.value.find(t => t.id === id)).filter(Boolean)

    return {
        tags,
        heroArticle,
        paginatedArticles,
        pageCount,
        getTagsForPost,
    }
}
