import type {Author} from "~/components/interfaces/author.interface";
import type {Tag} from "~/components/interfaces/tag.interface";
import type {PostLocalization} from "~/components/interfaces/post-localization.interface";
import type {CoverImage, FlatCoverImage} from "~/components/interfaces/cover-image.interface";
import type {PostTag} from "~/components/interfaces/blog.interfaces";

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
    tags?: PostTag[]
}

