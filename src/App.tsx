import { useState, useEffect } from 'react'

import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import ReelsSection from './components/ReelsSection'
import OfficeGallery from './components/OfficeGallery'
import InstagramCarousel from './components/InstagramCarousel'
import Manifesto from './components/Manifesto'
import Minimalism from './components/Minimalism'
import Pillars from './components/Pillars'
import Psychology from './components/Psychology'
import Testimonials from './components/Testimonials'
import Investment from './components/Investment'
import CTA from './components/CTA'
import Footer from './components/Footer'

import { useBlurSiblings } from './components/useBlurSiblings'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <button
        id="back-to-top"
        aria-label="Voltar ao topo"
        onClick={scrollTop}
        className={visible ? 'btt-visible' : ''}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span>topo</span>
      </button>

      <style>{`
        #back-to-top {
          position: fixed;
          bottom: 32px;
          left: 32px;
          height: 40px;
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(10,3,5,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(167,135,121,0.18);
          border-radius: 60px;
          padding: 0 18px 0 14px;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px);
          transition: opacity 0.35s, transform 0.35s, border-color 0.35s, background 0.35s;
        }
        #back-to-top.btt-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        #back-to-top:hover {
          border-color: rgba(167,135,121,0.55);
          background: rgba(20,5,10,0.88);
          transform: translateY(-3px);
        }
        #back-to-top svg { stroke: #a78779; flex-shrink: 0; }
        #back-to-top span {
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #B8AFA6;
          transition: color 0.3s;
          white-space: nowrap;
          font-family: 'Outfit', sans-serif;
        }
        #back-to-top:hover span { color: #c9b5ac; }
        @media (max-width: 640px) {
          #back-to-top { bottom: 20px; left: 20px; padding: 9px 14px 9px 12px; }
        }
      `}</style>
    </>
  )
}

function App() {
  useBlurSiblings(".pillars-grid", ".pillar-card");
  useBlurSiblings(".psych-states", ".psych-state");
  useBlurSiblings(".testimonials-grid", ".testimonial-card");
  useBlurSiblings(".manifesto-tagline", ".manifesto-pill");
  useBlurSiblings(".minimalism-grid", ".minimalism-card");
  useBlurSiblings(".investment-grid", ".investment-card");

  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  function closeMenu() {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <ScrollProgress />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <Nav menuOpen={menuOpen} onToggle={toggleMenu} />
      
      <div className="theme-section theme-espresso">
        <Hero />
      </div>
      
      {/* Dynamic 4-Color Section Flow */}
      <div id="middle-sections" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Visual Proof & Assets First */}
        <div className="theme-section theme-cream">
          <ReelsSection />
        </div>

        <div className="theme-section theme-mocha">
          <OfficeGallery />
        </div>

        <div className="theme-section theme-cream">
          <InstagramCarousel />
        </div>

        {/* Brand Philosophy & Strategy */}
        <div className="theme-section theme-rose">
          <Manifesto />
        </div>

        <div className="theme-section theme-espresso">
          <Minimalism />
        </div>

        <div className="theme-section theme-cream">
          <Pillars />
        </div>

        <div className="theme-section theme-mocha">
          <Psychology />
        </div>

        {/* Social Proof & Investment */}
        <div className="theme-section theme-cream">
          <Testimonials />
        </div>

        <div className="theme-section theme-espresso">
          <Investment />
        </div>
      </div>
      
      <div className="theme-section theme-rose">
        <CTA />
      </div>

      <div className="theme-section theme-rose">
        <Footer />
      </div>

      <BackToTop />
    </>
  )
}

export default App
