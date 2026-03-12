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
  color?: string
}

interface MediaCategorySidebarProps {
  categories: Category[]
  media: MediaPartner[]
  activeIndex: number
  onSelect: (index: number) => void
  externalLink?: ExternalLink
  externalLinks?: ExternalLink[]
}

export default function MediaCategorySidebar({ categories, media, activeIndex, onSelect, externalLink, externalLinks }: MediaCategorySidebarProps) {
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
      {/* 외부 링크 (단일) */}
      {externalLink && !externalLinks && (
        <a
          href={externalLink.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            margin: '0 12px 12px',
            fontSize: 18,
            fontWeight: 800,
            color: '#fff',
            textDecoration: 'none',
            background: externalLink.color || '#DC2626',
            borderRadius: 10,
          }}
        >
          {externalLink.label}
          <span style={{ fontSize: 13, fontWeight: 600 }}>바로가기</span>
        </a>
      )}

      {/* 외부 링크 (복수) */}
      {externalLinks && externalLinks.length > 0 && (
        <div style={{ padding: '0 12px', marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {externalLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                fontSize: 18,
                fontWeight: 800,
                color: '#fff',
                textDecoration: 'none',
                background: link.color || '#F59E0B',
                borderRadius: 10,
              }}
            >
              {link.label}
              <span style={{ fontSize: 13, fontWeight: 600 }}>바로가기</span>
            </a>
          ))}
        </div>
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
