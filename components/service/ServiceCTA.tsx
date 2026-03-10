interface ServiceCTAProps {
  heroTitle: string
  accent: string
}

export default function ServiceCTA({ heroTitle, accent }: ServiceCTAProps) {
  return (
    <section
      style={{
        padding: '64px 24px',
        textAlign: 'center',
        background: '#fff',
        borderTop: '1px solid #eee',
      }}
    >
      <h2
        style={{
          color: '#111',
          fontSize: 28,
          fontWeight: 900,
          marginBottom: 32,
        }}
      >
        {heroTitle}
      </h2>
      <a
        href="/contact"
        style={{
          display: 'inline-block',
          padding: '14px 32px',
          background: accent,
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        무료 상담 받기
      </a>
    </section>
  )
}
