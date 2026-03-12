'use client'

import type { MediaPartner } from '@/types'

interface Category {
  id: string
  name: string
  partnerIndices: number[]
}

interface MediaCategorySidebarProps {
  categories: Category[]
  media: MediaPartner[]
  activeIndex: number
}

export default function MediaCategorySidebar({ categories, media, activeIndex }: MediaCategorySidebarProps) {
  const scrollTo = (index: number) => {
    document.getElementById(`media-${index}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 100,
        width: 240,
        flexShrink: 0,
        alignSelf: 'flex-start',
        padding: '24px 0',
      }}
    >
      {/* 미디어 지도 리스트 링크 */}
      <a
        href="https://focusmedia.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          padding: '16px 20px',
          fontSize: 15,
          fontWeight: 800,
          color: '#111',
          textDecoration: 'none',
          borderBottom: '2px solid #222',
          marginBottom: 8,
        }}
      >
        📍 미디어 지도 리스트
      </a>

      {/* 카테고리 그룹 */}
      {categories.map((cat) => (
        <div key={cat.id} style={{ marginBottom: 4 }}>
          {/* 카테고리 헤더 */}
          <div
            style={{
              padding: '14px 20px 6px',
              fontSize: 11,
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
                onClick={() => scrollTo(pi)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '11px 20px',
                  fontSize: 14,
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
