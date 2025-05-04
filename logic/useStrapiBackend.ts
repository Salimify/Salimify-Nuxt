export const useStrapiBackend = (): string => {
    return useRuntimeConfig().public.STRAPI_BACKEND as string || 'http://localhost:1337'
}
