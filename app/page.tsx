'use client'

import { useState, useEffect } from 'react'
import IntroVideo from '@/components/intro/IntroVideo'
import IntroSequenceV2 from '@/components/intro/IntroSequenceV2'
import ServiceGrid from '@/components/main/ServiceGrid'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('introSeen')) {
      setShowIntro(false)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', '1')
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && (
        <IntroVideo onComplete={handleIntroComplete} />
      )}
      <IntroSequenceV2 active={!showIntro} />
      <ServiceGrid />
    </>
  )
}
