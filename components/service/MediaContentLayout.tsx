'use client'

import { useState, useEffect, useRef } from 'react'
import type { MediaPartner } from '@/types'
import MediaCategorySidebar from './MediaCategorySidebar'
import MediaPartnerSection from './MediaPartnerSection'

interface Category {
  id: string
  name: string
  partnerIndices: number[]
}

interface MediaContentLayoutProps {
  media: MediaPartner[]
  categories: Category[]
}

export default function MediaContentLayout({ media, categories }: MediaContentLayoutProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const contentRef = useRef<HTMLDivElement>(null)

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={contentRef}>
      {/* 모바일: 수평 스크롤 매체 선택 바 */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 8,
            padding: '12px 16px',
            background: '#fff',
            borderBottom: '1px solid #eee',
            position: 'sticky',
            top: 84,
            zIndex: 10,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {media.map((partner, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: activeIndex === i ? 700 : 500,
                color: activeIndex === i ? '#fff' : partner.color,
                background: activeIndex === i ? partner.color : 'transparent',
                border: `1px solid ${partner.color}`,
                borderRadius: 20,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {partner.name}
            </button>
          ))}
        </div>
      )}

      {/* 데스크톱: 사이드바 + 콘텐츠 2컬럼 */}
      <div
        style={{
          display: 'flex',
        }}
      >
        {/* 왼쪽 사이드바 (데스크톱만) */}
        {!isMobile && (
          <MediaCategorySidebar
            categories={categories}
            media={media}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        )}

        {/* 오른쪽 콘텐츠: 선택된 매체만 표시 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <MediaPartnerSection partner={media[activeIndex]} index={activeIndex} />
        </div>
      </div>
    </div>
  )
}
