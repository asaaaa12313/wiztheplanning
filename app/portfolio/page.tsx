import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '포트폴리오 | 위즈더플래닝',
}

export default function PortfolioPage() {
  return (
    <div
      style={{
        paddingTop: 56,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        fontFamily: 'var(--font-noto-sans-kr), sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: 'rgba(0,0,0,0.5)',
            fontSize: 10,
            letterSpacing: '0.3em',
            marginBottom: 16,
          }}
        >
          COMING SOON
        </p>
        <h1 style={{ color: '#111', fontSize: 32, fontWeight: 900 }}>포트폴리오</h1>
      </div>
    </div>
  )
}
