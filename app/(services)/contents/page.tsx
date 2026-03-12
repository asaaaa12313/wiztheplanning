import { services } from '@/data/services'
import { contentsCategories } from '@/data/contents-services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import MediaContentLayout from '@/components/service/MediaContentLayout'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '콘텐츠 마케팅 | 위즈더플래닝',
  description: '진짜 고객이 쓰는 진짜 리뷰. 브랜드블로그, 체험단, SNS 운영.',
}

export default function ContentsPage() {
  const service = services.find((s) => s.id === 'contents')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} title="콘텐츠 마케팅 서비스" />
      <MediaContentLayout media={service.media!} categories={contentsCategories} />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
