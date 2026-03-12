'use client'

import { useEffect, useState } from 'react'
import type { Industry } from '@/types'

interface ContactSlidePanelProps {
  open: boolean
  industry: Industry | null
  onClose: () => void
}

export default function ContactSlidePanel({ open, industry, onClose }: ContactSlidePanelProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [store, setStore] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (type: '상담' | '견적서') => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, store, message, type,
          industry: industry?.name,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setName(''); setPhone(''); setStore(''); setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // body 스크롤 잠금
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <>
      {/* 딤 오버레이 */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 100,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s',
        }}
      />

      {/* 패널 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 420,
          height: '100vh',
          background: '#fff',
          zIndex: 101,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s ease',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        }}
        className="max-md:!w-full max-md:!top-auto max-md:!bottom-0 max-md:!h-[85vh] max-md:!rounded-t-2xl"
      >
        {/* 닫기 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 24px 0' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(0,0,0,0.4)',
              fontSize: 24,
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        {/* 업종 정보 헤더 */}
        {industry && (
          <div style={{ padding: '16px 32px 24px', borderBottom: '1px solid #eee' }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                color: 'rgba(0,0,0,0.5)',
                marginBottom: 12,
                fontFamily: 'var(--font-gothic-a1), sans-serif',
              }}
            >
              SELECTED INDUSTRY
            </p>
            <h3
              style={{
                color: '#111',
                fontSize: 22,
                fontWeight: 900,
                marginBottom: 8,
              }}
            >
              {industry.name}
            </h3>
            <p
              style={{
                color: 'rgba(0,0,0,0.5)',
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
                marginBottom: 12,
              }}
            >
              {industry.copy}
            </p>
            <p
              style={{
                fontSize: 11,
                letterSpacing: '0.1em',
                color: 'rgba(0,0,0,0.55)',
                fontFamily: 'var(--font-gothic-a1), sans-serif',
              }}
            >
              {industry.services}
            </p>
          </div>
        )}

        {/* 문의 폼 */}
        {status === 'sent' ? (
          <div
            style={{
              padding: '48px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 12 }}>
              신청이 완료되었습니다
            </p>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 24 }}>
              빠른 시일 내 연락드리겠습니다.
            </p>
            <button
              onClick={() => setStatus('idle')}
              style={{
                padding: '10px 24px',
                background: '#111',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                borderRadius: 0,
              }}
            >
              추가 문의하기
            </button>
          </div>
        ) : (
          <form
            style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit('상담')
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                color: 'rgba(0,0,0,0.5)',
                marginBottom: 8,
                fontFamily: 'var(--font-gothic-a1), sans-serif',
              }}
            >
              CONTACT
            </p>

            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid #ddd',
                padding: '14px 16px',
                color: '#111',
                fontSize: 14,
                outline: 'none',
                borderRadius: 0,
              }}
            />
            <input
              type="text"
              placeholder="연락처"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid #ddd',
                padding: '14px 16px',
                color: '#111',
                fontSize: 14,
                outline: 'none',
                borderRadius: 0,
              }}
            />
            <input
              type="text"
              placeholder="가게명"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid #ddd',
                padding: '14px 16px',
                color: '#111',
                fontSize: 14,
                outline: 'none',
                borderRadius: 0,
              }}
            />
            <textarea
              placeholder="문의사항"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid #ddd',
                padding: '14px 16px',
                color: '#111',
                fontSize: 14,
                outline: 'none',
                height: 112,
                resize: 'none',
                borderRadius: 0,
              }}
            />

            {status === 'error' && (
              <p style={{ fontSize: 13, color: '#DC2626' }}>
                전송에 실패했습니다. 전화(1670-0704)로 문의해주세요.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                padding: 14,
                background: status === 'sending' ? '#666' : '#111',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                border: 'none',
                cursor: status === 'sending' ? 'default' : 'pointer',
                borderRadius: 0,
                marginTop: 4,
              }}
            >
              {status === 'sending' ? '전송 중...' : '무료 상담 신청'}
            </button>
            <button
              type="button"
              disabled={status === 'sending'}
              onClick={() => handleSubmit('견적서')}
              style={{
                width: '100%',
                padding: 14,
                background: '#fff',
                color: status === 'sending' ? '#999' : '#111',
                fontSize: 12,
                fontWeight: 700,
                border: `1px solid ${status === 'sending' ? '#ccc' : '#111'}`,
                cursor: status === 'sending' ? 'default' : 'pointer',
                borderRadius: 0,
              }}
            >
              견적서 / 제안서 요청하기
            </button>
          </form>
        )}

        {/* 하단 연락처 정보 */}
        <div style={{ padding: '20px 32px 32px', borderTop: '1px solid #eee' }}>
          <div style={{ marginBottom: 16 }}>
            <p
              style={{
                color: 'rgba(0,0,0,0.5)',
                fontSize: 10,
                letterSpacing: '0.25em',
                marginBottom: 4,
                fontFamily: 'var(--font-gothic-a1), sans-serif',
              }}
            >
              PHONE
            </p>
            <a href="tel:16700704" style={{ color: '#111', fontSize: 18, fontWeight: 900, textDecoration: 'none' }}>
              1670-0704
            </a>
          </div>
          <a
            href="http://pf.kakao.com/_QUTxcb/chat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#FACC15',
              color: '#000',
              fontSize: 11,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            카카오톡 상담 바로가기
          </a>
        </div>
      </div>
    </>
  )
}
