import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'
import FadeContent from './FadeContent'
import BorderGlow from './BorderGlow'
import { X, ZoomIn } from 'lucide-react'

const OFFICE_PHOTOS = [
  {
    src: '/equipe_1.png',
    title: 'Presença & Acolhimento',
    desc: 'Retratos estratégicos que capturam a autoridade e a atmosfera acolhedora do ambiente clínico.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/equipe_2.png',
    title: 'Autoridade & Elegância',
    desc: 'Composição de imagem refinada transmitindo sofisticação, segurança e empatia no atendimento.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/equipe_3.png',
    title: 'Posicionamento Corporativo',
    desc: 'Fotografia de liderança para especialistas, alinhando sobriedade e reputação de alto nível.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/equipe_4.jpg',
    title: 'Rigor & Credenciais Clínicas',
    desc: 'Imagem profissional evidenciando a formação técnica, especializações e rigor médico.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/equipe_5.png',
    title: 'Conexão & Proximidade',
    desc: 'Fotografia autoral que integra tecnologia, atendimento humano e alta percepção de valor.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/equipe_6.jpg',
    title: 'Precisão em Ação',
    desc: 'Registro dinâmico de procedimento sob luz de precisão com máxima atenção aos detalhes.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/equipe_7.jpg',
    title: 'Atendimento Humanizado',
    desc: 'Olhar atento e postura clínica transmitindo segurança, protocolo e cuidado com o paciente.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/equipe_8.jpg',
    title: 'Postura & Identidade',
    desc: 'Retrato de apresentação profissional destacando simpatia, elegância e autoridade natural.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  },
  {
    src: '/estetica_2.jpg',
    title: 'Fotografia Clínica Estética',
    desc: 'Capturas em alta fidelidade evidenciando a minúcia, materiais e tecnologia em tratamentos de saúde.',
    aspect: 'aspect-[9/16] md:aspect-[3/4]'
  }
]

export default function OfficeGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add('lightbox-open')
    } else {
      document.body.classList.remove('lightbox-open')
    }
    return () => document.body.classList.remove('lightbox-open')
  }, [selectedImage])

  return (
    <section id="consultorios" className="section" style={{ padding: '100px 0' }}>
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 50 }}>
          <p className="section-eyebrow">DIREÇÃO DE IMAGEM</p>
          <h2 className="section-title">
            A Narrativa do <em style={{ color: 'var(--gold)' }}>Rigor Clínico</em>
          </h2>
          <div className="section-rule" />
        </Reveal>

        <Reveal style={{ marginBottom: 40 }}>
          <p className="partners-intro" style={{
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            maxWidth: '680px',
            lineHeight: 1.7,
            color: 'var(--muted)',
            textAlign: 'center',
            margin: '0 auto'
          }}>
            Produção de imagem autoral e registros cirúrgicos sob direção artística premium, evidenciando a precisão técnica e a autoridade dos profissionais.
          </p>
        </Reveal>

        <Reveal>
          <div className="gallery-grid">
            {OFFICE_PHOTOS.map((photo, i) => (
              <FadeContent key={i} duration={800} delay={i * 150} blur className={`gallery-item-wrap ${photo.aspect}`}>
                <BorderGlow
                  className="gallery-item"
                  backgroundColor="var(--glow-card-bg, rgba(10, 3, 5, 0.45))"
                  borderRadius={16}
                  glowColor="38 35 65"
                  colors={['#c5b39b', '#a89882', '#dbcebe']}
                  glowIntensity={0.8}
                  glowRadius={32}
                  edgeSensitivity={28}
                  coneSpread={20}
                  fillOpacity={0.15}
                >
                  <div
                    className="photo-cardGroup"
                    onClick={() => setSelectedImage(photo.src)}
                    style={{ borderRadius: 'inherit', overflow: 'hidden', height: '100%', width: '100%' }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="gallery-image"
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <ZoomIn className="zoom-icon" size={24} stroke="#ffffff" />
                      <div className="overlay-text">
                        <h3>{photo.title}</h3>
                        <p>{photo.desc}</p>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </FadeContent>
            ))}
          </div>
        </Reveal>
      </CenterWrapper>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Fechar galeria"
            >
              <X size={22} stroke="var(--goldlt)" strokeWidth={1.5} />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={selectedImage}
              alt="Consultório ampliado"
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 1100px;
            margin: 0 auto;
          }

          @media (min-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 24px;
            }
          }

          .gallery-item-wrap {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .gallery-item {
            position: relative;
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .photo-cardGroup {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .gallery-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .photo-cardGroup:hover .gallery-image {
            transform: scale(1.04);
          }

          .gallery-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(8, 2, 5, 0.9) 0%, rgba(8, 2, 5, 0.3) 60%, transparent 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 24px;
            opacity: 0;
            transition: opacity 0.4s ease;
            z-index: 2;
          }

          .photo-cardGroup:hover .gallery-overlay {
            opacity: 1;
          }

          .zoom-icon {
            color: #ffffff !important;
            stroke: #ffffff !important;
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(8, 2, 5, 0.6);
            padding: 6px;
            border-radius: 50%;
            border: 1px solid rgba(201, 169, 110, 0.2);
            box-sizing: content-box;
            transition: transform 0.4s ease;
          }

          .photo-cardGroup:hover .zoom-icon {
            transform: scale(1.1) rotate(90deg);
          }

          .overlay-text h3 {
            font-family: var(--FD);
            font-size: 20px;
            color: var(--gold);
            margin-bottom: 6px;
            font-weight: 300;
          }

          .overlay-text p {
            font-size: 13px;
            color: rgba(242, 237, 230, 0.8);
            line-height: 1.5;
          }

          body.lightbox-open #nav,
          body.lightbox-open #back-to-top,
          body.lightbox-open #audioBtn {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            transition: opacity 0.35s ease, visibility 0.35s ease, transform 0.35s ease !important;
          }

          body.lightbox-open #nav {
            transform: translateY(-20px) !important;
          }

          body.lightbox-open #back-to-top,
          body.lightbox-open #audioBtn {
            transform: translateY(20px) !important;
          }

          /* Lightbox styling */
          .lightbox-overlay {
            position: fixed;
            inset: 0;
            background: rgba(6, 2, 4, 0.92);
            backdrop-filter: blur(28px);
            -webkit-backdrop-filter: blur(28px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .lightbox-image {
            max-width: 95%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 8px;
            border: 1px solid rgba(201, 169, 110, 0.25);
            box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          }

          .lightbox-close {
            position: fixed;
            top: 24px;
            right: 24px;
            left: auto;
            z-index: 10001;
            background: rgba(10, 3, 5, 0.55);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(201, 169, 110, 0.28);
            color: var(--goldlt);
            cursor: pointer;
            padding: 10px;
            border-radius: 50%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .lightbox-close:hover {
            background: rgba(18, 5, 9, 0.85);
            border-color: var(--goldlt);
            transform: scale(1.08) rotate(90deg);
            box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6), 0 0 12px rgba(201, 169, 110, 0.2);
          }

          @media (max-width: 640px) {
            .gallery-overlay {
              opacity: 0;
              background: transparent;
              padding: 16px;
            }
            .zoom-icon {
              display: none;
            }
            .overlay-text h3 {
              font-size: 16px;
            }
            .overlay-text p {
              font-size: 12px;
            }
            .lightbox-close {
              top: 20px;
              right: 20px;
              left: auto;
              padding: 9px;
            }
          }
        `
      }} />
    </section>
  )
}
