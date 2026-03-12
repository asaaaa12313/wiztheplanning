'use client'

import { useState } from 'react'

export default function ContactSection() {
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
        body: JSON.stringify({ name, phone, store, message, type }),
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

  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p
          style={{
            color: 'rgba(0,0,0,0.5)',
            fontSize: 10,
            letterSpacing: '0.35em',
            fontWeight: 700,
            marginBottom: 20,
            fontFamily: 'var(--font-gothic-a1), sans-serif',
          }}
        >
          CONTACT
        </p>
        <h2
          style={{
            color: '#111',
            fontWeight: 900,
            fontSize: 'clamp(26px,3.5vw,42px)',
            marginBottom: 56,
          }}
        >
          마케팅 고민, 지금 바로 상담하세요
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
          }}
          className="max-md:grid-cols-1 max-md:gap-12"
        >
          {/* 연락처 정보 */}
          <div>
            <div style={{ marginBottom: 40 }}>
              <p
                style={{
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 10,
                  letterSpacing: '0.25em',
                  marginBottom: 8,
                  fontFamily: 'var(--font-gothic-a1), sans-serif',
                }}
              >
                PHONE
              </p>
              <a
                href="tel:16700704"
                style={{
                  color: '#111',
                  fontSize: 28,
                  fontWeight: 900,
                  textDecoration: 'none',
                }}
              >
                1670-0704
              </a>
            </div>
            <div style={{ marginBottom: 40 }}>
              <p
                style={{
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 10,
                  letterSpacing: '0.25em',
                  marginBottom: 8,
                  fontFamily: 'var(--font-gothic-a1), sans-serif',
                }}
              >
                KAKAOTALK
              </p>
              <p style={{ color: '#111', fontSize: 18, fontWeight: 700 }}>
                @위즈더플래닝마케팅
              </p>
            </div>
            <a
              href="http://pf.kakao.com/_QUTxcb/chat"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: '#FACC15',
                color: '#000',
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              카카오톡 상담 바로가기
            </a>
          </div>

          {/* 문의 폼 */}
          {status === 'sent' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 24px',
                border: '1px solid #ddd',
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
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit('상담')
              }}
            >
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
        </div>
      </div>
    </section>
  )
}
