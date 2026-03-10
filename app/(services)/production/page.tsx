import { services } from '@/data/services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import ServiceFeatures from '@/components/service/ServiceFeatures'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '촬영/제작 | 위즈더플래닝',
  description: '전문가의 손길로 만드는 콘텐츠. 매장 촬영, 숏폼 영상, 메뉴판.',
}

export default function ProductionPage() {
  const service = services.find((s) => s.id === 'production')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} />
      <ServiceFeatures features={service.features} accent={service.accent} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
