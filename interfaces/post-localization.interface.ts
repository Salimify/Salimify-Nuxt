export interface PostLocalization {
    id: number
    documentId: string
    title: string
    slug: string
    content: string
    shortDescription: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
}
