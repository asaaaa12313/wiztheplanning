'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import WLogo from '@/components/shared/WLogo'
import IndustryScene from './IndustryScene'
import type { IndustryMotionData } from './IndustryScene'

/* ─── 서비스 태그 색상 매핑 ─── */
const SVC = {
  퍼포먼스: '#2563EB',
  콘텐츠: '#8B5CF6',
  미디어: '#DC2626',
  '촬영/제작': '#059669',
  배달플랫폼: '#EA580C',
}

/* ─── 6개 업종 모션 데이터 ─── */
const INDUSTRY_MOTION: IndustryMotionData[] = [
  {
    number: '01',
    name: '병원 / 의료',
    copy: ['환자가 검색할 때', '가장 먼저 보이는 병원'],
    services: [
      { name: '퍼포먼스', color: SVC.퍼포먼스 },
      { name: '콘텐츠', color: SVC.콘텐츠 },
      { name: '미디어', color: SVC.미디어 },
    ],
    bgColor: '#0a0f1f',
    accentColor: '#2563EB',
    glowGradient: 'radial-gradient(ellipse at 60% 40%, rgba(37,99,235,0.12), transparent 60%)',
  },
  {
    number: '02',
    name: '음식점',
    copy: ['발길이 끊이지 않는 맛집,', '찾아오는 맛집으로'],
    services: [
      { name: '퍼포먼스', color: SVC.퍼포먼스 },
      { name: '콘텐츠', color: SVC.콘텐츠 },
      { name: '촬영/제작', color: SVC['촬영/제작'] },
    ],
    bgColor: '#1a0a0a',
    accentColor: '#DC2626',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.1), transparent 60%)',
  },
  {
    number: '03',
    name: '배달 전문',
    copy: ['주문 수 늘리는', '가장 확실한 방법'],
    services: [
      { name: '배달플랫폼', color: SVC.배달플랫폼 },
      { name: '퍼포먼스', color: SVC.퍼포먼스 },
      { name: '촬영/제작', color: SVC['촬영/제작'] },
    ],
    bgColor: '#12100a',
    accentColor: '#EA580C',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(234,88,12,0.1), transparent 60%)',
  },
  {
    number: '04',
    name: '부동산',
    copy: ['아파트 주민이', '매일 보는 광고'],
    services: [
      { name: '미디어', color: SVC.미디어 },
      { name: '퍼포먼스', color: SVC.퍼포먼스 },
      { name: '콘텐츠', color: SVC.콘텐츠 },
    ],
    bgColor: '#0a1210',
    accentColor: '#059669',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(5,150,105,0.1), transparent 60%)',
  },
  {
    number: '05',
    name: '학원 / 교육',
    copy: ['학부모가 신뢰하는', '학원 만들기'],
    services: [
      { name: '퍼포먼스', color: SVC.퍼포먼스 },
      { name: '콘텐츠', color: SVC.콘텐츠 },
      { name: '미디어', color: SVC.미디어 },
    ],
    bgColor: '#150a25',
    accentColor: '#8B5CF6',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.12), transparent 60%)',
  },
  {
    number: '06',
    name: '뷰티 / 운동',
    copy: ['프리미엄 브랜드', '이미지 구축'],
    services: [
      { name: '퍼포먼스', color: SVC.퍼포먼스 },
      { name: '콘텐츠', color: SVC.콘텐츠 },
      { name: '촬영/제작', color: SVC['촬영/제작'] },
    ],
    bgColor: '#1a0a18',
    accentColor: '#DB2777',
    glowGradient: 'radial-gradient(ellipse at 50% 50%, rgba(219,39,119,0.12), transparent 60%)',
  },
]

/* ─── 연도 카운터 (S4용) ─── */
function YearCounter({ on }: { on: boolean }) {
  const [year, setYear] = useState(2016)
  useEffect(() => {
    if (!on) { setYear(2016); return }
    let v = 2016
    const t = setInterval(() => {
      v++
      setYear(v)
      if (v >= 2026) clearInterval(t)
    }, 350)
    return () => clearInterval(t)
  }, [on])
  return <>{String(year)}</>
}

/* ─── 클라이언트 수 카운터 (S4용, 1→10,000 가속) ─── */
function NumCounter({ on }: { on: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) { setN(0); return }
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

/* ─── 배경 키워드 (S3 정적 워터마크용) ─── */
const BG_KEYWORDS = [
  { t: '네이버 플레이스', x: '8%', y: '15%', sz: 28 },
  { t: '배달플랫폼', x: '65%', y: '10%', sz: 32 },
  { t: '블로그 SEO', x: '20%', y: '75%', sz: 24 },
  { t: '체험단', x: '75%', y: '70%', sz: 36 },
  { t: 'SNS 마케팅', x: '10%', y: '45%', sz: 30 },
  { t: '검색광고', x: '80%', y: '40%', sz: 26 },
  { t: '영상 제작', x: '40%', y: '85%', sz: 22 },
  { t: '포커스미디어', x: '55%', y: '20%', sz: 28 },
]

/* ─── 씬 전환 타입 매핑 (12씬) ─── */
// S1 WIZTHEPLANNING → S2 마케팅한곳 → S3 모든마케팅 → S4 당신의마케팅팀 → S5 어떤업종? → S6~S11 업종 → S12 로고
const SCENE_TRANS: Record<number, string> = {
  1:  'fade',
  2:  'zoom-in',
  3:  'roll-y',
  4:  'slide-left',
  5:  'zoom-out',
  6:  'zoom-out',
  7:  'slide-left',
  8:  'roll-y',
  9:  'slide-up',
  10: 'zoom-in',
  11: 'roll-x',
  12: 'zoom-in',
}

interface IntroSequenceV2Props {
  active?: boolean
}

export default function IntroSequenceV2({ active = true }: IntroSequenceV2Props) {
  const [sc, setSc] = useState(0)
  const [prevSc, setPrevSc] = useState(-1)
  const [transitioning, setTransitioning] = useState(false)
  const [lightBleed, setLightBleed] = useState(true)
  const [s11Closing, setS11Closing] = useState(false)

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

  // 초기 빛 블리드
  useEffect(() => {
    const t = setTimeout(() => setLightBleed(false), 100)
    return () => clearTimeout(t)
  }, [])

  // S11 (뷰티/운동) 마무리 멘트 전환
  useEffect(() => {
    if (sc !== 11) { setS11Closing(false); return }
    const t = setTimeout(() => setS11Closing(true), 2500)
    return () => clearTimeout(t)
  }, [sc])

  // 타이머 스케줄 (~38초/사이클)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const startCycle = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = [
      setTimeout(() => changeSc(1), 0),          // S1: WIZTHEPLANNING       (2s)
      setTimeout(() => changeSc(2), 2000),        // S2: 마케팅, 한곳에서.     (1.5s)
      setTimeout(() => changeSc(3), 3500),        // S3: 모든 마케팅을 합니다   (1.5s)
      setTimeout(() => changeSc(4), 5000),        // S4: 연도+클라이언트카운터   (4.5s)
      setTimeout(() => changeSc(5), 9500),        // S5: 어떤 업종이신가요?     (1.5s)
      setTimeout(() => changeSc(6), 11000),       // S6: 병원/의료             (3.5s)
      setTimeout(() => changeSc(7), 14500),       // S7: 음식점               (3.5s)
      setTimeout(() => changeSc(8), 18000),       // S8: 배달 전문             (3.5s)
      setTimeout(() => changeSc(9), 21500),       // S9: 부동산               (3.5s)
      setTimeout(() => changeSc(10), 25000),      // S10: 학원/교육            (3.5s)
      setTimeout(() => changeSc(11), 28500),      // S11: 뷰티/운동            (3.5s)
      setTimeout(() => changeSc(12), 32000),      // S12: W 로고               (6s)
      setTimeout(() => {                          // 루프 리셋
        setSc(0)
        setPrevSc(-1)
        setTransitioning(false)
        setS11Closing(false)
        setTimeout(() => startCycle(), 200)
      }, 38000),
    ]
  }, [changeSc])

  useEffect(() => {
    if (!active) return
    startCycle()
    return () => timersRef.current.forEach(clearTimeout)
  }, [startCycle, active])

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

  const isLight = sc === 5

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        fontFamily: 'var(--font-noto-sans-kr), sans-serif',
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
      {sc >= 1 && sc < 12 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
          <div
            style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg,transparent,rgba(43,143,191,${isLight ? 0.1 : 0.05}),transparent)`,
              animation: 'scanMove 5s linear infinite',
            }}
          />
        </div>
      )}

      {/* ────────── S1: WIZTHEPLANNING ────────── */}
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
              color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(13px,1.5vw,18px)', letterSpacing: '0.6em', marginBottom: 24,
              animation: sc >= 1 ? 'fadeUp 0.6s ease-out 0.2s both' : 'none',
            }}>SINCE 2016</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2px,0.4vw,6px)', animation: sc >= 1 ? 'glitch 4s ease-in-out 1.8s infinite' : 'none' }}>
              {'WIZTHEPLANNING'.split('').map((ch, i) => (
                <span key={i} style={{
                  display: 'inline-block', color: '#fff',
                  fontSize: 'clamp(28px,5vw,56px)', fontWeight: 300, letterSpacing: '0.25em',
                  animation: sc >= 1 ? `dropIn 0.4s cubic-bezier(.34,1.56,.64,1) ${0.05 + i * 0.04}s both` : 'none',
                }}>{ch}</span>
              ))}
            </div>
            <div style={{
              width: 60, height: 2, background: '#2B8FBF', margin: '28px auto 0', transformOrigin: 'left',
              animation: sc >= 1 ? 'scaleX-in 0.5s ease-out 0.8s both' : 'none',
            }} />
          </div>
        </div>
      </div>

      {/* ────────── S2: "마케팅, 한곳에서." ────────── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: '#000', ...getSceneStyle(2) }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(43,143,191,0.12) 0%, transparent 70%)',
          animation: sc >= 2 ? 'blurIn 1s ease-out both' : 'none',
        }} />
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <p style={{
            color: '#fff', fontSize: 'clamp(48px,10.5vw,108px)', fontWeight: 900,
            lineHeight: 1.1, letterSpacing: '-0.02em',
            animation: sc >= 2 ? 'crashIn .6s cubic-bezier(.16,1,.3,1) both' : 'none',
          }}>
            마케팅,{' '}
            <span style={{ color: '#2B8FBF' }}>한곳에서.</span>
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(18px,2.7vw,24px)',
            letterSpacing: '0.12em', marginTop: 32,
            animation: sc >= 2 ? 'wipeR .8s ease-out .7s both' : 'none',
          }}>
            미디어 · 퍼포먼스 · 콘텐츠 · 배달 · 타겟핏 · 촬영제작
          </p>
          <div style={{
            width: 80, height: 1, background: 'rgba(43,143,191,0.4)', margin: '28px auto 0', transformOrigin: 'left',
            animation: sc >= 2 ? 'scaleX-in .5s ease-out 1.4s both' : 'none',
          }} />
        </div>
      </div>

      {/* ────────── S3: "모든 마케팅을 합니다" ────────── */}
      <div style={{ position: 'absolute', inset: 0, background: '#0a0f20', ...getSceneStyle(3) }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(43,143,191,0.18) 0%, transparent 70%)',
          animation: sc >= 3 ? 'blurIn 0.8s ease-out both' : 'none',
        }} />
        {BG_KEYWORDS.map((w, i) => (
          <div key={i} style={{
            position: 'absolute', left: w.x, top: w.y,
            color: 'rgba(255,255,255,0.12)', fontSize: w.sz * 2, fontWeight: 900,
            pointerEvents: 'none',
            animation: sc >= 3 ? `fadeUp 0.6s ease-out ${0.1 + i * 0.08}s both` : 'none',
          }}>{w.t}</div>
        ))}
        {sc === 3 && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.15)',
            animation: 'flashW 0.3s ease-out both', pointerEvents: 'none', zIndex: 1,
          }} />
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              color: '#fff', fontSize: 'clamp(48px,10.5vw,108px)', fontWeight: 900,
              animation: sc >= 3 ? 'crashIn .6s cubic-bezier(.16,1,.3,1) both' : 'none',
            }}>
              모든 마케팅을{' '}
              <span style={{ color: '#2B8FBF' }}>합니다.</span>
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(16px,2.4vw,22px)',
              letterSpacing: '0.1em', marginTop: 28,
              animation: sc >= 3 ? 'fadeUp .5s ease-out 1s both' : 'none',
            }}>
              6개 업종 맞춤 솔루션
            </p>
            <div style={{
              width: 60, height: 2, background: '#2B8FBF', margin: '24px auto 0', transformOrigin: 'left',
              animation: sc >= 3 ? 'scaleX-in 0.5s ease-out 1.3s both' : 'none',
            }} />
          </div>
        </div>
      </div>

      {/* ────────── S4: 연도 카운터 (2016 → 2026) ────────── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: '#000', ...getSceneStyle(4) }}>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: 700 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'clamp(32px,6vw,80px)', marginBottom: 48 }}>
            <div style={{ animation: sc >= 4 ? 'flipIn .5s ease-out both' : 'none' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.25em', marginBottom: 10 }}>SINCE</p>
              <p style={{ color: '#fff', fontSize: 'clamp(40px,9vw,88px)', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                <YearCounter on={sc === 4} />
              </p>
            </div>
            <div style={{ animation: sc >= 4 ? 'flipIn .5s ease-out .3s both' : 'none' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.25em', marginBottom: 10 }}>CLIENTS</p>
              <p style={{ color: '#2B8FBF', fontSize: 'clamp(40px,9vw,88px)', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                <NumCounter on={sc === 4} />
              </p>
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{
              color: '#fff', fontSize: 'clamp(28px,5.5vw,56px)', fontWeight: 900, letterSpacing: '-0.04em',
              animation: sc >= 4 ? 'bounceUp .8s cubic-bezier(.16,1,.3,1) 2.5s both' : 'none',
            }}>
              <span style={{ color: '#2B8FBF' }}>결과</span>로 증명합니다.
            </p>
          </div>
        </div>
      </div>

      {/* ────────── S5: "어떤 업종이신가요?" (전환점) ────────── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', background: '#f2f1ec', ...getSceneStyle(5) }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: 'rgba(0,0,0,0.25)', fontSize: 13, letterSpacing: '0.35em', fontWeight: 700, marginBottom: 24,
            fontFamily: 'var(--font-gothic-a1), sans-serif',
            animation: sc >= 5 ? 'fadeUp 0.4s ease-out 0.1s both' : 'none',
          }}>INDUSTRY SOLUTION</p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
            <span style={{
              display: 'inline-block', color: '#111',
              fontSize: 'clamp(42px,9.75vw,105px)', fontWeight: 900, lineHeight: 1.1,
              animation: sc >= 5 ? 'slideLeft 0.5s cubic-bezier(.16,1,.3,1) 0.2s both' : 'none',
            }}>어떤</span>
            <span style={{
              display: 'inline-block', color: '#111',
              fontSize: 'clamp(42px,9.75vw,105px)', fontWeight: 900, lineHeight: 1.1,
              animation: sc >= 5 ? 'slideRight 0.5s cubic-bezier(.16,1,.3,1) 0.3s both' : 'none',
            }}>업종이신가요</span>
            <span style={{
              display: 'inline-block', color: '#DC2626',
              fontSize: 'clamp(42px,9.75vw,105px)', fontWeight: 900, lineHeight: 1.1,
              animation: sc >= 5 ? 'questionPop 0.6s cubic-bezier(.16,1,.3,1) 0.5s both, microShake 0.15s ease-in-out 0.9s 2' : 'none',
            }}>?</span>
          </div>
        </div>
      </div>

      {/* ────────── S6~S11: 6개 업종 모션그래픽 ────────── */}
      {INDUSTRY_MOTION.map((ind, i) => {
        const sceneNum = 6 + i
        return (
          <div
            key={ind.number}
            style={{
              position: 'absolute',
              inset: 0,
              background: ind.bgColor,
              ...getSceneStyle(sceneNum),
            }}
          >
            {sc === sceneNum && (
              <>
                <IndustryScene data={ind} isActive={sc === sceneNum} rapid={false} />
                {/* S11 (뷰티/운동) 마무리 멘트 오버레이 */}
                {sceneNum === 11 && s11Closing && (
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.7)', zIndex: 20,
                    animation: 'sceneEnter-fade 0.4s ease-out both',
                  }}>
                    <p style={{
                      color: '#DC2626', fontSize: 'clamp(36px,7vw,80px)', fontWeight: 900,
                      textAlign: 'center', lineHeight: 1.2,
                      animation: 'crashIn 0.5s cubic-bezier(.16,1,.3,1) both',
                      textShadow: '0 0 60px rgba(220,38,38,0.4)',
                    }}>
                      모든 업종의<br />시작과 끝.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )
      })}

      {/* ────────── S12: W 로고 + 버스트 ────────── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', ...getSceneStyle(12) }}>
        {sc >= 12 && [0, 45, 90, 135].map((d) => (
          <div key={d} style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '80vw', height: '80vw', maxWidth: 800, maxHeight: 800,
            background: `linear-gradient(${d}deg,transparent 30%,rgba(43,143,191,.1) 50%,transparent 70%)`,
            animation: `lightRay 3s ease-in-out ${d * 5}ms infinite`,
          }} />
        ))}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36, animation: sc >= 12 ? 'fadeUp .8s ease-out both' : 'none' }}>
            <WLogo sz={180} anim={sc >= 12} glow={sc >= 12} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', perspective: 600 }}>
            {'WIZ THE PLANNING'.split('').map((ch, i) => (
              <span key={i} style={{
                display: 'inline-block', color: '#fff',
                fontSize: 'clamp(24px,4.5vw,48px)', fontWeight: 300, letterSpacing: '0.22em',
                animation: sc >= 12 ? `letterPop .4s cubic-bezier(.16,1,.3,1) ${1.5 + i * 0.08}s both` : 'none',
                minWidth: ch === ' ' ? '0.5em' : 'auto',
              }}>{ch === ' ' ? '\u00A0' : ch}</span>
            ))}
          </div>

          {sc >= 12 && (
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
            color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(14px,2vw,20px)', letterSpacing: '0.3em', marginTop: 36,
            animation: sc >= 12 ? 'fadeUp .5s ease-out 3.2s both' : 'none',
          }}>모든 마케팅의 시작과 끝</p>
        </div>
      </div>

    </div>
  )
}
