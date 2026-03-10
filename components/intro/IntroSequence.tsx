'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import WLogo from '@/components/shared/WLogo'

function YearCounter({ on }: { on: boolean }) {
  const [year, setYear] = useState(2016)
  useEffect(() => {
    if (!on) return
    let v = 2016
    const t = setInterval(() => {
      v++
      setYear(v)
      if (v >= 2026) clearInterval(t)
    }, 300)
    return () => clearInterval(t)
  }, [on])
  return <>{String(year)}</>
}

function NumCounter({ on }: { on: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return
    const start = Date.now()
    const t = setInterval(() => {
      const p = Math.min((Date.now() - start) / 3500, 1)
      setN(Math.floor(p * p * p * 10000))
      if (p >= 1) { setN(10000); clearInterval(t) }
    }, 30)
    return () => clearInterval(t)
  }, [on])
  return <>{n.toLocaleString()}</>
}

function PercentCounter({ on }: { on: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return
    const start = Date.now()
    const DURATION = 2400
    const t = setInterval(() => {
      const p = Math.min((Date.now() - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(eased * 340))
      if (p >= 1) { setN(340); clearInterval(t) }
    }, 16)
    return () => clearInterval(t)
  }, [on])
  return <>{n}</>
}

const SERVICE_WORDS = [
  { t: '네이버 플레이스', x: '12%', y: '18%', sz: 22, dl: 0, c: '#2563EB' },
  { t: '포커스미디어', x: '62%', y: '12%', sz: 26, dl: 0.1, c: '#DC2626' },
  { t: '배달플랫폼', x: '22%', y: '72%', sz: 24, dl: 0.2, c: '#EA580C' },
  { t: '블로그 SEO', x: '72%', y: '68%', sz: 20, dl: 0.15, c: '#2563EB' },
  { t: '체험단', x: '8%', y: '42%', sz: 30, dl: 0.25, c: '#8B5CF6' },
  { t: '검색광고', x: '78%', y: '38%', sz: 22, dl: 0.3, c: '#2563EB' },
  { t: '영상 제작', x: '38%', y: '82%', sz: 18, dl: 0.35, c: '#059669' },
  { t: '인쇄물', x: '52%', y: '22%', sz: 16, dl: 0.4, c: '#059669' },
  { t: 'SNS', x: '82%', y: '52%', sz: 28, dl: 0.2, c: '#8B5CF6' },
  { t: '리뷰 관리', x: '18%', y: '58%', sz: 18, dl: 0.45, c: '#EA580C' },
  { t: '파워링크', x: '48%', y: '8%', sz: 20, dl: 0.3, c: '#2563EB' },
  { t: '타겟핏', x: '32%', y: '52%', sz: 24, dl: 0.15, c: '#DB2777' },
]

const MARQUEE_KEYWORDS = [
  '네이버 플레이스', '배달플랫폼', '포커스미디어', '블로그 SEO', '체험단',
  '영상 제작', '검색광고', '파워링크', '인쇄물', 'SNS 마케팅', '리뷰 관리', '브랜드블로그', '타겟핏', '쿠팡이츠', '옥외 광고',
]

const SVCS = ['PERFORMANCE', 'DELIVERY', 'MEDIA', 'CONTENTS', 'TARGETFIT', 'PRODUCTION']
const SVC_COLORS = ['#2563EB', '#EA580C', '#DC2626', '#8B5CF6', '#DB2777', '#059669']

interface IntroSequenceProps {
  onComplete: () => void
}

// 씬 번호 → 진입 시 전환 타입
const SCENE_TRANS: Record<number, string> = {
  1:  'fade',
  2:  'zoom-in',
  3:  'slide-left',
  4:  'slide-up',
  5:  'roll-y',
  6:  'slide-left',
  7:  'zoom-out',
  8:  'roll-x',
  9:  'slide-up',
  10: 'zoom-in',
  11: 'fade',
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [sc, setSc] = useState(0)
  const [prevSc, setPrevSc] = useState(-1)
  const [transitioning, setTransitioning] = useState(false)
  const [lightBleed, setLightBleed] = useState(true)
  const [colorRevealIdx, setColorRevealIdx] = useState(-1)

  const scRef = useRef(0)
  scRef.current = sc

  const changeSc = useCallback((next: number) => {
    setPrevSc(scRef.current)
    setTransitioning(true)
    setSc(next)
    setTimeout(() => {
      setPrevSc(-1)
      setTransitioning(false)
    }, 750)
  }, [])

  // 마운트 직후 빛 블리드 시작 (약 1.8s에 걸쳐 사라짐)
  useEffect(() => {
    const t = setTimeout(() => setLightBleed(false), 100)
    return () => clearTimeout(t)
  }, [])

  // S6 색상 순차 등장: flipIn 완료(~1.1s) 후 0.35s 간격으로 하나씩
  useEffect(() => {
    if (sc !== 6) { setColorRevealIdx(-1); return }
    const timers = SVCS.map((_, i) =>
      setTimeout(() => setColorRevealIdx(i), 1100 + i * 350)
    )
    return () => timers.forEach(clearTimeout)
  }, [sc])

  useEffect(() => {
    const timers = [
      setTimeout(() => changeSc(1), 0),
      setTimeout(() => changeSc(2), 2500),
      setTimeout(() => changeSc(3), 5200),
      setTimeout(() => changeSc(4), 8800),
      setTimeout(() => changeSc(5), 12500),
      setTimeout(() => changeSc(6), 16000),
      setTimeout(() => changeSc(7), 19000),
      setTimeout(() => changeSc(8), 22500),
      setTimeout(() => changeSc(9), 27000),
      setTimeout(() => changeSc(10), 30000),
      setTimeout(() => changeSc(11), 35000),
      setTimeout(() => onComplete(), 36000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete, changeSc])

  const skip = () => {
    changeSc(11)
    setTimeout(() => onComplete(), 500)
  }

  // 씬 스타일 헬퍼: 진입/퇴장 애니메이션 적용
  const getSceneStyle = (sceneNum: number): React.CSSProperties => {
    const isActive = sc === sceneNum
    const isExiting = prevSc === sceneNum

    if (!isActive && !isExiting) {
      return { opacity: 0, pointerEvents: 'none', zIndex: 0 }
    }

    const transType = SCENE_TRANS[sc] ?? 'fade'

    if (isActive) {
      return {
        opacity: 1,
        pointerEvents: 'auto',
        zIndex: 10,
        animation: transitioning
          ? `sceneEnter-${transType} 0.65s cubic-bezier(.16,1,.3,1) both`
          : 'none',
      }
    }

    // isExiting
    return {
      opacity: 1,
      pointerEvents: 'none',
      zIndex: 5,
      animation: `sceneExit-${transType} 0.6s cubic-bezier(.55,0,.1,1) both`,
    }
  }

  const isLight = (sc >= 3 && sc < 4) || (sc >= 7 && sc < 8)

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        userSelect: 'none',
        fontFamily: 'var(--font-noto-sans-kr), sans-serif',
        zIndex: 100,
      }}
    >

      {/* 필름 그레인 텍스처 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 200, pointerEvents: 'none',
        opacity: 0.04, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* 초기 빛 블리드 오버레이: 검정에서 서서히 빛이 들어오는 효과 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 90,
          pointerEvents: 'none',
          opacity: lightBleed ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
          background: 'radial-gradient(ellipse at center, rgba(10,10,20,0.95) 0%, #000 70%)',
        }}
      />

      {/* 스캔라인 */}
      {sc >= 1 && sc < 11 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(90deg,transparent,rgba(43,143,191,${isLight ? 0.1 : 0.05}),transparent)`,
              animation: 'scanMove 5s linear infinite',
            }}
          />
        </div>
      )}

      {/* S1: WIZ THE PLANNING 즉시 등장 (격자 배경 데코 + 글자 dropIn) */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', ...getSceneStyle(1) }}>
        {/* 격자 라인 데코 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${(i + 1) * 16.66}%`,
              width: 1,
              background: 'rgba(255,255,255,0.03)',
              transform: sc >= 1 ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: `transform 1s ease-out ${i * 80}ms`,
            }}
          />
        ))}
        {/* 수평 라인 */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            right: '10%',
            top: '50%',
            height: 1,
            background: 'rgba(255,255,255,0.12)',
            transformOrigin: 'left',
            animation: sc >= 1 ? 'scaleX-in 1s ease-out 0.3s both' : 'none',
          }}
        />
        {/* WIZ THE PLANNING 텍스트 */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 11,
                letterSpacing: '0.6em',
                marginBottom: 16,
                animation: sc >= 1 ? 'fadeUp 0.6s ease-out 0.2s both' : 'none',
              }}
            >
              SINCE 2016
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, animation: sc >= 1 ? 'glitch 4s ease-in-out 1.8s infinite' : 'none' }}>
              {'WIZTHEPLANNING'.split('').map((ch, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    color: '#fff',
                    fontSize: 'clamp(16px,2.5vw,24px)',
                    fontWeight: 300,
                    letterSpacing: '0.25em',
                    animation: sc >= 1 ? `dropIn 0.4s cubic-bezier(.34,1.56,.64,1) ${0.05 + i * 0.04}s both` : 'none',
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
            <div
              style={{
                width: 30,
                height: 2,
                background: '#2B8FBF',
                margin: '20px auto 0',
                transformOrigin: 'left',
                animation: sc >= 1 ? 'scaleX-in 0.5s ease-out 0.8s both' : 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* S2: 브리지 씬 "마케팅, 한곳에서." */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: '#000', ...getSceneStyle(2) }}>
        {/* 배경 라이트 블룸 */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(43,143,191,0.12) 0%, transparent 70%)',
          animation: sc >= 2 ? 'blurIn 1s ease-out both' : 'none',
        }} />
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <p
            style={{
              color: '#fff',
              fontSize: 'clamp(32px,7vw,72px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              animation: sc >= 2 ? 'crashIn .6s cubic-bezier(.16,1,.3,1) both' : 'none',
            }}
          >
            마케팅,{' '}
            <span style={{ color: '#2B8FBF' }}>한곳에서.</span>
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 'clamp(12px,1.8vw,16px)',
              letterSpacing: '0.12em',
              marginTop: 28,
              animation: sc >= 2 ? 'wipeR .8s ease-out .7s both' : 'none',
            }}
          >
            미디어 · 퍼포먼스 · 콘텐츠 · 배달 · 타겟핏 · 촬영제작
          </p>
          <div
            style={{
              width: 60,
              height: 1,
              background: 'rgba(43,143,191,0.4)',
              margin: '24px auto 0',
              transformOrigin: 'left',
              animation: sc >= 2 ? 'scaleX-in .5s ease-out 1.4s both' : 'none',
            }}
          />
        </div>
      </div>

      {/* S3: 당신의 마케팅팀이 되겠습니다 — 흰 배경 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', background: '#fff', ...getSceneStyle(3) }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#111', fontSize: 'clamp(38px,9vw,92px)', fontWeight: 900, lineHeight: 1.08, animation: sc >= 3 ? 'crashIn .6s cubic-bezier(.16,1,.3,1) both' : 'none' }}>당신의</p>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: 'clamp(38px,9vw,92px)', fontWeight: 900, lineHeight: 1.08, color: '#2B8FBF', animation: sc >= 3 ? 'slideUpB .7s cubic-bezier(.16,1,.3,1) .2s both' : 'none' }}>마케팅팀이</p>
          </div>
          <div>
            <p style={{ color: '#111', fontSize: 'clamp(38px,9vw,92px)', fontWeight: 900, lineHeight: 1.08, animation: sc >= 3 ? 'wipeR .8s ease-out .5s both' : 'none' }}>되겠습니다.</p>
          </div>
          <div style={{ width: 80, height: 4, background: '#DC2626', margin: '20px auto 0', transformOrigin: 'left', animation: sc >= 3 ? 'scaleX-in .5s ease-out 1.2s both' : 'none' }} />
        </div>
      </div>

      {/* S4: 서비스 키워드 + 6가지 솔루션 */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', ...getSceneStyle(4) }}>
        {/* 배경 파란 radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(43,143,191,0.08) 0%, transparent 70%)',
          animation: sc >= 4 ? 'blurIn 1s ease-out both' : 'none',
        }} />
        {SERVICE_WORDS.map((w, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: w.x,
              top: w.y,
              color: w.c,
              fontSize: w.sz,
              fontWeight: 900,
              opacity: 0.2,
              animation: sc >= 4 ? `dropIn 0.5s cubic-bezier(.34,1.56,.64,1) ${w.dl}s both` : 'none',
            }}
          >
            {w.t}
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            {/* 상단 데코 라인 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: 'rgba(43,143,191,0.4)', transformOrigin: 'right', animation: sc >= 4 ? 'scaleX-in 0.5s ease-out 0.3s both' : 'none' }} />
              <span style={{ color: 'rgba(43,143,191,0.5)', fontSize: 9, letterSpacing: '0.4em', animation: sc >= 4 ? 'fadeUp 0.4s ease-out 0.3s both' : 'none' }}>SOLUTION</span>
              <div style={{ width: 32, height: 1, background: 'rgba(43,143,191,0.4)', transformOrigin: 'left', animation: sc >= 4 ? 'scaleX-in 0.5s ease-out 0.3s both' : 'none' }} />
            </div>
            <p style={{ color: '#fff', fontSize: 'clamp(28px,5vw,56px)', fontWeight: 900, textShadow: '0 0 60px rgba(43,143,191,0.3)', animation: sc >= 4 ? 'crashIn .6s cubic-bezier(.16,1,.3,1) .5s both' : 'none' }}>
              6가지 <span style={{ color: '#2B8FBF' }}>솔루션</span>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(13px,1.8vw,18px)', marginTop: 14, letterSpacing: '0.08em', animation: sc >= 4 ? 'fadeUp .5s ease-out 1s both' : 'none' }}>
              하나의 파트너가 전부 해결합니다
            </p>
            {/* 하단 데코 라인 */}
            <div style={{ width: 50, height: 2, background: '#2B8FBF', margin: '20px auto 0', transformOrigin: 'left', animation: sc >= 4 ? 'scaleX-in 0.5s ease-out 1.3s both' : 'none' }} />
          </div>
        </div>
      </div>

      {/* S5: 마키 스크롤 — 딥네이비 배경 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', background: '#0a0f20', ...getSceneStyle(5) }}>
        {[
          { sp: 12, sz: 'clamp(14px,2.5vw,22px)', w: 700, a: 0.08, d: 'marqueeLeft' },
          { sp: 10, sz: 'clamp(18px,3vw,28px)', w: 800, a: 0.15, d: 'marqueeRight' },
          { sp: 8, sz: 'clamp(26px,5vw,48px)', w: 900, a: 0.25, d: 'marqueeLeft' },
          { sp: 11, sz: 'clamp(16px,2.8vw,24px)', w: 700, a: 0.12, d: 'marqueeRight' },
          { sp: 13, sz: 'clamp(12px,2vw,18px)', w: 700, a: 0.06, d: 'marqueeLeft' },
        ].map((row, r) => (
          <div
            key={r}
            style={{
              whiteSpace: 'nowrap',
              padding: '6px 0',
              animation: sc >= 5 ? `${row.d} ${row.sp}s linear infinite` : 'none',
            }}
          >
            {[...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS].map((k, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  margin: '0 16px',
                  fontSize: row.sz,
                  fontWeight: row.w,
                  color: `rgba(255,255,255,${row.a})`,
                }}
              >
                {k}
              </span>
            ))}
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(10,15,32,0.6)', padding: '20px 40px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ color: '#fff', fontSize: 'clamp(24px,4.5vw,48px)', fontWeight: 900, animation: sc >= 5 ? 'crashIn .6s cubic-bezier(.16,1,.3,1) both' : 'none' }}>
              모든 마케팅을 <span style={{ color: '#2B8FBF' }}>합니다.</span>
            </p>
          </div>
        </div>
      </div>

      {/* S6: 6개 서비스명 flipIn — 처음엔 모두 흰색, 순차적으로 고유 색상 등장 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', ...getSceneStyle(6) }}>
        <div style={{ textAlign: 'center', perspective: 800 }}>
          {SVCS.map((s, i) => (
            <div key={s} style={{ overflow: 'hidden' }}>
              <p
                style={{
                  color: colorRevealIdx >= i ? SVC_COLORS[i] : '#fff',
                  fontSize: 'clamp(18px,3.5vw,34px)',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  margin: '4px 0',
                  animation: sc >= 6 ? `flipIn .5s cubic-bezier(.16,1,.3,1) ${i * 0.12}s both` : 'none',
                  transform: colorRevealIdx >= i ? 'scale(1.06)' : 'scale(1)',
                  textShadow: colorRevealIdx >= i ? `0 0 40px ${SVC_COLORS[i]}80` : 'none',
                  transition: 'color 0.5s ease, transform 0.4s cubic-bezier(.34,1.56,.64,1), text-shadow 0.5s ease',
                  opacity: 0.9,
                }}
              >
                {s}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* S7: 성과 — 웜화이트 배경 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 clamp(24px,6vw,80px)',
        background: '#f5f5f0', ...getSceneStyle(7) }}>

        {/* 상단 라벨 */}
        <p style={{ color: '#999', fontSize: 11, letterSpacing: '0.35em', marginBottom: 16,
          animation: sc >= 7 ? 'fadeUp 0.5s ease-out 0.1s both' : 'none' }}>
          PERFORMANCE RESULT
        </p>

        {/* 340% 카운터 */}
        <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1,
          animation: sc >= 7 ? 'crashIn .5s cubic-bezier(.16,1,.3,1) 0.2s both' : 'none' }}>
          <span style={{ fontSize: 'clamp(80px,18vw,160px)', fontWeight: 900, color: '#DC2626',
            fontFamily: 'var(--font-black-han-sans), sans-serif', fontVariantNumeric: 'tabular-nums' }}>
            {sc >= 7 ? <PercentCounter on={sc >= 7} /> : '0'}
          </span>
          <span style={{ fontSize: 'clamp(40px,9vw,80px)', fontWeight: 900, color: '#111',
            fontFamily: 'var(--font-black-han-sans), sans-serif', marginLeft: 4 }}>%</span>
        </div>

        {/* 설명 텍스트 */}
        <p style={{ color: '#333', fontSize: 'clamp(15px,2.2vw,22px)', fontWeight: 700, marginTop: 12,
          animation: sc >= 7 ? 'wipeR .8s ease-out 0.8s both' : 'none' }}>
          평균 매출 성과 향상
        </p>

        {/* 비교 바 */}
        <div style={{ width: '100%', maxWidth: 520, marginTop: 40 }}>
          {/* 우리 */}
          <div style={{ marginBottom: 20, animation: sc >= 7 ? 'fadeUp 0.5s ease-out 1s both' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#333', letterSpacing: '0.05em' }}>WIZ THE PLANNING</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#DC2626' }}>340%</span>
            </div>
            <div style={{ height: 10, background: '#e5e5e0', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', background: 'linear-gradient(90deg, #DC2626, #ef4444)',
                width: sc >= 7 ? '100%' : '0%',
                transition: sc >= 7 ? 'width 1.4s cubic-bezier(.16,1,.3,1) 1s' : 'none',
                borderRadius: 2,
              }} />
            </div>
          </div>
          {/* 업계 평균 */}
          <div style={{ animation: sc >= 7 ? 'fadeUp 0.5s ease-out 1.2s both' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#999', letterSpacing: '0.05em' }}>업계 평균</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#999' }}>100%</span>
            </div>
            <div style={{ height: 10, background: '#e5e5e0', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%', background: '#bbb',
                width: sc >= 7 ? '29.4%' : '0%',
                transition: sc >= 7 ? 'width 1s cubic-bezier(.16,1,.3,1) 1.3s' : 'none',
                borderRadius: 2,
              }} />
            </div>
          </div>
        </div>

        {/* KPI */}
        <div style={{ display: 'flex', gap: 'clamp(32px,6vw,80px)', marginTop: 40 }}>
          {[['4.8/5', '고객 만족도', '#2B8FBF'], ['95%', '재계약률', '#DC2626']].map(([num, label, col], i) => (
            <div key={i} style={{ textAlign: 'center',
              animation: sc >= 7 ? `dropIn .5s cubic-bezier(.34,1.56,.64,1) ${1.6 + i * 0.2}s both` : 'none' }}>
              <p style={{ color: col as string, fontSize: 'clamp(22px,3.5vw,38px)', fontWeight: 900,
                fontFamily: 'var(--font-black-han-sans), sans-serif' }}>{num}</p>
              <p style={{ color: '#888', fontSize: 11, marginTop: 4, letterSpacing: '0.1em' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* S8: 연도 카운팅 + 클라이언트 수 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: '#000', ...getSceneStyle(8) }}>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: 700 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'clamp(32px,6vw,80px)', marginBottom: 48 }}>
            <div style={{ animation: sc >= 8 ? 'flipIn .5s ease-out both' : 'none' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.25em', marginBottom: 10 }}>SINCE</p>
              <p style={{ color: '#fff', fontSize: 'clamp(40px,9vw,88px)', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                <YearCounter on={sc >= 8} />
              </p>
            </div>
            <div style={{ animation: sc >= 8 ? 'flipIn .5s ease-out .3s both' : 'none' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.25em', marginBottom: 10 }}>CLIENTS</p>
              <p style={{ color: '#fff', fontSize: 'clamp(40px,9vw,88px)', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                <NumCounter on={sc >= 8} />
              </p>
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#fff', fontSize: 'clamp(34px,7vw,76px)', fontWeight: 900, letterSpacing: '-0.04em', animation: sc >= 8 ? 'bounceUp .8s cubic-bezier(.16,1,.3,1) 2.2s both' : 'none' }}>
              <span style={{ color: '#2B8FBF' }}>결과</span>로 증명합니다.
            </p>
          </div>
        </div>
      </div>

      {/* S9: 모든 마케팅의 시작과 끝 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: '#000', ...getSceneStyle(9) }}>
        {/* 배경 red glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(220,38,38,0.1) 0%, transparent 70%)',
          animation: sc >= 9 ? 'blurIn 0.8s ease-out 0.5s both' : 'none',
        }} />
        <div style={{ textAlign: 'center', position: 'relative' }}>
          {/* 상단 데코 라인 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.25)', transformOrigin: 'right', animation: sc >= 9 ? 'scaleX-in 0.5s ease-out 0.3s both' : 'none' }} />
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10, letterSpacing: '0.3em', animation: sc >= 9 ? 'fadeUp 0.5s ease-out 0.3s both' : 'none' }}>WIZ THE PLANNING</span>
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.25)', transformOrigin: 'left', animation: sc >= 9 ? 'scaleX-in 0.5s ease-out 0.3s both' : 'none' }} />
          </div>
          <span style={{ display: 'block', color: '#fff', fontSize: 'clamp(32px,6.5vw,68px)', fontWeight: 900, lineHeight: 1.2, animation: sc >= 9 ? 'crashIn .5s cubic-bezier(.16,1,.3,1) both' : 'none' }}>
            모든 마케팅의
          </span>
          <span
            style={{
              display: 'block',
              marginTop: 4,
              fontSize: 'clamp(32px,6.5vw,68px)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#DC2626',
              animation: sc >= 9 ? 'crashIn .5s cubic-bezier(.16,1,.3,1) .2s both, glowPulse 2s ease-in-out .7s infinite, glitch 3s ease-in-out 1s 2' : 'none',
            }}
          >
            시작과 끝.
          </span>
        </div>
      </div>

      {/* S10: W 로고 SVG 드로잉 + 버스트 */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', ...getSceneStyle(10) }}>
        {sc >= 10 && [0, 45, 90, 135].map((d) => (
          <div
            key={d}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 500,
              height: 500,
              background: `linear-gradient(${d}deg,transparent 30%,rgba(43,143,191,.1) 50%,transparent 70%)`,
              animation: `lightRay 3s ease-in-out ${d * 5}ms infinite`,
            }}
          />
        ))}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28, animation: sc >= 10 ? 'fadeUp .8s ease-out both' : 'none' }}>
            <WLogo sz={120} anim={sc >= 10} glow={sc >= 10} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', perspective: 600 }}>
            {'WIZ THE PLANNING'.split('').map((ch, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  color: '#fff',
                  fontSize: 'clamp(16px,3vw,30px)',
                  fontWeight: 300,
                  letterSpacing: '0.22em',
                  animation: sc >= 10 ? `letterPop .4s cubic-bezier(.16,1,.3,1) ${1.5 + i * 0.08}s both` : 'none',
                  minWidth: ch === ' ' ? '0.5em' : 'auto',
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>

          {sc >= 10 && (
            <>
              <div style={{ position: 'fixed', inset: 0, background: '#fff', animation: 'flashW 0.8s ease-out 3.3s both', pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 100, height: 100, borderRadius: '50%', border: '3px solid rgba(43,143,191,0.8)', animation: 'rB1 1s ease-out 3.3s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 100, height: 100, borderRadius: '50%', border: '2px solid rgba(43,143,191,0.5)', animation: 'rB2 1.3s ease-out 3.35s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 100, height: 100, borderRadius: '50%', border: '1px solid rgba(43,143,191,0.3)', animation: 'rB3 1.8s ease-out 3.4s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,143,191,0.4) 0%, transparent 70%)', animation: 'explodeOut 1.5s ease-out 3.3s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -5, left: '-20%', right: '-20%', height: 40, background: 'linear-gradient(90deg, transparent, rgba(43,143,191,0.5), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 1s ease-in-out 3.8s both', mixBlendMode: 'screen', pointerEvents: 'none' }} />
            </>
          )}

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.3em', marginTop: 28, animation: sc >= 10 ? 'fadeUp .5s ease-out 4s both' : 'none' }}>
            모든 마케팅의 시작과 끝
          </p>
        </div>
      </div>

      {/* S11 페이드아웃 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          opacity: sc >= 11 ? 1 : 0,
          transition: 'opacity 0.7s',
          pointerEvents: 'none',
        }}
      />

      {/* 프로그레스 바 + CLICK TO SKIP */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60 }}>
        <div
          style={{
            height: 2,
            background: 'rgba(43,143,191,0.5)',
            width: `${Math.min((sc / 11) * 100, 100)}%`,
            transition: 'width 1s ease',
          }}
        />
        <p
          style={{
            textAlign: 'center',
            color: `rgba(${isLight ? '0,0,0' : '255,255,255'},0.15)`,
            fontSize: 9,
            letterSpacing: '0.3em',
            padding: '10px 0',
          }}
        >
          CLICK TO SKIP
        </p>
      </div>
    </div>
  )
}
