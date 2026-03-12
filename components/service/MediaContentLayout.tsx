'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 반응형 감지
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // IntersectionObserver로 활성 섹션 추적
  useEffect(() => {
    observerRef.current?.disconnect()

    const visibleSet = new Set<number>()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id // "media-0", "media-1", ...
          const index = parseInt(id.replace('media-', ''), 10)
          if (entry.isIntersecting) {
            visibleSet.add(index)
          } else {
            visibleSet.delete(index)
          }
        })
        if (visibleSet.size > 0) {
          setActiveIndex(Math.min(...visibleSet))
        }
      },
      { threshold: 0.15, rootMargin: '-100px 0px -40% 0px' },
    )

    media.forEach((_, i) => {
      const el = document.getElementById(`media-${i}`)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [media])

  const scrollTo = useCallback((index: number) => {
    document.getElementById(`media-${index}`)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div>
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
              onClick={() => scrollTo(i)}
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
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* 왼쪽 사이드바 (데스크톱만) */}
        {!isMobile && (
          <MediaCategorySidebar
            categories={categories}
            media={media}
            activeIndex={activeIndex}
          />
        )}

        {/* 오른쪽 콘텐츠 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {media.map((partner, i) => (
            <MediaPartnerSection key={i} partner={partner} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
