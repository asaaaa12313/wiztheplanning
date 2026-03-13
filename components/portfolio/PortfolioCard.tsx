'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PortfolioItem } from '@/types'
import { categoryColors } from '@/data/portfolio'

interface Props {
  item: PortfolioItem
  onClick: () => void
}

export default function PortfolioCard({ item, onClick }: Props) {
  const [hovered, setHovered] = useState(false)
  const color = categoryColors[item.category]
  const hasImages = item.images.length > 0
  const hasLink = !!item.link

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid #f0f0f0',
      }}
    >
      {/* 이미지 영역 (세로형 3/4) */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          background: hasImages ? '#eee' : `linear-gradient(135deg, ${color}22, ${color}44)`,
          overflow: 'hidden',
        }}
      >
        {hasImages ? (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
        )}

        {/* 상시 하단 그라데이션 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)',
            transition: 'background 0.4s',
          }}
        />

        {/* 카테고리 뱃지 (좌상단) */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            fontSize: 11,
            fontWeight: 600,
            color: color,
            background: 'rgba(255,255,255,0.9)',
            padding: '2px 8px',
            borderRadius: 0,
          }}
        >
          {item.category}
        </div>

        {/* 이미지 카운트 뱃지 (우상단) */}
        {hasImages && item.images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: 0,
            }}
          >
            +{item.images.length}
          </div>
        )}

        {/* 외부 링크 아이콘 */}
        {hasLink && hasImages && (
          <div
            style={{
              position: 'absolute',
              top: 36,
              left: 10,
              background: 'rgba(0,0,0,0.6)',
              borderRadius: 0,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        )}

        {/* 하단 정보 (이미지 위 오버레이) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: 4,
            }}
          >
            {item.name}
          </p>
          <span
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.7)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            {hasImages && item.images.length > 1
              ? `이미지 ${item.images.length}장 보기`
              : hasLink
                ? '바로가기 →'
                : '상세보기'}
          </span>
        </div>
      </div>
    </div>
  )
}
