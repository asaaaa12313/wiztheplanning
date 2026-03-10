'use client'

import type { Feature, MediaPartner } from '@/types'
import MediaPartnerSection from './MediaPartnerSection'

interface ServiceFeaturesProps {
  features: Feature[]
  media?: MediaPartner[]
  accent: string
  mediaTitle?: string
}

export default function ServiceFeatures({ features, media, accent, mediaTitle }: ServiceFeaturesProps) {
  if (media) {
    return (
      <div>
        <div
          style={{
            textAlign: 'center',
            padding: 'clamp(32px, 5vw, 56px) 24px clamp(24px, 3vw, 40px)',
            background: '#fff',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 900,
              color: '#111',
              letterSpacing: '0.05em',
            }}
          >
            {mediaTitle || '전체 공식대행사'}
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0',
              marginTop: '20px',
            }}
          >
            {media.map((partner, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <a
                  href={`#media-${i}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(`media-${i}`)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    padding: '8px 20px',
                    border: `1px solid ${partner.color}`,
                    color: partner.color,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {partner.name}
                </a>
                {/* 화살표 (마지막 항목 뒤에도 표시 → 순환) */}
                {mediaTitle && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ margin: '0 4px', flexShrink: 0 }}
                  >
                    <path d="M9 6l6 6-6 6" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
        {media.map((partner, i) => (
          <MediaPartnerSection key={i} partner={partner} index={i} />
        ))}
      </div>
    )
  }

  return (
    <section style={{ padding: '64px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#222',
            marginBottom: 40,
          }}
        >
          서비스 상세
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                padding: 24,
                background: '#fff',
                border: '1px solid #eee',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  background: accent + '15',
                }}
              >
                <span style={{ color: accent, fontSize: 12, fontWeight: 900 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#222',
                  marginBottom: 8,
                }}
              >
                {feature.title}
              </h3>
              <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
