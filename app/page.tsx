'use client'

import { useState } from 'react'
import IntroVideo from '@/components/intro/IntroVideo'
import IntroSequenceV2 from '@/components/intro/IntroSequenceV2'
import ServiceGrid from '@/components/main/ServiceGrid'

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro && (
        <IntroVideo onComplete={() => setShowIntro(false)} />
      )}
      <IntroSequenceV2 active={!showIntro} />
      <ServiceGrid />
    </>
  )
}
