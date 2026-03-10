import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '회사 소개 | 위즈더플래닝',
}

export default function AboutPage() {
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
        <h1 style={{ color: '#111', fontSize: 32, fontWeight: 900 }}>회사 소개</h1>
      </div>
    </div>
  )
}
