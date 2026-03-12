import { services } from '@/data/services'
import { mediaCategories } from '@/data/media-partners'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import MediaContentLayout from '@/components/service/MediaContentLayout'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '미디어 마케팅 | 위즈더플래닝',
  description: '엘리베이터TV부터 영화관 스크린까지. 오프라인 미디어의 모든 것을 한 곳에서.',
}

export default function MediaPage() {
  const service = services.find((s) => s.id === 'media')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} title="전체 공식대행사" />
      <MediaContentLayout media={service.media!} categories={mediaCategories} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
