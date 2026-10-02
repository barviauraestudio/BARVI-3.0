import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Play } from 'lucide-react'
import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

interface Reel {
  id: number
  title: string
  client: string
  category: string
  username: string
  caption: string
  audioTrack: string
  likes: string
  comments: string
  videoUrl: string
  profilePic: string
}

const REELS_DATA: Reel[] = [
  {
    id: 1,
    title: 'Posicionamento & Autoridade Cirúrgica',
    client: 'Dr. Bernardo Passoni',
    category: 'Implantodontia & Periodontia',
    username: 'drbernardopassoni',
    caption: 'Produção audiovisual cinematográfica para comunicar excelência técnica e atrair pacientes de alto valor.',
    audioTrack: 'drbernardopassoni • Som original',
    likes: '1.2M',
    comments: '1,234',
    videoUrl: 'https://res.cloudinary.com/djxzflu3n/video/upload/v1790956104/drbernardopassoni_1_u7n9v8.mp4',
    profilePic: '/foto-bernardo.jpg'
  },
  {
    id: 2,
    title: 'Estética Intencional & Presença Médica',
    client: 'Dr. Gustavo Neme',
    category: 'Medicina & Odontologia',
    username: 'gustavoneme_',
    caption: 'Narrativa visual desenvolvida com iluminação de alta fidelidade e posicionamento psicológico.',
    audioTrack: 'gustavoneme_ • Som original',
    likes: '840K',
    comments: '982',
    videoUrl: 'https://res.cloudinary.com/djxzflu3n/video/upload/v1790955187/gustavoneme_1_n5wdnb.mp4',
    profilePic: '/gustavoneme_avatar.jpg'
  },
  {
    id: 3,
    title: 'Narrativa Cinematográfica & Sofisticação',
    client: 'Dra. Jéssica Maria',
    category: 'Saúde & Estética',
    username: 'jessicaslmaria',
    caption: 'Registro de alto padrão com ritmo elegante e foco na transmissão de valor perene.',
    audioTrack: 'jessicaslmaria • Som original',
    likes: '960K',
    comments: '1,120',
    videoUrl: 'https://res.cloudinary.com/djxzflu3n/video/upload/v1790955183/jessicaslmaria_1_luwtnr.mp4',
    profilePic: '/jessicaslmaria_avatar.jpg'
  },
  {
    id: 4,
    title: 'Rigor Clínico & Protocolo Exclusivo',
    client: 'Dr. Bernardo Passoni',
    category: 'Plástica Periodontal',
    username: 'drbernardopassoni',
    caption: 'Qualidade técnica, moral e posicionamento audiovisual como diferencial competitivo no mercado de saúde.',
    audioTrack: 'drbernardopassoni • Som original',
    likes: '1.5M',
    comments: '2,040',
    videoUrl: 'https://res.cloudinary.com/djxzflu3n/video/upload/v1790956104/drbernardopassoni_2_jhppfb.mp4',
    profilePic: '/foto-bernardo.jpg'
  }
]

export default function ReelsSection() {
  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [liked, setLiked] = useState<Record<number, boolean>>({})

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const activeReel = REELS_DATA[activeReelIndex]

  // Handle play/pause toggle
  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  // Handle sound toggle
  const toggleMute = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Effect 1: fires only when the active reel changes (or on first mount)
  // First reel starts paused; every subsequent reel autoplays
  const isFirstMount = useRef(true)
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    el.load()
    el.muted = isMuted
    if (isFirstMount.current) {
      // Page load: keep paused so user must click to start
      el.pause()
      setIsPlaying(false)
      isFirstMount.current = false
    } else {
      // Navigated to a new reel: autoplay
      const p = el.play()
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeReelIndex])

  // Effect 2: sync mute state without touching play/pause
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = isMuted
  }, [isMuted])

  const nextReel = () => {
    if (activeReelIndex < REELS_DATA.length - 1) {
      setActiveReelIndex(prev => prev + 1)
    }
  }

  const prevReel = () => {
    if (activeReelIndex > 0) {
      setActiveReelIndex(prev => prev - 1)
    }
  }

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="reels" className="section" style={{ padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
      {/* SVG Icon Definition Sprite */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="i-heart" viewBox="0 0 24 24">
            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
          </symbol>
          <symbol id="i-comment" viewBox="0 0 24 24">
            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
          </symbol>
          <symbol id="i-send" viewBox="0 0 24 24">
            <line x1="22" y1="3" x2="9.218" y2="10.083" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
            <polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
          </symbol>
          <symbol id="i-dots" viewBox="0 0 24 24">
            <circle fill="#fff" cx="5" cy="12" r="1.700"/>
            <circle fill="#fff" cx="12" cy="12" r="1.700"/>
            <circle fill="#fff" cx="19" cy="12" r="1.700"/>
          </symbol>
          <symbol id="i-camera" viewBox="0 0 24 24">
            <rect fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" x="3" y="6.500" width="18" height="14" rx="4"/>
            <path fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M8 6.500l1.200-2.500h5.600L16 6.500"/>
            <circle fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" cx="12" cy="13.500" r="3.600"/>
          </symbol>
          <symbol id="i-home" viewBox="0 0 24 24">
            <path fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 10.500L12 3l9 7.500V21H14.500v-6h-5v6H3z"/>
          </symbol>
          <symbol id="i-search" viewBox="0 0 24 24">
            <circle fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" cx="11" cy="11" r="7.500"/>
            <path fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M16.500 16.500L21 21"/>
          </symbol>
          <symbol id="i-reels" viewBox="0 0 24 24">
            <rect fill="#fff" x="3" y="3" width="18" height="18" rx="5"/>
            <path d="M3 8.500h18M9 3l3 5.500M15 3l3 5.500" stroke="#000" strokeWidth="1.700" fill="none"/>
            <path d="M10.500 12.200v5l4.300-2.500z" fill="#000"/>
          </symbol>
          <symbol id="i-bag" viewBox="0 0 24 24">
            <path fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M5 8h14l1 13H4zM8.500 8V6.500a3.500 3.500 0 0 1 7 0V8"/>
          </symbol>
          <symbol id="i-bars" viewBox="0 0 14 14">
            <rect x="1" y="4" width="2" height="6" rx="1" fill="#fff"/>
            <rect x="5" y="1.500" width="2" height="11" rx="1" fill="#fff"/>
            <rect x="9" y="3.500" width="2" height="7" rx="1" fill="#fff"/>
          </symbol>
        </defs>
      </svg>

      <CenterWrapper>
        {/* Section Header */}
        <Reveal className="section-header" style={{ marginBottom: 32 }}>
          <p className="section-eyebrow" style={{ color: 'rgba(167, 135, 121, 0.9)' }}>CONTEÚDO AUDIOVISUAL</p>
          <h2 className="section-title" style={{ color: '#111111' }}>
            Produções em formato <em style={{ color: 'var(--crimson)', fontStyle: 'normal', fontWeight: 600 }}>Reels</em>
          </h2>
          <div className="section-rule" style={{ background: 'var(--crimson)' }} />
        </Reveal>

        <Reveal style={{ marginBottom: 36 }}>
          <p className="manifesto-text" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', maxWidth: '620px', color: '#3a3a3a' }}>
            Vídeos verticais desenvolvidos com estética cinematográfica, edição cirúrgica e roteiros estratégicos para converter visualizações em autoridade.
          </p>
        </Reveal>

        {/* Centered Reels Stage Wrapper Container */}
        <div className="w-full flex justify-center">
          
          {/* Centered iPhone Mockup Frame & Pinned Controls */}
          <div className="reels-stage-wrapper">
            <div className="stage framed">
              <div className="scaler">
                <div className="iphone">
                  <div className="island"></div>
                  <div className="screen">

                    {/* Video Element Only - No photo fallback */}
                    <video
                      key={activeReel.id}
                      ref={videoRef}
                      className="reel-media"
                      src={activeReel.videoUrl}
                      muted={isMuted}
                      loop
                      playsInline
                      onClick={togglePlay}
                    />



                    {/* Top iOS Status Bar */}
                    <div className="status">
                      <span className="time">12:15</span>
                      <span className="sys">
                        <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.500" width="3" height="6.500" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
                        <svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.500 2.200c2.300 0 4.400.9 6 2.400l1.100-1.200A10.600 10.600 0 0 0 8.500.500 10.600 10.600 0 0 0 1.400 3.400l1.100 1.200a8.900 8.900 0 0 1 6-2.400zm0 3.700c1.300 0 2.500.5 3.400 1.300l1.100-1.200a7.100 7.100 0 0 0-9 0l1.100 1.200c.9-.8 2.100-1.300 3.400-1.300zm0 3.600l-2-2.100a3 3 0 0 1 4 0z"/></svg>
                        <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.500" fill="none" stroke="#fff" opacity=".5"/><rect x="2" y="2" width="19" height="9" rx="2.200"/><path d="M24 4.500v4c.9-.3 1.500-1.100 1.500-2s-.6-1.700-1.500-2z" opacity=".5"/></svg>
                      </span>
                    </div>

                    {/* Header */}
                    <div className="header">
                      <h1>Reels</h1>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleMute}
                          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer"
                          aria-label="Ativar áudio"
                        >
                          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#a78779]" />}
                        </button>
                        <svg width="28" height="28"><use href="#i-camera"/></svg>
                      </div>
                    </div>

                    {/* Paused Play Indicator */}
                    {!isPlaying && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                          <Play size={24} className="fill-white translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Right Action Bar */}
                    <div className="actions">
                      <div className="act" onClick={() => toggleLike(activeReel.id)} style={{ cursor: 'pointer' }}>
                        <svg className={liked[activeReel.id] ? 'fill-red-500 stroke-red-500' : ''}>
                          <use href="#i-heart"/>
                        </svg>
                        <span>{activeReel.likes}</span>
                      </div>
                      <div className="act">
                        <svg><use href="#i-comment"/></svg>
                        <span>{activeReel.comments}</span>
                      </div>
                      <div className="act"><svg><use href="#i-send"/></svg></div>
                      <div className="act"><svg><use href="#i-dots"/></svg></div>
                      <div 
                        className="audio-thumb" 
                        style={{ backgroundImage: `url(${activeReel.profilePic})` }} 
                      />
                    </div>

                    {/* Bottom Metadata */}
                    <div className="meta">
                      <div className="user">
                        <div 
                          className="avatar" 
                          style={{ backgroundImage: `url(${activeReel.profilePic})` }} 
                        />
                        <span>{activeReel.username}</span>
                        <span className="dot">•</span>
                        <span>Seguir</span>
                      </div>
                      <div className="caption">{activeReel.caption}</div>
                      <div className="audio">
                        <svg><use href="#i-bars"/></svg>
                        <span>{activeReel.audioTrack}</span>
                      </div>
                    </div>

                    {/* Bottom Instagram Navigation Bar */}
                    <div className="nav">
                      <svg><use href="#i-home"/></svg>
                      <svg><use href="#i-search"/></svg>
                      <svg><use href="#i-reels"/></svg>
                      <svg><use href="#i-bag"/></svg>
                      <span 
                        className="profile" 
                        style={{
                          backgroundImage: `url(${activeReel.profilePic})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    </div>
                    <div className="home-indicator"></div>

                  </div>
                </div>
              </div>
            </div>

            {/* Pinned Vertical Navigation Control (Anchored to Right Edge of iPhone Frame) */}
            <nav className="reels-nav vertical" aria-label="Navegação dos vídeos">
              <button 
                className="reels-btn" 
                data-dir="prev" 
                aria-label="Vídeo anterior"
                onClick={prevReel}
                disabled={activeReelIndex === 0}
              >
                <svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg>
              </button>

              <div className="reels-dots" role="tablist" aria-label="Vídeos">
                {REELS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    className={`reels-dot ${idx === activeReelIndex ? 'is-active' : ''}`}
                    role="tab"
                    aria-label={`Vídeo ${idx + 1}`}
                    onClick={() => setActiveReelIndex(idx)}
                  />
                ))}
              </div>

              <button 
                className="reels-btn" 
                data-dir="next" 
                aria-label="Próximo vídeo"
                onClick={nextReel}
                disabled={activeReelIndex === REELS_DATA.length - 1}
              >
                <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </nav>

          </div>

        </div>
      </CenterWrapper>

      {/* Embedded Scoped CSS for Reels Section */}
      <style>{`
        #reels {
          --pink: #0d0608;
          --white: #ffffff;
          --black: #000000;
          --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;

          --reels-accent: #a78779;
          --reels-ink: #1b1917;
          --reels-line: rgba(27, 25, 23, 0.22);
          --reels-line-hover: var(--reels-accent);
          --reels-dot: rgba(27, 25, 23, 0.2);
          --btn-size: 42px;
          --ease: cubic-bezier(.2,.7,.2,1);
        }
        @media (max-width: 640px) {
          #reels {
            --btn-size: 34px;
          }
        }

        /* Scaler calculation & Stage Relative Wrapper */
        .reels-stage-wrapper {
          --scale: 0.85;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          width: fit-content;
        }
        @media (max-width: 640px) {
          .reels-stage-wrapper {
            --scale: 0.56;
            transform: translateX(-24px);
          }
        }
        @media (max-width: 380px) {
          .reels-stage-wrapper {
            --scale: 0.50;
            transform: translateX(-20px);
          }
        }

        .stage {
          width: calc(390px * var(--scale));
          height: calc(844px * var(--scale));
          flex: none;
          margin: 0 auto;
        }
        .scaler {
          width: 390px;
          height: 844px;
          transform: scale(var(--scale));
          transform-origin: top left;
        }

        .stage.framed .scaler {
          width: 414px;
          height: 868px;
          transform-origin: top left;
        }
        .stage.framed {
          width: calc(414px * var(--scale));
          height: calc(868px * var(--scale));
          margin: 0 auto;
        }

        .iphone {
          position: relative;
          width: 414px;
          height: 868px;
          background: var(--black);
          border-radius: 66px;
          padding: 12px;
          box-shadow:
            0 0 0 2px #d9dadd,
            0 0 0 3px #b8babf,
            0 18px 40px rgba(0,0,0,.18);
          margin: 0 auto;
        }
        .iphone::before, .iphone::after {
          content: "";
          position: absolute;
          width: 4px;
          background: #b8babf;
          border-radius: 2px;
        }
        .iphone::before { left: -6px; top: 150px; height: 60px; box-shadow: 0 80px 0 #b8babf; }
        .iphone::after { right: -6px; top: 190px; height: 96px; }
        .iphone .screen { border-radius: 54px; }

        .island {
          position: absolute;
          z-index: 20;
          top: 23px;
          left: 50%;
          transform: translateX(-50%);
          width: 122px;
          height: 35px;
          background: #000;
          border-radius: 20px;
        }

        .screen {
          position: relative;
          width: 390px;
          height: 844px;
          background: #000;
          overflow: hidden;
          color: #ffffff !important;
          border-radius: 48px;
        }

        /* Force pure white text inside the screen */
        .screen *,
        .status *,
        .status .time,
        .header *,
        .header h1,
        .actions *,
        .act span,
        .meta *,
        .user *,
        .caption,
        .audio * {
          color: #ffffff !important;
        }

        .reel-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: transparent;
        }

        .status {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 54px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 34px 0 40px;
        }
        .status .time { font-weight: 600; font-size: 17px; letter-spacing: -.2px; color: #ffffff !important; }
        .status .sys { display: flex; align-items: center; gap: 6px; }
        .status svg { display: block; fill: #fff; }

        .header {
          position: absolute;
          top: 62px; left: 0; right: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18px 0 18px;
        }
        .header h1 { font-size: 26px; font-weight: 700; letter-spacing: -.4px; color: #ffffff !important; margin: 0; }
        .ico { fill: none; stroke: #fff; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .ico-fill { fill: #fff; stroke: none; }

        .actions {
          position: absolute;
          right: 12px;
          bottom: 128px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .act { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .act svg { width: 28px; height: 28px; }
        .act span { font-size: 13px; font-weight: 500; color: #ffffff !important; }
        .act:first-child svg { width: 32px; height: 32px; margin-bottom: -1px; }
        .audio-thumb {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 2.5px solid #fff;
          background-position: center;
          background-size: cover;
          margin-top: 2px;
        }

        .meta {
          position: absolute;
          left: 14px;
          right: 80px;
          bottom: 100px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .user { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #ffffff !important; }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-position: center;
          background-size: cover;
          border: 1.5px solid #fff;
          flex: none;
        }
        .user .dot { opacity: .9; font-weight: 700; color: #ffffff !important; }
        .caption { font-size: 14.5px; font-weight: 400; line-height: 1.4; text-shadow: 0 1px 4px rgba(0,0,0,0.6); color: #ffffff !important; }
        .audio { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #ffffff !important; }
        .audio svg { width: 14px; height: 14px; flex: none; }

        .nav {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 84px;
          z-index: 15;
          background: #000;
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          padding: 14px 14px 0;
        }
        .nav svg { width: 27px; height: 27px; }
        .nav .profile {
          width: 27px;
          height: 27px;
          border-radius: 50%;
          border: 1.6px solid #fff;
          display: block;
          position: relative;
        }
        .home-indicator {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 140px;
          height: 5px;
          border-radius: 3px;
          background: #fff;
          z-index: 16;
        }

        /* ===== User Minimalist Navigation Controls ===== */
        .reels-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .reels-nav.vertical {
          position: absolute;
          left: calc(100% + 38px);
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          flex-direction: column;
          gap: 12px;
          margin: 0;
          pointer-events: auto;
        }
        @media (max-width: 640px) {
          .reels-nav.vertical {
            left: calc(100% + 36px);
          }
        }
        @media (max-width: 380px) {
          .reels-nav.vertical {
            left: calc(100% + 30px);
          }
        }

        .reels-btn {
          appearance: none;
          -webkit-appearance: none;
          width: var(--btn-size);
          height: var(--btn-size);
          border-radius: 50%;
          border: 1px solid var(--reels-line);
          background: rgba(255, 255, 255, 0.85);
          color: var(--reels-ink);
          display: grid;
          place-items: center;
          cursor: pointer;
          padding: 0;
          transition: border-color .35s var(--ease), color .35s var(--ease),
                      transform .35s var(--ease), background .35s var(--ease);
          -webkit-tap-highlight-color: transparent;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .reels-btn svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform .35s var(--ease);
        }
        .reels-btn:hover {
          border-color: var(--reels-line-hover);
          color: var(--reels-accent);
          background: #ffffff;
        }
        .reels-btn[data-dir="prev"]:hover svg { transform: translateY(-2px); }
        .reels-btn[data-dir="next"]:hover svg { transform: translateY(2px); }
        .reels-btn:active { transform: scale(.94); }
        .reels-btn:focus-visible { outline: 1px solid var(--reels-accent); outline-offset: 3px; }
        .reels-btn:disabled { opacity: .3; cursor: default; pointer-events: none; }

        .reels-dots { display: flex; align-items: center; gap: 6px; }
        .reels-nav.vertical .reels-dots { flex-direction: column; }
        .reels-dot {
          width: 5px;
          height: 5px;
          border-radius: 99px;
          border: 0;
          padding: 0;
          background: var(--reels-dot);
          cursor: pointer;
          transition: height .45s var(--ease), background .35s var(--ease);
        }
        .reels-dot.is-active { background: var(--reels-accent); }
        .reels-nav.vertical .reels-dot.is-active { width: 5px; height: 18px; }
      `}</style>
    </section>
  )
}
