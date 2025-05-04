import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import {useStrapiBackend} from "~/logic/useStrapiBackend";

export function useLocalizedImprint(key = 'imprint') {
    const strapiBackend = useStrapiBackend();
    const { locale } = useI18n()

    const { data, pending, error } = useAsyncData(`${key}-${locale.value}`, async () => {
        return await $fetch(`${strapiBackend}/api/imprint`, {
            params: { locale: locale.value }
        }).then((res: any) => res.data)
    })

    watch(locale, async (newLocale) => {
        try {
            const res: any = await $fetch(`${strapiBackend}/api/imprint`, {
                params: { locale: newLocale }
            })
            data.value = res.data
        } catch (err) {
            console.error('Error reloading imprint content:', err)
        }
    })

    return { data, pending, error }
}
