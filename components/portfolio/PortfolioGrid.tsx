'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import type { PortfolioCategory, PortfolioItem } from '@/types'
import { portfolioItems, portfolioCategories, categoryColors, categoryEnglish } from '@/data/portfolio'
import PortfolioCard from './PortfolioCard'
import PortfolioLightbox from './PortfolioLightbox'

const categoryLabels = portfolioCategories.map((cat, i) => ({
  key: cat,
  number: String(i + 1).padStart(2, '0'),
  name: cat,
  english: categoryEnglish[cat],
  color: categoryColors[cat],
}))

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | null>(null)
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const filtered = useMemo(() => {
    if (!activeCategory) return portfolioItems
    return portfolioItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const handleSelect = (cat: PortfolioCategory | null) => {
    setActiveCategory(cat)
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCardClick = (item: PortfolioItem) => {
    if (item.images.length > 0) {
      setLightboxItem(item)
    } else if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div ref={contentRef}>
      {/* 모바일: 수평 스크롤 카테고리 탭 */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 0,
            background: '#fff',
            borderBottom: '1px solid #eee',
            position: 'sticky',
            top: 56,
            zIndex: 10,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <button
            onClick={() => handleSelect(null)}
            style={{
              flexShrink: 0,
              padding: '14px 18px',
              fontSize: 14,
              fontWeight: activeCategory === null ? 700 : 500,
              color: activeCategory === null ? '#111' : '#999',
              background: 'transparent',
              border: 'none',
              borderBottom: activeCategory === null ? '2px solid #111' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'inherit',
            }}
          >
            전체
          </button>
          {categoryLabels.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleSelect(cat.key)}
              style={{
                flexShrink: 0,
                padding: '14px 18px',
                fontSize: 14,
                fontWeight: activeCategory === cat.key ? 700 : 500,
                color: activeCategory === cat.key ? cat.color : '#999',
                background: 'transparent',
                border: 'none',
                borderBottom: activeCategory === cat.key ? `2px solid ${cat.color}` : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* 데스크톱: 사이드바 + 콘텐츠 */}
      <div style={{ display: 'flex' }}>
        {/* 왼쪽 사이드바 (데스크톱만) */}
        {!isMobile && (
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
            {/* 전체 */}
            <button
              onClick={() => handleSelect(null)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '14px 24px',
                fontSize: 16,
                fontWeight: activeCategory === null ? 700 : 400,
                color: activeCategory === null ? '#111' : '#333',
                background: activeCategory === null ? '#f8f8f8' : 'transparent',
                cursor: 'pointer',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: '1px solid #f0f0f0',
                borderLeft: `3px solid ${activeCategory === null ? '#111' : 'transparent'}`,
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              전체
              <span style={{ marginLeft: 8, fontSize: 13, color: '#999' }}>
                {portfolioItems.length}
              </span>
            </button>

            {/* 카테고리 목록 */}
            {categoryLabels.map((cat) => {
              const isActive = activeCategory === cat.key
              const count = portfolioItems.filter((item) => item.category === cat.key).length
              return (
                <button
                  key={cat.key}
                  onClick={() => handleSelect(cat.key)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 24px',
                    fontSize: 16,
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? cat.color : '#333',
                    background: isActive ? `${cat.color}08` : 'transparent',
                    cursor: 'pointer',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: '1px solid #f0f0f0',
                    borderLeft: `3px solid ${isActive ? cat.color : 'transparent'}`,
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 11, color: '#999', marginRight: 8 }}>{cat.number}</span>
                  {cat.name}
                  <span style={{ marginLeft: 8, fontSize: 13, color: '#999' }}>{count}</span>
                  <br />
                  <span style={{ fontSize: 11, color: '#bbb', letterSpacing: '0.05em' }}>
                    {cat.english}
                  </span>
                </button>
              )
            })}
          </nav>
        )}

        {/* 우측 콘텐츠: 카드 그리드 */}
        <div style={{ flex: 1, minWidth: 0, padding: '32px 24px 64px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(2, 1fr)'
                : 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {filtered.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#999', fontSize: 15 }}>
              해당 카테고리에 레퍼런스가 없습니다.
            </div>
          )}
        </div>
      </div>

      {lightboxItem && (
        <PortfolioLightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </div>
  )
}
