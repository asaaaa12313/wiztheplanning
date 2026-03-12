import { services } from '@/data/services'
import { automationCategories } from '@/data/automation-services'
import ServiceHero from '@/components/service/ServiceHero'
import ServiceTags from '@/components/service/ServiceTags'
import MediaContentLayout from '@/components/service/MediaContentLayout'
import ServiceCTA from '@/components/service/ServiceCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '자동화 마케팅 | 위즈더플래닝',
  description: 'AI가 콘텐츠를 만들고, 올리고, 분석까지. 복잡한 마케팅을 가장 단순하게.',
}

export default function AutomationPage() {
  const service = services.find((s) => s.id === 'automation')!
  return (
    <div style={{ fontFamily: service.font, minHeight: '100vh' }}>
      <ServiceHero service={service} />
      <ServiceTags tags={service.tags} title="AI 자동화 마케팅" />
      <MediaContentLayout
        media={service.media!}
        categories={automationCategories}
        externalLinks={[
          { label: '위플', href: 'https://www.wizpp.com/', sublabel: '소상공인 AI 마케팅' },
          { label: '위플학원', href: 'https://www.wizhw.com/', sublabel: '학원 AI 마케팅' },
        ]}
      />
      <ServiceCTA heroTitle={service.heroTitle} accent={service.accent} />
    </div>
  )
}
