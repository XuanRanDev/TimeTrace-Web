import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

const docSubLinks = [
  { label: '概览', href: '/docs' },
  { label: '文件浏览', href: '/docs/files' },
  { label: '任务管理', href: '/docs/tasks' },
  { label: '定时任务', href: '/docs/schedules' },
  { label: '分类规则', href: '/docs/rules' },
  { label: '命名规则', href: '/docs/naming' },
  { label: '媒体修复工具', href: '/docs/tools' },
  { label: '重复查找', href: '/docs/duplicates' },
]

const navLinks = [
  { label: '首页', href: '/' },
  { label: '使用教程', href: '/docs', hasDropdown: true },
  { label: '常见问题', href: '/faq' },
  { label: '更新日志', href: '/changelog' },
  { label: '问题反馈', href: '/feedback' },
]

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)
  const [mobileDocsOpen, setMobileDocsOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isDocsActive = location.pathname === '/docs' || location.pathname.startsWith('/docs/')

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDocsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="时迹" className="w-8 h-8 rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">时迹</span>
            <span className="text-accent ml-1.5 font-medium text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">TimeTrace</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDocsOpen(o => !o)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 flex items-center gap-1 ${
                    isDocsActive
                      ? 'text-white bg-white/10'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${docsOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className={`absolute top-full left-0 mt-1.5 w-44 bg-dark-lighter/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-black/30 overflow-hidden transition-all duration-200 origin-top ${
                  docsOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}>
                  {docSubLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      onClick={() => setDocsOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${
                        location.pathname === sub.href
                          ? 'text-white bg-white/10'
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'text-white bg-white/10'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <button
          className="md:hidden text-text-secondary hover:text-white p-2 transition-colors duration-200"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-dark-lighter/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1">
          {navLinks.map((link, i) =>
            link.hasDropdown ? (
              <div key={link.href}>
                <button
                  onClick={() => setMobileDocsOpen(o => !o)}
                  style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                    isDocsActive
                      ? 'text-white bg-white/10'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileDocsOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${mobileDocsOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="pl-4 mt-1 space-y-1 border-l border-white/10 ml-4">
                    {docSubLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        onClick={() => { setMobileOpen(false); setMobileDocsOpen(false) }}
                        className={`block px-4 py-2.5 text-sm rounded-lg transition-colors duration-150 ${
                          location.pathname === sub.href
                            ? 'text-white bg-white/10'
                            : 'text-text-secondary hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'text-white bg-white/10'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
