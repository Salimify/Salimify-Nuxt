// utils/markdown.ts
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import Prism from 'prismjs'

// Import Prism languages
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'

// Import Prism theme
import 'prismjs/themes/prism-tomorrow.css'

// Set up the marked parser with highlight support
marked.use(
  markedHighlight({
    highlight(code, lang) {
      const language = Prism.languages[lang] || Prism.languages.markup
      return Prism.highlight(code, language, lang)
    },
  }),
)

/**
 * Parse Markdown into HTML with syntax highlighting.
 */
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
