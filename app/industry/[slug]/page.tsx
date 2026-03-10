import { industries } from '@/data/industries'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return industries.map((industry) => ({
    slug: encodeURIComponent(industry.name),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const industry = industries.find((i) => encodeURIComponent(i.name) === slug)
  return {
    title: `${industry?.name ?? '업종별 큐레이션'} | 위즈더플래닝`,
  }
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = industries.find((i) => encodeURIComponent(i.name) === slug)

  if (!industry) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <p>업종을 찾을 수 없습니다.</p>
        <Link href="/">← 메인으로</Link>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 56, minHeight: '100vh', fontFamily: 'var(--font-noto-sans-kr), sans-serif' }}>
      <section
        style={{
          padding: '80px 24px',
          background: '#fff',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ maxWidth: 700 }}>
          <p
            style={{
              color: 'rgba(0,0,0,0.5)',
              fontSize: 10,
              letterSpacing: '0.3em',
              marginBottom: 16,
              fontFamily: 'var(--font-gothic-a1), sans-serif',
            }}
          >
            INDUSTRY SOLUTION
          </p>
          <h1
            style={{
              color: '#111',
              fontSize: 'clamp(36px,6vw,64px)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {industry.name}
          </h1>
          <p
            style={{
              color: 'rgba(0,0,0,0.6)',
              fontSize: 14,
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
            }}
          >
            {industry.copy}
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 24 }}>
            추천 서비스
          </h2>
          <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7 }}>{industry.services}</p>
        </div>
      </section>
    </div>
  )
}
