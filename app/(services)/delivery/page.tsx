import { services } from '@/data/services'
import { deliveryCategories } from '@/data/delivery-services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import MediaContentLayout from '@/components/service/MediaContentLayout'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '배달플랫폼 마케팅 | 위즈더플래닝',
  description: '배달 매출을 끝까지 책임. 배민, 요기요, 쿠팡이츠 통합 관리.',
}

export default function DeliveryPage() {
  const service = services.find((s) => s.id === 'delivery')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} title="배달 통합 관리 서비스" />
      <MediaContentLayout media={service.media!} categories={deliveryCategories} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
