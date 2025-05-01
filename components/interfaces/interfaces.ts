export interface Author {
  name: string
  profileImage: string
  about?: string
  links: [string]
}
export interface CoverImage {
  img: string
  alt: string
}
export interface BlogScaffoldProp {
  title: string
  description: string
  author: Author
  createdAt: string
  readTime: string
  cover: CoverImage
  tags?: any[]
}

export interface Article {
  id: number
  title: string
  description: string
  cover: {
    img: string
    alt?: string
  }
  createdAt: string
  slug: string,
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

export interface PostTag {
  id: number
  name: string
  slug: string
}
