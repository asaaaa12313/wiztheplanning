import { services } from '@/data/services'
import { targetfitCategories } from '@/data/targetfit-services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import MediaContentLayout from '@/components/service/MediaContentLayout'
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
      <ServiceTags tags={service.tags} title="타겟핏 마케팅 서비스" />
      <MediaContentLayout media={service.media!} categories={targetfitCategories} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
