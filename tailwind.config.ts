import defineConfig from '@nuxtjs/tailwindcss/config'
import typography from '@tailwindcss/typography'

export default defineConfig({
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['Charter', 'Georgia', 'serif'],
                prose: ['Charter', 'Georgia', 'serif'],
            },
            colors: {
                dark: {
                    50: '#2a2a2a',
                    400: '#2e2e2e',
                    500: '#3a3a3a',
                    700: '#1f1f1f',
                },
            },
            typography: (theme: any) => ({
                DEFAULT: {
                    css: {
                        fontFamily: theme('fontFamily.prose').join(', '),
                        fontSize: '1.125rem',
                        lineHeight: '1.8',
                        maxWidth: '70ch',
                        color: theme('colors.gray.800 dark:colors.gray.100'),
                        a: { color: theme('colors.blue.600'), textDecoration: 'underline' },
                        h1: {
                            fontFamily: theme('fontFamily.sans').join(', '),
                            fontWeight: '700',
                            fontSize: '2.5rem',
                            lineHeight: '1.25',
                            marginTop: '0',
                            marginBottom: '1.25em',
                        },
                        h2: {
                            fontWeight: '700',
                            fontSize: '1.875rem',
                            lineHeight: '1.4',
                            marginTop: '2.25em',
                            marginBottom: '1em',
                        },
                        h3: {
                            fontWeight: '600',
                            fontSize: '1.5rem',
                            lineHeight: '1.5',
                            marginTop: '2em',
                            marginBottom: '0.75em',
                        },
                        p: {
                            marginTop: '1.25em',
                            marginBottom: '1.25em',
                        },
                        blockquote: {
                            fontStyle: 'italic',
                            borderLeft: `4px solid ${theme('colors.gray.300')}`,
                            paddingLeft: '1em',
                            color: theme('colors.gray.600'),
                        },
                        code: {
                            padding: '0.25rem 0.375rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.875rem',
                        },
                        pre: {
                            padding: '1em',
                            borderRadius: '0.5em',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                        },
                        hr: {
                            margin: '2.5em 0',
                            borderColor: theme('colors.gray.300'),
                        },
                    },
                },
                dark: {
                    css: {
                        color: theme('colors.gray.200'),
                        a: { color: theme('colors.blue.400') },
                        blockquote: {
                            borderLeftColor: theme('colors.gray.600'),
                            color: theme('colors.gray.400'),
                        },
                        code: {
                            backgroundColor: theme('colors.gray.800'),
                        },
                        pre: {
                            backgroundColor: theme('colors.gray.800'),
                        },
                    },
                },
            }),
        },
    },
    safelist: [
        'prose',
        'prose-lg',
        'dark:prose-invert',
        'dark:border-dark-500',
        'dark:bg-dark-700',
        'dark:hover:bg-dark-400',
        'dark:border-dark-50',
        'border-dark-500',
        'bg-dark-400',
    ],
    plugins: [typography],
})
