import { useEffect, useSyncExternalStore } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
  const scrolled = useScrolled()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}
