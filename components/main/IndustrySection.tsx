'use client'

import { useState } from 'react'
import { industries } from '@/data/industries'
import type { Industry } from '@/types'

function IndustryCard({
  industry,
  onClick,
}: {
  industry: Industry
  onClick: (industry: Industry) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(industry)}
      style={{
        padding: '24px 32px',
        background: hovered ? '#000' : '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.15em',
            marginBottom: 12,
            color: hovered ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
            transition: 'color 0.3s',
            fontFamily: 'var(--font-gothic-a1), sans-serif',
          }}
        >
          {industry.services}
        </p>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 800,
            marginBottom: 8,
            color: hovered ? '#fff' : '#111',
            transition: 'color 0.3s',
          }}
        >
          {industry.name}
        </h3>
        <p
          style={{
            fontSize: 12,
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
            color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.55)',
            transition: 'color 0.3s',
          }}
        >
          {industry.copy}
        </p>
      </div>

      {/* 화살표 아이콘 */}
      <div
        style={{
          opacity: hovered ? 0.7 : 0.2,
          transition: 'opacity 0.3s',
          marginLeft: 12,
          flexShrink: 0,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={hovered ? '#fff' : '#000'}
          strokeWidth="1.5"
          style={{ transition: 'stroke 0.3s' }}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

interface IndustrySectionProps {
  onIndustryClick: (industry: Industry) => void
}

export default function IndustrySection({ onIndustryClick }: IndustrySectionProps) {
  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.35em',
            fontWeight: 700,
            color: 'rgba(0,0,0,0.45)',
            marginBottom: 20,
            fontFamily: 'var(--font-gothic-a1), sans-serif',
          }}
        >
          INDUSTRY SOLUTION
        </p>
        <h2
          style={{
            fontWeight: 900,
            fontSize: 'clamp(26px,3.5vw,42px)',
            color: '#111',
            marginBottom: 56,
          }}
        >
          어떤 업종이세요?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 1,
            background: 'rgba(0,0,0,0.08)',
          }}
        >
          {industries.map((industry) => (
            <IndustryCard key={industry.name} industry={industry} onClick={onIndustryClick} />
          ))}
        </div>
      </div>
    </section>
  )
}
