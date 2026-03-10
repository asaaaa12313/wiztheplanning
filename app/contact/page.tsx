import ContactSection from '@/components/main/ContactSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '문의/상담 | 위즈더플래닝',
  description: '마케팅 고민을 지금 바로 상담하세요. 1670-0704',
}

export default function ContactPage() {
  return (
    <div
      style={{
        paddingTop: 56,
        minHeight: '100vh',
        fontFamily: 'var(--font-noto-sans-kr), sans-serif',
      }}
    >
      <ContactSection />
    </div>
  )
}
