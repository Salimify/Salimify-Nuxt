export interface ImprintDocument {
    id: number
    documentId: string
    Imprint: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
}

export interface ImprintResponse {
    data: ImprintDocument
    meta: Record<string, unknown>
}
