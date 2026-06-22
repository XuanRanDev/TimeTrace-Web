import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import TechStack from './components/TechStack'
import Install from './components/Install'
import Footer from './components/Footer'
import PaymentSuccess from './pages/PaymentSuccess'
import MarkdownPage from './pages/MarkdownPage'
import TermsPage from './pages/TermsPage'

const changelogMd = '/md/changelog.md'
const docsMd = '/md/docs.md'

function SiteLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setScrolled(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-dark">
      <Navbar scrolled={scrolled} />
      {children}
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
        <Route path="/changelog" element={<SiteLayout><div className="max-w-4xl mx-auto px-6 py-24"><MarkdownPage src={changelogMd} /></div></SiteLayout>} />
        <Route path="/docs" element={<SiteLayout><div className="max-w-4xl mx-auto px-6 py-24"><MarkdownPage src={docsMd} /></div></SiteLayout>} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}
