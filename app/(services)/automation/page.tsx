import { services } from '@/data/services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '자동화 마케팅 | 위즈더플래닝',
  description: 'AI 기반 자동화로 마케팅 효율을 극대화합니다.',
}

export default function AutomationPage() {
  const service = services.find((s) => s.id === 'automation')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />

      {/* 콘텐츠 영역 (추후 내용 추가) */}
      <section
        style={{
          padding: '64px 24px',
          background: '#fff',
          minHeight: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            color: 'rgba(0,0,0,0.3)',
            fontSize: 14,
            letterSpacing: '0.2em',
            fontFamily: 'var(--font-noto-sans-kr), sans-serif',
          }}
        >
          COMING SOON
        </p>
      </section>

      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
