import Link from 'next/link'
import ScrollToTop from '@/components/service/ScrollToTop'

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 서비스 상세 전용 상단 네비바 (layout.tsx의 GNB를 덮어씀) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 41,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #eee',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 13,
            color: '#555',
            textDecoration: 'none',
          }}
        >
          ← 메인으로
        </Link>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#888',
          }}
        >
          WIZ THE PLANNING
        </span>
      </div>
      {children}
      <ScrollToTop />
    </>
  )
}
