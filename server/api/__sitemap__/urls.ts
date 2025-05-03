import {strapiBackend} from "~/logic/local-strings";

export default defineSitemapEventHandler(async () => {
    const posts: any = await $fetch(`${strapiBackend}/api/posts`)
    return posts.data.map((post: { slug: any; }) => `/posts/${post.slug}`)
});
