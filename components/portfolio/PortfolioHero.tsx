export default function PortfolioHero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '20vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '80px 24px 48px',
        background: '#FAFAF8',
        overflow: 'hidden',
        borderBottom: '1px solid #e8e8e8',
      }}
    >
      {/* 대형 영문 워터마크 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(60px, 12vw, 140px)',
            fontWeight: 900,
            color: '#eee',
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-gothic-a1), sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          PORTFOLIO
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
        <p
          style={{
            color: '#999',
            fontSize: 12,
            letterSpacing: '0.3em',
            marginBottom: 16,
            fontFamily: 'var(--font-gothic-a1), sans-serif',
          }}
        >
          PORTFOLIO
        </p>
        <h1
          style={{
            color: '#111',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 900,
            lineHeight: 1.1,
            fontFamily: 'var(--font-noto-sans-kr), sans-serif',
          }}
        >
          포트폴리오
        </h1>
      </div>
    </section>
  )
}
