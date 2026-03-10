export default function MobileCTA() {
  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        height: 56,
      }}
    >
      <a
        href="tel:16700704"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        전화 상담
      </a>
      <a
        href="https://pf.kakao.com/_wiztheplanning"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FACC15',
          color: '#000',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        카카오톡 상담
      </a>
    </div>
  )
}
