export interface ImageFormat {
    name: string
    hash: string
    ext: string
    mime: string
    path: string | null
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export interface FlatCoverImage {
    img: string
    alt: string
}

export interface CoverImage {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
        thumbnail?: ImageFormat
        small?: ImageFormat
        medium?: ImageFormat
        large?: ImageFormat
    }
}
