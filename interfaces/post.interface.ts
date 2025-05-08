import type {Author} from "~/interfaces/author.interface";
import type {Tag} from "~/interfaces/tag.interface";
import type {PostLocalization} from "~/interfaces/post-localization.interface";
import type {CoverImage, FlatCoverImage} from "~/interfaces/cover-image.interface";

export interface Post {
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
    coverImage: CoverImage | null
    author: Author
    tags: Tag[]
    localizations: PostLocalization[]
}

export interface MappedPost {
    id: number
    title: string
    description: string
    cover: FlatCoverImage
    createdAt: string
    readTime?: string
    slug: string
    tagIds: number[]
}


export interface PostData {
    title: string
    description: string
    author: Author
    cover: CoverImage
    readTime: string
    createdAt: string
    content: string,
    tags?: Tag[]
}

