import { useState, useEffect, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Eagerly loaded (Above the fold)
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'

// Lazy loaded (Below the fold)
const Features = lazy(() => import('./components/Features/Features'))
const GuestJourney = lazy(() => import('./components/GuestJourney/GuestJourney'))
const OmniChannel = lazy(() => import('./components/CoreModules/OmniChannel'))
const BookingEngine = lazy(() => import('./components/CoreModules/BookingEngine'))
const ContextualHelp = lazy(() => import('./components/CoreModules/ContextualHelp'))
const DigitalConcierge = lazy(() => import('./components/CoreModules/DigitalConcierge'))
const AnalyticsPreview = lazy(() => import('./components/AnalyticsPreview/AnalyticsPreview'))
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'))
const Pricing = lazy(() => import('./components/Pricing/Pricing'))
const FAQ = lazy(() => import('./components/FAQ/FAQ'))
const Footer = lazy(() => import('./components/Footer/Footer'))
const AboutSection = lazy(() => import('./components/AboutSection/AboutSection'))
const Blog = lazy(() => import('./components/Blog/Blog'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy/PrivacyPolicy'))

const RTL_LANGUAGES = ['ar']

const HomeContent = () => (
  <>
    <Hero />
    <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
      <Features />
      <GuestJourney />
      <OmniChannel />
      <BookingEngine />
      <ContextualHelp />
      <DigitalConcierge />
      <AnalyticsPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
    </Suspense>
  </>
);

function App() {
  const { i18n } = useTranslation()
  const location = useLocation()

  // Handle RTL/LTR direction based on language
  useEffect(() => {
    const isRtl = RTL_LANGUAGES.includes(i18n.language)
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language

    // Refresh ScrollTrigger after DOM layout shift
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 50)
  }, [i18n.language, location.pathname])

  useEffect(() => {
    // Scroll to top on pathname change unless there's a hash
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Helmet>
                <title>Innhance | Turn WhatsApp Chats into Hotel Bookings</title>
                <meta name="description" content="Innhance | AI-driven WhatsApp booking automation for Indian boutique hotels. Automate every inquiry 24/7 in 20+ languages." />
                <meta property="og:title" content="Innhance | Turn WhatsApp Chats into Hotel Bookings" />
                <meta property="og:description" content="Innhance | AI-driven WhatsApp booking automation for Indian boutique hotels. Automate every inquiry 24/7 in 20+ languages." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://innhance.in/" />
                <meta property="og:image" content="https://innhance.in/assets/og-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Innhance | Turn WhatsApp Chats into Hotel Bookings" />
                <meta name="twitter:description" content="Innhance | AI-driven WhatsApp booking automation for Indian boutique hotels. Automate every inquiry 24/7 in 20+ languages." />
                <meta name="twitter:image" content="https://innhance.in/assets/og-image.jpg" />
                <link rel="canonical" href="https://innhance.in/" />
              </Helmet>
              <HomeContent />
            </>
          } />
          <Route path="/hotel-whatsapp-automation" element={
            <>
              <Helmet>
                <title>Hotel WhatsApp Automation | Innhance</title>
                <meta name="description" content="Automate your hotel bookings with WhatsApp AI chatbot." />
                <link rel="canonical" href="https://innhance.in/hotel-whatsapp-automation" />
              </Helmet>
              <HomeContent />
            </>
          } />
          <Route path="/hotel-booking-automation" element={
            <>
              <Helmet>
                <title>Hotel Booking Automation | Innhance</title>
                <meta name="description" content="Seamless hotel booking automation for modern boutique hotels." />
                <link rel="canonical" href="https://innhance.in/hotel-booking-automation" />
              </Helmet>
              <HomeContent />
            </>
          } />
          <Route path="/ai-chatbot-for-hotels" element={
            <>
              <Helmet>
                <title>AI Chatbot for Hotels | Innhance</title>
                <meta name="description" content="24/7 AI Chatbot for hotels to handle guest inquiries and bookings instantly." />
                <link rel="canonical" href="https://innhance.in/ai-chatbot-for-hotels" />
              </Helmet>
              <HomeContent />
            </>
          } />
          <Route path="/about" element={
            <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
              <Helmet>
                <title>About Us | Innhance</title>
                <link rel="canonical" href="https://innhance.in/about" />
              </Helmet>
              <AboutSection />
            </Suspense>
          } />
          <Route path="/privacy" element={
            <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
              <Helmet>
                <title>Privacy Policy | Innhance</title>
                <link rel="canonical" href="https://innhance.in/privacy" />
              </Helmet>
              <PrivacyPolicy />
            </Suspense>
          } />
          <Route path="/blog" element={
            <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
              <Helmet>
                <title>Blog | Innhance</title>
                <link rel="canonical" href="https://innhance.in/blog" />
              </Helmet>
              <Blog />
            </Suspense>
          } />
          <Route path="/blog/:id" element={
            <Suspense fallback={<div style={{ minHeight: '100vh' }}></div>}>
              <Helmet>
                <title>Blog | Innhance</title>
                <link rel="canonical" href="https://innhance.in/blog" />
              </Helmet>
              <Blog />
            </Suspense>
          } />
          <Route path="*" element={<HomeContent />} />
        </Routes>
      </main>
      
      <Suspense fallback={<div style={{ minHeight: '200px' }}></div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
