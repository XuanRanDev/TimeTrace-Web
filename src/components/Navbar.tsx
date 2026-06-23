import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const navLinks = [
  { label: '首页', href: '/' },
  { label: '使用教程', href: '/docs' },
  { label: '常见问题', href: '/faq' },
  { label: '更新日志', href: '/changelog' },
  { label: '问题反馈', href: '/feedback' },
]

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

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

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
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
          ))}
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

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-dark-lighter/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1">
          {navLinks.map((link, i) => (
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
          ))}
        </div>
      </div>
    </nav>
  )
}
