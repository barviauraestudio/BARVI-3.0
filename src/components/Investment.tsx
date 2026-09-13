import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'
import FadeContent from './FadeContent'
import BorderGlow from './BorderGlow'

const INVESTMENT_PRINCIPLES = [
  {
    num: '01',
    title: 'Estratégia Customizada',
    desc: 'Não trabalhamos com tabelas engessadas ou pacotes genéricos. Analisamos a maturidade da sua marca e suas metas reais para formatar um plano sob medida.',
  },
  {
    num: '02',
    title: 'Volume & Frequência Dinâmicos',
    desc: 'O número total de produções e publicações mensais varia conforme a necessidade estratégica da ocasião e o momento de expansão da sua clínica.',
  },
  {
    num: '03',
    title: 'Alinhamento Transparente',
    desc: 'Definimos o investimento ideal através de uma conversa diagnóstica franca. Avaliamos a ocasião e construímos uma proposta justa e proporcional.',
  },
]

export default function Investment() {
  return (
    <section
      id="investimento"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 40 }}>
          <FadeContent duration={800} blur>
            <p className="section-eyebrow">INVESTIMENTO ESTRATÉGICO</p>
            <h2 className="section-title" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 200 }}>
              Valor sob medida,{' '}
              <strong style={{ fontWeight: 600, color: '#a78779' }}>construção de longo prazo.</strong>
            </h2>
            <div className="section-rule" />
          </FadeContent>
        </Reveal>

        <Reveal style={{ maxWidth: 840, margin: '0 auto 60px', textAlign: 'center' }}>
          <FadeContent duration={800} delay={100} blur>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 200,
                fontSize: 'clamp(20px, 2.6vw, 30px)',
                lineHeight: 1.45,
                color: '#2a221e',
                letterSpacing: '-0.01em',
              }}
            >
              Autoridade médica e odontológica de alto padrão não se conquista com atalhos efêmeros.{' '}
              <strong style={{ fontWeight: 600, color: '#a78779' }}>
                Nossa filosofia é criar algo sólido e perpétuo
              </strong>
              , consolidando um patrimônio de reputação que se valoriza com o tempo.
            </p>
          </FadeContent>
        </Reveal>

        {/* 3 Principles Grid with Sibling Blur */}
        <div
          className="investment-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            maxWidth: 1140,
            margin: '0 auto 60px',
          }}
        >
          {INVESTMENT_PRINCIPLES.map((p, i) => (
            <Reveal key={p.num} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <FadeContent duration={700} delay={i * 120} blur className="h-full">
                <BorderGlow
                  className="investment-card h-full"
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
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 12,
                        letterSpacing: '0.2em',
                        fontWeight: 500,
                        color: '#a78779',
                        marginBottom: 20,
                        display: 'block',
                      }}
                    >
                      {p.num}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
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

        {/* Highlight Banner / Conversation CTA */}
        <Reveal style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeContent duration={800} delay={200} blur>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(167, 135, 121, 0.08) 0%, rgba(125, 93, 80, 0.12) 100%)',
                border: '1px solid rgba(167, 135, 121, 0.25)',
                borderRadius: 20,
                padding: '40px 36px',
                textAlign: 'center',
                boxShadow: '0 12px 40px rgba(125, 93, 80, 0.06)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#a78779',
                  fontWeight: 600,
                  marginBottom: 12,
                }}
              >
                DIAGNÓSTICO INICIAL
              </p>
              <h3
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(20px, 2.2vw, 26px)',
                  color: '#1a1615',
                  marginBottom: 16,
                  lineHeight: 1.35,
                }}
              >
                Vamos conversar para entender o valor ideal para o seu momento?
              </h3>
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 14,
                  color: '#665a54',
                  maxWidth: 620,
                  margin: '0 auto 28px',
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}
              >
                Agende uma reunião direta com a nossa equipe para analisarmos a estratégia de comunicação da sua clínica e apresentarmos a proposta personalizada.
              </p>

              <a
                href="https://wa.me/554884416292?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20conversa%20de%20diagn%C3%B3stico%20para%20entender%20o%20investimento%20ideal."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '16px 32px',
                  borderRadius: 50,
                  background: '#a78779',
                  color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(167, 135, 121, 0.35)',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#7d5d50'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(125, 93, 80, 0.45)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#a78779'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(167, 135, 121, 0.35)'
                }}
              >
                <span>Agendar Conversa de Diagnóstico</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </FadeContent>
        </Reveal>
      </CenterWrapper>
    </section>
  )
}
