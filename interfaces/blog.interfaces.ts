import type {Tag} from "~/interfaces/tag.interface";
import type {Author} from "~/interfaces/author.interface";
import type {CoverImage} from "~/interfaces/cover-image.interface";

export interface BlogScaffoldProp {
    title: string
    description: string
    author: Author
    createdAt: string
    readTime: string
    cover: CoverImage
    tags?: Tag[]
}
