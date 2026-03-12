'use client'

import type { MediaPartner } from '@/types'

interface Category {
  id: string
  name: string
  partnerIndices: number[]
}

interface ExternalLink {
  label: string
  href: string
  sublabel?: string
}

interface MediaCategorySidebarProps {
  categories: Category[]
  media: MediaPartner[]
  activeIndex: number
  onSelect: (index: number) => void
  externalLink?: ExternalLink
}

export default function MediaCategorySidebar({ categories, media, activeIndex, onSelect, externalLink }: MediaCategorySidebarProps) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 100,
        width: 280,
        flexShrink: 0,
        alignSelf: 'flex-start',
        padding: '24px 0',
      }}
    >
      {/* 외부 링크 (선택) */}
      {externalLink && (
        <a
          href={externalLink.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            padding: '18px 24px',
            fontSize: 22,
            fontWeight: 800,
            color: '#111',
            textDecoration: 'none',
            borderBottom: '2px solid #222',
            marginBottom: 8,
          }}
        >
          {externalLink.label}
          {externalLink.sublabel && (
            <span style={{ fontSize: 12, fontWeight: 400, color: '#888' }}>{externalLink.sublabel}</span>
          )}
        </a>
      )}

      {/* 카테고리 그룹 */}
      {categories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: 4 }}>
          {/* 카테고리 헤더 */}
          <div
            style={{
              padding: '18px 24px 8px',
              fontSize: 16,
              fontWeight: 700,
              color: '#999',
              letterSpacing: '0.08em',
            }}
          >
            {cat.name}
          </div>

          {/* 매체 항목 */}
          {cat.partnerIndices.map((pi) => {
            const partner = media[pi]
            const isActive = activeIndex === pi
            return (
              <button
                key={pi}
                onClick={() => onSelect(pi)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 24px',
                  fontSize: 18,
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? partner.color : '#333',
                  background: isActive ? (partner.colorLight || '#f8f8f8') : 'transparent',
                  cursor: 'pointer',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: '1px solid #f0f0f0',
                  borderLeft: `3px solid ${isActive ? partner.color : 'transparent'}`,
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                {partner.name}
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
