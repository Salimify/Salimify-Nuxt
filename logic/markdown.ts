import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.min.css'

marked.setOptions({
    gfm: true,
    breaks: true,
})

marked.use(
    markedHighlight({
        highlight(code, lang) {
            const language = lang && Prism.languages[lang]
                ? Prism.languages[lang]
                : Prism.languages.markup

            try {
                return Prism.highlight(code, language, lang || 'markdown')
            } catch (e) {
                console.warn(`[Prism] Error highlighting "${lang}":`, e)
                return code
            }
        }
    })
)

export const parseMarkdown = (markdown: string): string => {
  return marked(markdown) as string
}

export const stripMarkdown = (markdown: string): string => {
    return markdown
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/[#_*`>~-]/g, '')
        .replace(/\n{2,}/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}
