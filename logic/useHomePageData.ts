import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import {useStrapiBackend} from "~/logic/useStrapiBackend";
import type {HomePageData} from "~/interfaces/homepage.interface";

export function useHomePageData() {
    const { locale } = useI18n()
    const strapiBackend = useStrapiBackend();

    const { data, pending, error } = useAsyncData(`home-page-${locale.value}`, async () => {
        try {
            const res: { data: HomePageData } = await $fetch(`${strapiBackend}/api/home-page`, {
                params: { locale: locale.value }
            })
            return res?.data || {}
        } catch (e) {
            console.error('Initial home-page fetch failed:', e)
            return {}
        }
    })

    watch(locale, async (newLocale) => {
        try {
            const res: { data: HomePageData } = await $fetch(`${strapiBackend}/api/home-page`, {
                params: { locale: newLocale }
            })
            data.value = res?.data || {}
        } catch (err) {
            console.error('Failed to refetch home-page content:', err)
        }
    })

    return { data, pending, error }
}
