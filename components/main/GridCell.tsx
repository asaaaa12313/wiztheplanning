'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Service } from '@/types'

interface GridCellProps {
  service: Service
  style?: React.CSSProperties
}

export default function GridCell({ service: s, style: wrapperStyle }: GridCellProps) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play()
  }, [])

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/${s.id}`)}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', height: '100%', ...wrapperStyle }}
    >
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: s.bgGradient,
          transition: 'transform 0.7s',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      />

      {/* 비디오 배경 */}
      {s.video && (
        <video
          ref={videoRef}
          src={s.video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: hovered ? 0.5 : 0.3,
            transition: 'opacity 0.7s',
          }}
        />
      )}

      {/* 데코 radial gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: s.decoGradient,
          opacity: 0.25,
        }}
      />

      {/* 호버 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)',
          transition: 'background 0.5s',
        }}
      />

      {/* 워터마크 텍스트 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontFamily: s.font,
            fontSize: 'clamp(50px,10vw,130px)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
            color: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)',
            transition: 'color 0.7s',
          }}
        >
          {s.bigText}
        </p>
      </div>

      {/* 콘텐츠 */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(16px,2vw,24px)',
        }}
      >
        {/* 라벨 (좌상단) */}
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 9,
            letterSpacing: '0.2em',
            fontFamily: 'var(--font-gothic-a1), sans-serif',
          }}
        >
          {s.label}
        </p>

        {/* 서비스명 + 서브타이틀 + 화살표 (좌하단) */}
        <div>
          <h2
            style={{
              color: '#fff',
              fontFamily: s.font,
              fontWeight: 900,
              fontSize: 'clamp(22px,3vw,40px)',
              lineHeight: 1.2,
              whiteSpace: 'pre-line',
              marginBottom: 4,
            }}
          >
            {s.name}
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 11,
              maxWidth: 250,
              fontFamily: 'var(--font-noto-sans-kr), sans-serif',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(4px)',
              transition: 'all 0.4s',
            }}
          >
            {s.subtitle}
          </p>
          <div
            style={{
              marginTop: 12,
              opacity: hovered ? 1 : 0.4,
              transition: 'opacity 0.3s',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
