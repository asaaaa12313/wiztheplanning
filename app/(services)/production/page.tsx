import { services } from '@/data/services'
import { productionCategories } from '@/data/production-services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import MediaContentLayout from '@/components/service/MediaContentLayout'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '촬영/디자인제작 | 위즈더플래닝',
  description: '전문가의 손길로 만드는 콘텐츠. 매장 촬영, 숏폼 영상, 메뉴판.',
}

export default function ProductionPage() {
  const service = services.find((s) => s.id === 'production')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} title="촬영/디자인제작 서비스" />
      <MediaContentLayout media={service.media!} categories={productionCategories} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
