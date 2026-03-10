'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import WLogo from '@/components/shared/WLogo'

/* ─── 카운터 컴포넌트 (1안에서 가져옴) ─── */
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

/* ─── 씬 전환 타입 ─── */
const SCENE_TRANS: Record<number, string> = {
  1: 'fade',
  2: 'roll-x',
  3: 'zoom-in',
}

interface IntroOverlayProps {
  onComplete: () => void
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [sc, setSc] = useState(0)
  const [prevSc, setPrevSc] = useState(-1)
  const [transitioning, setTransitioning] = useState(false)
  const [lightBleed, setLightBleed] = useState(true)

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

  // 인트로 중 스크롤 차단
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // 초기 빛 블리드
  useEffect(() => {
    const t = setTimeout(() => setLightBleed(false), 100)
    return () => clearTimeout(t)
  }, [])

  // 타이머: S1(2.5s) → S2(4.5s) → S3(5s) → 완료
  useEffect(() => {
    const timers = [
      setTimeout(() => changeSc(1), 0),       // S1: WIZTHEPLANNING
      setTimeout(() => changeSc(2), 2500),     // S2: 카운터
      setTimeout(() => changeSc(3), 7000),     // S3: W 로고
      setTimeout(() => onComplete(), 12000),   // 완료
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete, changeSc])

  // 클릭 시 스킵
  const skip = () => {
    onComplete()
  }

  // 씬 스타일 헬퍼
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

    return {
      opacity: 1,
      pointerEvents: 'none',
      zIndex: 5,
      animation: `sceneExit-${transType} 0.6s cubic-bezier(.55,0,.1,1) both`,
    }
  }

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
      {/* 필름 그레인 */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 200, pointerEvents: 'none',
        opacity: 0.04, mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* 초기 빛 블리드 */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 90, pointerEvents: 'none',
          opacity: lightBleed ? 1 : 0,
          transition: 'opacity 2s ease-in-out',
          background: 'radial-gradient(ellipse at center, rgba(10,10,20,0.95) 0%, #000 70%)',
        }}
      />

      {/* 스캔라인 */}
      {sc >= 1 && sc < 3 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(43,143,191,0.05),transparent)',
            animation: 'scanMove 5s linear infinite',
          }} />
        </div>
      )}

      {/* ────────── S1: SINCE 2016 + WIZTHEPLANNING ────────── */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', ...getSceneStyle(1) }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: `${(i + 1) * 16.66}%`,
              width: 1, background: 'rgba(255,255,255,0.03)',
              transform: sc >= 1 ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'top',
              transition: `transform 1s ease-out ${i * 80}ms`,
            }}
          />
        ))}
        <div style={{
          position: 'absolute', left: '10%', right: '10%', top: '50%', height: 1,
          background: 'rgba(255,255,255,0.12)', transformOrigin: 'left',
          animation: sc >= 1 ? 'scaleX-in 1s ease-out 0.3s both' : 'none',
        }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '0.6em', marginBottom: 16,
              animation: sc >= 1 ? 'fadeUp 0.6s ease-out 0.2s both' : 'none',
            }}>SINCE 2016</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 2, animation: sc >= 1 ? 'glitch 4s ease-in-out 1.8s infinite' : 'none' }}>
              {'WIZTHEPLANNING'.split('').map((ch, i) => (
                <span key={i} style={{
                  display: 'inline-block', color: '#fff',
                  fontSize: 'clamp(16px,2.5vw,24px)', fontWeight: 300, letterSpacing: '0.25em',
                  animation: sc >= 1 ? `dropIn 0.4s cubic-bezier(.34,1.56,.64,1) ${0.05 + i * 0.04}s both` : 'none',
                }}>{ch}</span>
              ))}
            </div>
            <div style={{
              width: 30, height: 2, background: '#2B8FBF', margin: '20px auto 0', transformOrigin: 'left',
              animation: sc >= 1 ? 'scaleX-in 0.5s ease-out 0.8s both' : 'none',
            }} />
          </div>
        </div>
      </div>

      {/* ────────── S2: 연도 카운팅 + 클라이언트 수 ────────── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: '#000', ...getSceneStyle(2) }}>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: 700 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'clamp(32px,6vw,80px)', marginBottom: 48 }}>
            <div style={{ animation: sc >= 2 ? 'flipIn .5s ease-out both' : 'none' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.25em', marginBottom: 10 }}>SINCE</p>
              <p style={{ color: '#fff', fontSize: 'clamp(40px,9vw,88px)', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                <YearCounter on={sc >= 2} />
              </p>
            </div>
            <div style={{ animation: sc >= 2 ? 'flipIn .5s ease-out .3s both' : 'none' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.25em', marginBottom: 10 }}>CLIENTS</p>
              <p style={{ color: '#fff', fontSize: 'clamp(40px,9vw,88px)', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                <NumCounter on={sc >= 2} />
              </p>
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{
              color: '#fff', fontSize: 'clamp(34px,7vw,76px)', fontWeight: 900, letterSpacing: '-0.04em',
              animation: sc >= 2 ? 'bounceUp .8s cubic-bezier(.16,1,.3,1) 2.2s both' : 'none',
            }}>
              <span style={{ color: '#2B8FBF' }}>결과</span>로 증명합니다.
            </p>
          </div>
        </div>
      </div>

      {/* ────────── S3: W 로고 + 버스트 ────────── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', ...getSceneStyle(3) }}>
        {sc >= 3 && [0, 45, 90, 135].map((d) => (
          <div key={d} style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 500, height: 500,
            background: `linear-gradient(${d}deg,transparent 30%,rgba(43,143,191,.1) 50%,transparent 70%)`,
            animation: `lightRay 3s ease-in-out ${d * 5}ms infinite`,
          }} />
        ))}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28, animation: sc >= 3 ? 'fadeUp .8s ease-out both' : 'none' }}>
            <WLogo sz={120} anim={sc >= 3} glow={sc >= 3} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', perspective: 600 }}>
            {'WIZ THE PLANNING'.split('').map((ch, i) => (
              <span key={i} style={{
                display: 'inline-block', color: '#fff',
                fontSize: 'clamp(16px,3vw,30px)', fontWeight: 300, letterSpacing: '0.22em',
                animation: sc >= 3 ? `letterPop .4s cubic-bezier(.16,1,.3,1) ${1.5 + i * 0.08}s both` : 'none',
                minWidth: ch === ' ' ? '0.5em' : 'auto',
              }}>{ch === ' ' ? '\u00A0' : ch}</span>
            ))}
          </div>

          {sc >= 3 && (
            <>
              <div style={{ position: 'absolute', inset: 0, background: '#fff', animation: 'flashW 0.8s ease-out 2.5s both', pointerEvents: 'none', zIndex: 10 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 100, height: 100, borderRadius: '50%', border: '3px solid rgba(43,143,191,0.8)', animation: 'rB1 1s ease-out 2.5s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 100, height: 100, borderRadius: '50%', border: '2px solid rgba(43,143,191,0.5)', animation: 'rB2 1.3s ease-out 2.55s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 100, height: 100, borderRadius: '50%', border: '1px solid rgba(43,143,191,0.3)', animation: 'rB3 1.8s ease-out 2.6s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,143,191,0.4) 0%, transparent 70%)', animation: 'explodeOut 1.5s ease-out 2.5s both', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -5, left: '-20%', right: '-20%', height: 40, background: 'linear-gradient(90deg, transparent, rgba(43,143,191,0.5), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 1s ease-in-out 3s both', mixBlendMode: 'screen', pointerEvents: 'none' }} />
            </>
          )}

          <p style={{
            color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: '0.3em', marginTop: 28,
            animation: sc >= 3 ? 'fadeUp .5s ease-out 3.2s both' : 'none',
          }}>모든 마케팅의 시작과 끝</p>
        </div>
      </div>

      {/* 프로그레스 바 */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60 }}>
        <div style={{
          height: 2, background: 'rgba(43,143,191,0.5)',
          width: `${Math.min((sc / 3) * 100, 100)}%`,
          transition: 'width 1s ease',
        }} />
      </div>
    </div>
  )
}
