import type { Service } from '@/types'

interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service: s }: ServiceHeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '80px 24px 48px',
        background: s.heroBg,
        overflow: 'hidden',
      }}
    >
      {/* 배경 비디오 */}
      {s.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={s.video}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
          }}
        />
      )}

      {/* 데코 배경 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: s.heroDeco,
          backgroundSize: 'cover',
          opacity: 0.15,
        }}
      />

      {/* 하단 그라데이션 (텍스트 가독성) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* 텍스트 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 12,
            letterSpacing: '0.25em',
            marginBottom: 16,
            fontFamily: 'var(--font-gothic-a1), sans-serif',
          }}
        >
          {s.label}
        </p>
        <h1
          style={{
            color: '#fff',
            fontSize: 'clamp(36px,7vw,72px)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 16,
            fontFamily: s.font,
          }}
        >
          {s.heroTitle}
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(14px,1.5vw,18px)',
            maxWidth: 500,
            lineHeight: 1.7,
          }}
        >
          {s.description}
        </p>
      </div>
    </section>
  )
}
