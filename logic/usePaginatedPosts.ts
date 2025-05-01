import { computed } from 'vue'
import { usePosts } from '~/logic/usePosts'

export const usePaginatedPosts = (page: number, perPage = 6) => {
    const {
        filteredArticles,
        fetchPosts,
        tags,
        selectedTagId,
        getTagsForPost
    } = usePosts()

    // Defensive fallback in case filteredArticles isn't an array yet
    const safeFiltered = computed(() =>
        Array.isArray(filteredArticles.value) ? filteredArticles.value : []
    )

    // Hero is always the first post
    const heroArticle = computed(() => safeFiltered.value[0])

    // Remaining articles after hero
    const nonHeroArticles = computed(() => safeFiltered.value.slice(1))

    // Paginated slice of non-hero articles
    const paginatedArticles = computed(() =>
        nonHeroArticles.value.slice((page - 1) * perPage, page * perPage)
    )

    // Total pages
    const pageCount = computed(() =>
        Math.ceil(nonHeroArticles.value.length / perPage)
    )

    return {
        fetchPosts,
        tags,
        selectedTagId,
        filteredArticles: safeFiltered,
        heroArticle,
        paginatedArticles,
        pageCount,
        getTagsForPost
    }
}
