'use client'

import type { PortfolioCategory } from '@/types'
import { portfolioCategories, categoryColors } from '@/data/portfolio'

interface Props {
  active: PortfolioCategory | null
  onSelect: (cat: PortfolioCategory | null) => void
  counts: Record<PortfolioCategory | '전체', number>
}

export default function PortfolioCategoryFilter({ active, onSelect, counts }: Props) {
  const all: (PortfolioCategory | null)[] = [null, ...portfolioCategories]

  return (
    <div
      style={{
        position: 'sticky',
        top: 56,
        zIndex: 20,
        background: '#fff',
        borderBottom: '1px solid #eee',
        padding: '12px 24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {all.map((cat) => {
          const isActive = active === cat
          const color = cat ? categoryColors[cat] : '#111'
          const label = cat ?? '전체'
          const count = cat ? counts[cat] : counts['전체']

          return (
            <button
              key={label}
              onClick={() => onSelect(cat)}
              style={{
                flexShrink: 0,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#fff' : color,
                background: isActive ? color : 'transparent',
                border: `1.5px solid ${isActive ? color : '#ddd'}`,
                borderRadius: 24,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {label}
              <span
                style={{
                  marginLeft: 6,
                  fontSize: 11,
                  opacity: 0.7,
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
