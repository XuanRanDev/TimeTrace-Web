import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

const linkClassName = 'text-accent hover:text-accent/80 underline underline-offset-2 transition-colors'

/**
 * Markdown 内的链接统一走这里：
 * - 外部链接 / mailto：保持原生 <a target="_blank">，不接管
 * - 站内链接（含 "#锚点" 或 "/path#锚点"）：走 react-router 的 <Link>，
 *   避免触发整页刷新——否则客户端渲染的标题在浏览器尝试跳转锚点时还不存在于 DOM 中，
 *   跳转必然落空（具体滚动逻辑见 App.tsx 的 SiteLayout）。
 */
export default function MarkdownLink({ href, children }: { href?: string; children?: ReactNode }) {
  const location = useLocation()

  if (!href) return <a className={linkClassName}>{children}</a>

  const isExternal = /^([a-z][a-z0-9+.-]*:)?\/\//i.test(href) || href.startsWith('mailto:')
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {children}
      </a>
    )
  }

  const to = href.startsWith('#') ? `${location.pathname}${href}` : href
  return (
    <Link to={to} className={linkClassName}>
      {children}
    </Link>
  )
}
