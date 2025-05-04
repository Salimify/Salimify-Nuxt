import type {Tag} from "~/components/interfaces/tag.interface";
import type {Author} from "~/components/interfaces/author.interface";
import type {CoverImage} from "~/components/interfaces/cover-image.interface";

export interface BlogScaffoldProp {
    title: string
    description: string
    author: Author
    createdAt: string
    readTime: string
    cover: CoverImage
    tags?: Tag[]
}
