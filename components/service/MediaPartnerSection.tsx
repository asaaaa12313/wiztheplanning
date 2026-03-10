import type { MediaPartner } from '@/types'

interface MediaPartnerSectionProps {
  partner: MediaPartner
  index: number
}

export default function MediaPartnerSection({ partner, index }: MediaPartnerSectionProps) {
  const headingFont = 'var(--font-do-hyeon), sans-serif'
  const bodyFont = 'var(--font-noto-sans-kr), sans-serif'
  const p = partner

  return (
    <div id={`media-${index}`}>
      {/* ══════════ Zone A: 히어로 배너 ══════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: 'clamp(280px, 40vw, 420px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(32px, 6vw, 64px) clamp(24px, 4vw, 48px)',
          background: p.colorDark
            ? `linear-gradient(160deg, ${p.colorDark}, ${p.colorDark}cc 60%, ${p.colorDark}88)`
            : `linear-gradient(160deg, #111, #222)`,
          overflow: 'hidden',
        }}
      >
        {/* glow 효과 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(ellipse at 70% 30%, ${p.color}33, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', width: '100%' }}>
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 12,
              letterSpacing: '0.2em',
              marginBottom: 16,
              fontFamily: bodyFont,
            }}
          >
            {p.subtitle}
          </p>
          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(36px, 7vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: 16,
              fontFamily: headingFont,
            }}
          >
            {p.name}
          </h2>
          <div
            style={{
              width: 60,
              height: 3,
              background: p.color,
              marginBottom: 20,
            }}
          />
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'clamp(18px, 3vw, 28px)',
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
              wordBreak: 'keep-all',
              fontFamily: headingFont,
            }}
          >
            {p.tagline}
          </p>
        </div>
      </section>

      {/* ══════════ Zone B: 통계 바 ══════════ */}
      <section
        style={{
          background: '#fff',
          borderBottom: `3px solid ${p.color}`,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            padding: 'clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px)',
          }}
        >
          {p.statItems.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '16px 8px',
                borderRight: i < p.statItems.length - 1 ? '1px solid #e5e5e5' : 'none',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(28px, 5vw, 44px)',
                  fontWeight: 400,
                  color: p.color,
                  lineHeight: 1.1,
                  marginBottom: 8,
                  fontFamily: headingFont,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: '#333',
                  letterSpacing: '0.05em',
                  fontFamily: bodyFont,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ Zone C: 매체 소개 ══════════ */}
      <section
        style={{
          background: '#fafafa',
          padding: 'clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              color: p.color,
              marginBottom: 24,
              fontFamily: bodyFont,
              fontWeight: 700,
            }}
          >
            매체 소개
          </p>

          <p
            style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              color: '#333',
              lineHeight: 2.0,
              whiteSpace: 'pre-line',
              wordBreak: 'keep-all',
              marginBottom: 40,
              fontFamily: bodyFont,
            }}
          >
            {p.descriptionLong || p.description}
          </p>

          {/* 이미지 슬롯 1 */}
          {p.images?.[0] && (
            <div style={{ marginBottom: 40 }}>
              <img
                src={p.images[0]}
                alt={`${p.name} 매체 이미지`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* 차별점 */}
          {p.differentiator && (
            <div
              style={{
                borderLeft: `4px solid ${p.color}`,
                paddingLeft: 20,
                marginBottom: 40,
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  color: '#222',
                  lineHeight: 1.6,
                  fontFamily: headingFont,
                }}
              >
                {p.differentiator}
              </p>
            </div>
          )}

          {/* 인라인 스펙 태그 */}
          {(p.mediaType || p.adSpec || p.dailyExposure) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
              {p.mediaType && (
                <span
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    fontSize: 12,
                    color: '#333',
                    fontFamily: bodyFont,
                  }}
                >
                  {p.mediaType}
                </span>
              )}
              {p.adSpec && (
                <span
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    fontSize: 12,
                    color: '#333',
                    fontFamily: bodyFont,
                  }}
                >
                  {p.adSpec}
                </span>
              )}
              {p.dailyExposure && (
                <span
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    fontSize: 12,
                    color: '#333',
                    fontFamily: bodyFont,
                  }}
                >
                  {p.dailyExposure}
                </span>
              )}
            </div>
          )}

          {/* 퍼널 바 차트 */}
          {p.funnel && p.funnel.length > 0 && (
            <div style={{ marginBottom: 0 }}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  color: p.color,
                  marginBottom: 20,
                  fontFamily: bodyFont,
                  fontWeight: 700,
                }}
              >
                구매 결정 퍼널
              </p>
              {p.funnel.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      width: 56,
                      fontSize: 13,
                      color: '#555',
                      fontFamily: bodyFont,
                      flexShrink: 0,
                    }}
                  >
                    {step.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 8,
                      background: '#e5e5e5',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${step.percent}%`,
                        background: p.color,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: p.color,
                      fontFamily: bodyFont,
                      flexShrink: 0,
                      width: 48,
                      textAlign: 'right',
                    }}
                  >
                    {step.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════ Zone D: 특징 카드 + 가격표 ══════════ */}
      <section
        style={{
          background: '#fff',
          padding: 'clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              color: p.color,
              marginBottom: 28,
              fontFamily: bodyFont,
              fontWeight: 700,
            }}
          >
            주요 특징
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 0,
              marginBottom: 48,
            }}
          >
            {p.highlights.map((hl, i) => (
              <div
                key={i}
                style={{
                  padding: 'clamp(20px, 3vw, 32px)',
                  borderTop: `4px solid ${p.color}`,
                  borderRight: i % 2 === 0 ? '1px solid #e5e5e5' : 'none',
                  borderBottom: '1px solid #e5e5e5',
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#222',
                    marginBottom: 10,
                    fontFamily: bodyFont,
                  }}
                >
                  {hl.title}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: '#333',
                    lineHeight: 1.8,
                    fontFamily: bodyFont,
                  }}
                >
                  {hl.description}
                </p>
              </div>
            ))}
          </div>

          {/* 이미지 슬롯 2 */}
          {p.images?.[1] && (
            <div style={{ marginBottom: 48 }}>
              <img
                src={p.images[1]}
                alt={`${p.name} 상세 이미지`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* 가격/상품 테이블 */}
          {p.pricing && p.pricing.length > 0 && (
            <div style={{ marginBottom: 0 }}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  color: p.color,
                  marginBottom: 20,
                  fontFamily: bodyFont,
                  fontWeight: 700,
                }}
              >
                상품 라인업
              </p>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontFamily: bodyFont,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: p.colorLight || '#f5f5f5',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#333',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      상품
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: p.colorLight || '#f5f5f5',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#333',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      규격
                    </th>
                    <th
                      style={{
                        textAlign: 'right',
                        padding: '12px 16px',
                        background: p.colorLight || '#f5f5f5',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#333',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      가격
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.pricing.map((tier, i) => (
                    <tr key={i}>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#333',
                          fontWeight: 600,
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {tier.name}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: '#333',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {tier.spec}
                      </td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 13,
                          color: p.color,
                          fontWeight: 700,
                          textAlign: 'right',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {tier.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ Zone E: 포인트 + 커버리지 + CTA ══════════ */}
      <section
        style={{
          background: '#fafafa',
          padding: 'clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* 포인트 불릿 */}
          <div style={{ marginBottom: 40 }}>
            {p.points.map((point, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    background: p.color,
                    flexShrink: 0,
                    marginTop: 6,
                  }}
                />
                <p
                  style={{
                    fontSize: 14,
                    color: '#444',
                    lineHeight: 1.6,
                    fontFamily: bodyFont,
                  }}
                >
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* 이미지 슬롯 3, 4 (사례 이미지 2열) */}
          {(p.images?.[2] || p.images?.[3]) && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: p.images?.[3] ? '1fr 1fr' : '1fr',
                gap: 12,
                marginBottom: 40,
              }}
            >
              {p.images?.[2] && (
                <img
                  src={p.images[2]}
                  alt={`${p.name} 사례 이미지 1`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
              {p.images?.[3] && (
                <img
                  src={p.images[3]}
                  alt={`${p.name} 사례 이미지 2`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
            </div>
          )}

          {/* 광고 사례 */}
          {p.caseStudies && p.caseStudies.length > 0 && (
            <p
              style={{
                fontSize: 13,
                color: '#333',
                marginBottom: 16,
                fontFamily: bodyFont,
              }}
            >
              <span style={{ fontWeight: 700, color: '#444' }}>광고 사례</span>
              {'  '}
              {p.caseStudies.join(' · ')}
            </p>
          )}

          {/* 커버리지 */}
          {p.coverage && (
            <p
              style={{
                fontSize: 12,
                color: '#444',
                marginBottom: 48,
                fontFamily: bodyFont,
              }}
            >
              {p.coverage}
            </p>
          )}

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '14px 40px',
                background: p.color,
                color: '#fff',
                fontSize: 15,
                textDecoration: 'none',
                letterSpacing: '0.05em',
                fontFamily: headingFont,
              }}
            >
              광고 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
