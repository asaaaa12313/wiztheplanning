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
        background: '#f5f5f5',
        transition: 'transform 0.25s, box-shadow 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* 이미지 또는 플레이스홀더 */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          background: hasImages ? '#eee' : `linear-gradient(135deg, ${color}22, ${color}44)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
              transition: 'transform 0.3s',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: 20 }}>
            {/* 링크 아이콘 */}
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

        {/* 호버 오버레이 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${color}cc, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 16,
          }}
        >
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
            {hasImages && item.images.length > 1
              ? `이미지 ${item.images.length}장 보기`
              : hasLink
                ? '바로가기 →'
                : '상세보기'}
          </span>
        </div>

        {/* 이미지 카운트 뱃지 */}
        {hasImages && item.images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
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
              top: 8,
              left: 8,
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
      </div>

      {/* 하단 정보 */}
      <div style={{ padding: '12px 14px' }}>
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#111',
            marginBottom: 6,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </p>
        <span
          style={{
            display: 'inline-block',
            fontSize: 13,
            fontWeight: 600,
            color: color,
            background: `${color}15`,
            padding: '2px 8px',
            borderRadius: 0,
          }}
        >
          {item.category}
        </span>
      </div>
    </div>
  )
}
