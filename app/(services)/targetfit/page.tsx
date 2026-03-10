import { services } from '@/data/services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import ServiceFeatures from '@/components/service/ServiceFeatures'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '타겟핏 마케팅 | 위즈더플래닝',
  description: '데이터 기반 정밀 타깃팅. 연령·성별·관심사 맞춤 광고.',
}

export default function TargetfitPage() {
  const service = services.find((s) => s.id === 'targetfit')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} />
      <ServiceFeatures features={service.features} accent={service.accent} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
