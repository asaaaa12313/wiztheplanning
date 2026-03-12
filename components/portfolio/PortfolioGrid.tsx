'use client'

import { useState, useMemo } from 'react'
import type { PortfolioCategory, PortfolioItem } from '@/types'
import { portfolioItems, portfolioCategories } from '@/data/portfolio'
import PortfolioCategoryFilter from './PortfolioCategoryFilter'
import PortfolioCard from './PortfolioCard'
import PortfolioLightbox from './PortfolioLightbox'

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | null>(null)
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)

  const filtered = useMemo(() => {
    if (!activeCategory) return portfolioItems
    return portfolioItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const counts = useMemo(() => {
    const c: Record<string, number> = { '전체': portfolioItems.length }
    for (const cat of portfolioCategories) {
      c[cat] = portfolioItems.filter((item) => item.category === cat).length
    }
    return c as Record<PortfolioCategory | '전체', number>
  }, [])

  const handleCardClick = (item: PortfolioItem) => {
    if (item.images.length > 0) {
      setLightboxItem(item)
    } else if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <PortfolioCategoryFilter
        active={activeCategory}
        onSelect={setActiveCategory}
        counts={counts}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '32px 24px 64px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
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
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
            해당 카테고리에 레퍼런스가 없습니다.
          </div>
        )}
      </div>

      {lightboxItem && (
        <PortfolioLightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}
    </>
  )
}
