import type { Metadata } from 'next'
import PortfolioHero from '@/components/portfolio/PortfolioHero'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import ServiceCTA from '@/components/service/ServiceCTA'

export const metadata: Metadata = {
  title: '포트폴리오 | 위즈더플래닝',
  description: '위즈더플래닝의 마케팅 레퍼런스 아카이브. 배달, 네이버, SNS, 블로그, 체험단, 디자인, 컨텐츠 등 7개 영역의 성과를 확인하세요.',
}

export default function PortfolioPage() {
  return (
    <div
      style={{
        paddingTop: 56,
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'var(--font-noto-sans-kr), sans-serif',
      }}
    >
      <PortfolioHero />
      <PortfolioGrid />
      <ServiceCTA heroTitle="마케팅, 위즈더플래닝과 함께하세요" accent="#8B5CF6" />
    </div>
  )
}
