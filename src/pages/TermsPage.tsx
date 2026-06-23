import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import termsMd from '../assets/md/terms.md?raw'

export default function TermsPage() {
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

        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={{
            h1: ({ children, id }) => <h1 id={id} className="text-3xl font-bold text-white mb-6 scroll-mt-24 first:mt-0">{children}</h1>,
            h2: ({ children, id }) => <h2 id={id} className="text-xl font-semibold text-white mb-4 mt-8 pb-3 border-b border-white/10 scroll-mt-24">{children}</h2>,
            h3: ({ children, id }) => <h3 id={id} className="text-lg font-semibold text-white mb-3 mt-6 scroll-mt-24">{children}</h3>,
            p: ({ children }) => <p className="text-text-secondary leading-relaxed mb-4">{children}</p>,
            a: ({ children, href }) => (
              <a href={href} className="text-accent hover:text-accent/80 underline underline-offset-2 transition-colors">{children}</a>
            ),
            ul: ({ children }) => <ul className="list-disc list-inside text-text-secondary space-y-1.5 mb-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside text-text-secondary space-y-1.5 mb-4">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
            hr: () => <hr className="border-white/10 my-8" />,
          }}
        >
          {termsMd}
        </Markdown>
      </div>
    </div>
  )
}
