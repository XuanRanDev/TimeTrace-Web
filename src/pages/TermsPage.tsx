import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function TermsPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/md/terms.md')
      .then((r) => r.text())
      .then(setContent)
      .catch(() => setContent('# 加载失败'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            返回首页
          </a>
        </div>

        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-6 first:mt-0">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold text-white mb-4 mt-8 pb-3 border-b border-white/10">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold text-white mb-3 mt-6">{children}</h3>,
              p: ({ children }) => <p className="text-text-secondary leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-text-secondary space-y-1.5 mb-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-text-secondary space-y-1.5 mb-4">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              hr: () => <hr className="border-white/10 my-8" />,
            }}
          >
            {content}
          </Markdown>
        )}
      </div>
    </div>
  )
}
