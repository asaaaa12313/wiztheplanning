export default function Footer() {
  return (
    <footer
      style={{
        padding: '40px 24px',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p
          style={{
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            marginBottom: 12,
          }}
        >
          WIZ THE PLANNING
        </p>
        <div
          style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8,
          }}
        >
          <p>대표: 정현우 | 사업자등록번호: 668-81-00391</p>
          <p>서울시 금천구 가산디지털로 178 2518, 2519호</p>
          <p>1670-0704 | wiz@wiztheplanning.com</p>
        </div>
      </div>
    </footer>
  )
}
