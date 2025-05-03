import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import { strapiBackend } from '~/logic/local-strings'

export function useLocalizedPrivacy(key = 'privacy') {
    const { locale } = useI18n()

    const { data, pending, error } = useAsyncData(`${key}-${locale.value}`, async () => {
        return await $fetch(`${strapiBackend}/api/privacy`, {
            params: { locale: locale.value }
        }).then((res: any) => res.data)
    })

    watch(locale, async (newLocale) => {
        try {
            const res: any = await $fetch(`${strapiBackend}/api/privacy`, {
                params: { locale: newLocale }
            })
            data.value = res.data
        } catch (err) {
            console.error('Error reloading privacy policy:', err)
        }
    })

    return { data, pending, error }
}
