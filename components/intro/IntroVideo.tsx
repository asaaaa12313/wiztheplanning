'use client'

import { useEffect } from 'react'

interface IntroVideoProps {
  onComplete: () => void
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      onClick={onComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#000',
        cursor: 'pointer',
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
