import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import type {PrivacyPolicy} from "~/interfaces/privacy.interface";
import {useStrapiBackend} from "~/logic/useStrapiBackend";

export function useLocalizedPrivacy(key = 'privacy') {
    const { locale } = useI18n()
    const strapiBackend = useStrapiBackend()

    const { data, pending, error } = useAsyncData<PrivacyPolicy>(`${key}-${locale.value}`, async () => {
        return await $fetch(`${strapiBackend}/api/privacy`, {
            params: { locale: locale.value }
        }).then((res: any) => res.data)
    })

    watch(locale, async (newLocale) => {
        try {
            const res: { data: PrivacyPolicy } = await $fetch(`${strapiBackend}/api/privacy`, {
                params: { locale: newLocale }
            })
            data.value = res.data
        } catch (err) {
            console.error('Error reloading privacy policy:', err)
        }
    })

    return { data, pending, error }
}
