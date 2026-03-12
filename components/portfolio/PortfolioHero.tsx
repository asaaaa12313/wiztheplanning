export default function PortfolioHero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '80px 24px 48px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        overflow: 'hidden',
      }}
    >
      {/* 데코 패턴 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 하단 그라데이션 */}
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

      {/* 텍스트 */}
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
            marginBottom: 20,
            fontFamily: 'var(--font-noto-sans-kr), sans-serif',
          }}
        >
          레퍼런스 아카이브
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          위즈더플래닝은 10,000+ 클라이언트의 마케팅을 수행한 종합 마케팅 에이전시입니다.
          <br />
          배달 · 네이버 · SNS · 블로그 · 체험단 · 디자인 · 컨텐츠 등 7개 영역의 성과 레퍼런스를 확인하세요.
        </p>

        {/* 통계 */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            { value: '10,000+', label: '누적 클라이언트' },
            { value: '7개 영역', label: '마케팅 서비스' },
            { value: '10년+', label: '업력' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  color: '#fff',
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
