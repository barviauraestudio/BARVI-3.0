import { useState, useEffect } from 'react'

import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Pillars from './components/Pillars'
import Psychology from './components/Psychology'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'
import { useBlurSiblings } from './components/useBlurSiblings'
import EmailPopup from './components/EmailPopup'
import Minimalism from './components/Minimalism'
import Grainient from './components/Grainient'
import OfficeGallery from './components/OfficeGallery'
import InstagramCarousel from './components/InstagramCarousel'
import Investment from './components/Investment'

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
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(10,3,5,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(167,135,121,0.18);
          padding: 10px 16px 10px 12px;
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
  const [isAuroraVisible, setIsAuroraVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const nearTop = scrollY < winHeight * 1.6;
      setIsAuroraVisible(nearTop);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Grainient — fixed background WebGL gradient, all sections scroll over it */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, overflow: 'hidden' }}>
        <Grainient
          color1="#a78779"
          color2="#ffffff"
          color3="#7d5d50"
          timeSpeed={0.25}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={0.3}
          warpAmplitude={44}
          blendAngle={69}
          blendSoftness={0.2}
          rotationAmount={490}
          noiseScale={0.25}
          grainAmount={0}
          grainScale={1.9}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={0.9}
          centerX={0.0}
          centerY={0.0}
          zoom={1.05}
        />
      </div>
      {/* Película suavizada para dar mais vida à aurora */}
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: -1, 
          background: 'rgba(167,135,121,0.25)', 
          pointerEvents: 'none',
          opacity: isAuroraVisible ? 1 : 0,
          transition: 'opacity 0.8s ease'
        }} 
      />
      <ScrollProgress />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <Nav menuOpen={menuOpen} onToggle={toggleMenu} />
      
      <Hero />
      <Manifesto />
      
      {/* Middle Sections with White Background & Light Theme */}
      <div 
        id="middle-sections"
        className="middle-sections-container theme-light"
        style={{ backgroundColor: '#FFFFFF', color: '#111111', position: 'relative', zIndex: 10 }}
      >
        <Minimalism />
        <Pillars />
        <OfficeGallery />
        <Psychology />
        <InstagramCarousel />
        <Partners />
        <Investment />
        <Testimonials />
      </div>
      
      <CTA />
      <Footer />
      <AudioPlayer src="/SITE-AURA-AUDIO.MP3" />
      <BackToTop />
      <EmailPopup />
    </>
  )
}

export default App
