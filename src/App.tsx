import { useLayoutEffect, useSyncExternalStore } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import Navbar from './components/Navbar'
import MouseGlow from './components/MouseGlow'
import Particles from './components/Particles'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import TechStack from './components/TechStack'
import Install from './components/Install'
import Footer from './components/Footer'
import PaymentSuccess from './pages/PaymentSuccess'
import MarkdownPage from './pages/MarkdownPage'
import TermsPage from './pages/TermsPage'
import FeedbackPage from './pages/FeedbackPage'
import changelogMd from './assets/md/changelog.md?raw'
import docsMd from './assets/md/docs.md?raw'
import faqMd from './assets/md/faq.md?raw'

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div key={location.pathname} className="animate-page-in">
      {children}
    </div>
  )
}

function useScrolled() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('scroll', callback, { passive: true })
      return () => window.removeEventListener('scroll', callback)
    },
    () => window.scrollY > 20,
    () => false,
  )
}

function SiteLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigationType = useNavigationType()
  const scrolled = useScrolled()

  useLayoutEffect(() => {
    // 浏览器前进/后退（POP）：交还给浏览器自己的滚动位置恢复机制，不要强制归零，
    // 否则"返回"永远会回到页面顶部，而不是离开前的阅读位置
    if (navigationType === 'POP') return

    // 带锚点的跳转（包括跨页面，如 /docs#多用户与数据隔离）：内容是客户端渲染的，
    // 浏览器在首次加载/路由切换时根本看不到目标标题，原生的锚点跳转必然落空，
    // 所以这里手动找到目标元素并滚动过去
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash, navigationType])

  return (
    <div className="min-h-screen bg-dark">
      <MouseGlow />
      <Particles />
      <Navbar scrolled={scrolled} />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </div>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <TechStack />
      <Install />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/changelog" element={<SiteLayout><div className="max-w-4xl mx-auto px-6 py-24"><MarkdownPage content={changelogMd} /></div></SiteLayout>} />
        <Route path="/docs" element={<SiteLayout><div className="max-w-4xl mx-auto px-6 py-24"><MarkdownPage content={docsMd} /></div></SiteLayout>} />
        <Route path="/faq" element={<SiteLayout><div className="max-w-4xl mx-auto px-6 py-24"><MarkdownPage content={faqMd} /></div></SiteLayout>} />
        <Route path="/terms" element={<SiteLayout><TermsPage /></SiteLayout>} />
        <Route path="/feedback" element={<SiteLayout><FeedbackPage /></SiteLayout>} />
        <Route path="/payment-success" element={<SiteLayout><PaymentSuccess /></SiteLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
