import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'
import FadeContent from './FadeContent'
import BorderGlow from './BorderGlow'

const MINIMALIST_PRINCIPLES = [
  {
    num: '01',
    title: 'Silêncio Estratégico',
    desc: 'Eliminamos a poluição visual dos templates genéricos para destacar a verdadeira excelência e reputação da sua prática.',
  },
  {
    num: '02',
    title: 'Estética Intencional',
    desc: 'Cada enquadramento, tom de luz e escolha tipográfica é desenhado para atrair pacientes que valorizam a alta medicina.',
  },
  {
    num: '03',
    title: 'Narrativa Cinematográfica',
    desc: 'Audiovisual de alto impacto com ritmo elegante, paleta harmoniosa e sensibilidade editorial sem ruídos de produção.',
  },
  {
    num: '04',
    title: 'Posicionamento Perene',
    desc: 'Construção de marca sólida e atemporal que consolida sua autoridade médica e eleva a percepção de valor no mercado.',
  },
]

export default function Minimalism() {
  return (
    <section
      id="minimalismo"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 40 }}>
          <FadeContent duration={800} blur>
            <p className="section-eyebrow">FILOSOFIA BARVÍ</p>
            <h2 className="section-title" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 200 }}>
              Menos ruído,{' '}
              <strong style={{ fontWeight: 600, color: '#a78779' }}>mais autoridade.</strong>
            </h2>
            <div className="section-rule" />
          </FadeContent>
        </Reveal>

        <Reveal style={{ maxWidth: 820, margin: '0 auto 64px', textAlign: 'center' }}>
          <FadeContent duration={800} delay={100} blur>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 200,
                fontSize: 'clamp(20px, 2.8vw, 32px)',
                lineHeight: 1.4,
                color: '#2a221e',
                letterSpacing: '-0.01em',
              }}
            >
              No mercado da saúde de alto padrão, o excesso visual desvaloriza.{' '}
              <strong style={{ fontWeight: 400, color: '#a78779' }}>
                O minimalismo da Barví filtra o supérfluo
              </strong>{' '}
              para que a excelência da sua marca seja percebida com máxima clareza.
            </p>
          </FadeContent>
        </Reveal>

        <div className="minimalism-grid">
          {MINIMALIST_PRINCIPLES.map((p, i) => (
            <Reveal key={p.num} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <FadeContent duration={700} delay={i * 100} blur className="h-full">
                <BorderGlow
                  className="minimalism-card h-full"
                  backgroundColor="rgba(255, 255, 255, 0.65)"
                  borderRadius={18}
                  glowColor="167 135 121"
                  colors={['#a78779', '#7d5d50', '#c9b5ac']}
                  glowIntensity={0.65}
                  glowRadius={28}
                  edgeSensitivity={24}
                  coneSpread={20}
                  fillOpacity={0.2}
                >
                  <div
                    style={{
                      padding: '36px 30px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255, 255, 255, 0.45)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      borderRadius: 18,
                      border: '1px solid rgba(167, 135, 121, 0.18)',
                      boxShadow: '0 8px 32px rgba(125, 93, 80, 0.05)',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 12,
                          letterSpacing: '0.2em',
                          fontWeight: 500,
                          color: '#a78779',
                        }}
                      >
                        {p.num}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        fontSize: 21,
                        color: '#1a1615',
                        marginBottom: 14,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 14,
                        color: '#5c524e',
                        lineHeight: 1.7,
                        fontWeight: 300,
                        marginTop: 'auto',
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </BorderGlow>
              </FadeContent>
            </Reveal>
          ))}
        </div>
      </CenterWrapper>
    </section>
  )
}



