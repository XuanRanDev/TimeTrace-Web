import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function MarkdownPage({ src }: { src: string }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent('# 加载失败'))
      .finally(() => setLoading(false))
  }, [src])

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto markdown-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold text-white mb-4 mt-8 pb-3 border-b border-white/10">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold text-white mb-3 mt-6">{children}</h3>,
          p: ({ children }) => <p className="text-text-secondary leading-relaxed mb-4">{children}</p>,
          a: ({ children, href }) => (
            <a href={href} className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors">{children}</a>
          ),
          ul: ({ children }) => <ul className="list-disc list-inside text-text-secondary space-y-1.5 mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-text-secondary space-y-1.5 mb-4">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          code: ({ className, children }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <pre className="bg-dark/60 border border-white/5 rounded-xl p-4 mb-4 overflow-x-auto">
                  <code className="text-sm text-text-secondary font-mono">{children}</code>
                </pre>
              )
            }
            return <code className="px-1.5 py-0.5 bg-white/5 rounded text-accent text-sm font-mono">{children}</code>
          },
          pre: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent/40 pl-4 mb-4 text-text-secondary italic">{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-white/10">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-white/5">{children}</tr>,
          th: ({ children }) => <th className="px-4 py-3 text-text-secondary font-medium">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 text-text-secondary">{children}</td>,
          hr: () => <hr className="border-white/10 my-8" />,
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
