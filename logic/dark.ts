import { useDark, useToggle } from '@vueuse/core'

const defaultDark = true
const storageKey = 'vueuse-color-scheme'

// Safe localStorage access only on client side
if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey)
    if (stored === null) {
        localStorage.setItem(storageKey, defaultDark ? 'dark' : 'light')
    }
}

export const isDark = typeof window !== 'undefined'
    ? useDark({
        storageKey,
        valueDark: 'dark',
        valueLight: 'light',
    })
    : undefined

export const toggleDark = typeof window !== 'undefined' && isDark
    ? useToggle(isDark)
    : () => {} // no-op fallback
