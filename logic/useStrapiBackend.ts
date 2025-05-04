export const useStrapiBackend = (): string => {
    return useRuntimeConfig().public.NUXT_PUBLIC_STRAPI_BACKEND || 'http://localhost:1337'
}
