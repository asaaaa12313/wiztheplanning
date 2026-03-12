export default function PortfolioHero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '35vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '80px 24px 48px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
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
            color: '#fff',
            fontSize: 'clamp(36px, 7vw, 72px)',
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
