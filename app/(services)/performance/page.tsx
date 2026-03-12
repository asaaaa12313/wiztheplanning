import { services } from '@/data/services'
import { performanceCategories } from '@/data/performance-steps'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import MediaContentLayout from '@/components/service/MediaContentLayout'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '퍼포먼스 마케팅 | 위즈더플래닝',
  description: '검색 1위는 우연이 아닙니다. 네이버 플레이스, 파워링크, 블로그 SEO.',
}

export default function PerformancePage() {
  const service = services.find((s) => s.id === 'performance')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} title="5단계 프로세스" />
      <MediaContentLayout media={service.media!} categories={performanceCategories} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
