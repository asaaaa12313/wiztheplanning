'use client'

interface ServiceTag {
  name: string
  color: string
}

export interface IndustryMotionData {
  number: string
  name: string
  copy: string[]
  services: ServiceTag[]
  bgColor: string
  accentColor: string
  glowGradient: string
}

interface IndustrySceneProps {
  data: IndustryMotionData
  isActive: boolean
  rapid: boolean
}

export default function IndustryScene({ data, isActive, rapid }: IndustrySceneProps) {
  const d = rapid ? 0 : 1 // 딜레이 배수 (래피드 시 0)

  return (
    <>
      {/* 배경 글로우 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: data.glowGradient,
          animation: isActive ? 'blurIn 0.8s ease-out both' : 'none',
        }}
      />

      {/* 워터마크 넘버 */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(24px, 6vw, 80px)',
          bottom: 'clamp(60px, 10vh, 120px)',
          fontSize: 'clamp(80px, 18vw, 200px)',
          fontWeight: 900,
          color: 'transparent',
          pointerEvents: 'none',
          animation: isActive ? `numberFadeIn 0.8s ease-out ${0.1 * d}s both` : 'none',
          // numberFadeIn이 opacity를 0.06으로 설정하므로 color는 white로
          WebkitTextStroke: 'none',
        }}
      >
        <span style={{ color: data.accentColor, opacity: 'inherit' }}>{data.number}</span>
      </div>

      {/* 콘텐츠 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 clamp(32px, 8vw, 120px)',
        }}
      >
        {/* 업종명 (상단 크게) */}
        <p
          style={{
            color: data.accentColor,
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            marginBottom: 8,
            animation: isActive ? `crashIn 0.5s cubic-bezier(.16,1,.3,1) ${0.1 * d}s both` : 'none',
          }}
        >
          {data.name}
        </p>
        {/* 넘버 라벨 */}
        <p
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: 13,
            letterSpacing: '0.25em',
            fontWeight: 700,
            marginBottom: 24,
            animation: isActive ? `fadeUp 0.3s ease-out ${0.2 * d}s both` : 'none',
          }}
        >
          {data.number} / 06
        </p>

        {/* 카피 텍스트 */}
        {data.copy.map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <p
              style={{
                color: '#fff',
                fontSize: 'clamp(42px, 9vw, 105px)',
                fontWeight: 900,
                lineHeight: 1.15,
                animation: isActive
                  ? rapid
                    ? `rapidReveal 0.4s ease-out ${i * 0.1}s both`
                    : i === 0
                      ? 'crashIn 0.5s cubic-bezier(.16,1,.3,1) 0.3s both'
                      : 'slideUpB 0.6s cubic-bezier(.16,1,.3,1) 0.5s both'
                  : 'none',
              }}
            >
              {line}
            </p>
          </div>
        ))}

        {/* 서비스 태그 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 32,
            flexWrap: 'wrap',
          }}
        >
          {data.services.map((svc, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {i > 0 && (
                <span
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: 'clamp(14px, 2vw, 20px)',
                    animation: isActive ? `fadeUp 0.3s ease-out ${(rapid ? 0.2 : 1.0) + i * 0.1}s both` : 'none',
                  }}
                >
                  +
                </span>
              )}
              <span
                style={{
                  color: svc.color,
                  fontSize: 'clamp(18px, 3vw, 30px)',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  animation: isActive
                    ? `tagSlideIn 0.4s cubic-bezier(.34,1.56,.64,1) ${(rapid ? 0.15 : 1.0) + i * 0.12}s both`
                    : 'none',
                }}
              >
                {svc.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
