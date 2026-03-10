import type { Metadata } from 'next'
import { Noto_Sans_KR, Black_Han_Sans, Do_Hyeon, Jua, Gothic_A1, Gugi } from 'next/font/google'
import './globals.css'
import GNB from '@/components/layout/GNB'
import Footer from '@/components/layout/Footer'
import MobileCTA from '@/components/layout/MobileCTA'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

const blackHanSans = Black_Han_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-black-han-sans',
  display: 'swap',
})

const doHyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-do-hyeon',
  display: 'swap',
})

const jua = Jua({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-jua',
  display: 'swap',
})

const gothicA1 = Gothic_A1({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-gothic-a1',
  display: 'swap',
})

const gugi = Gugi({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gugi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '위즈더플래닝 | 모든 마케팅의 시작과 끝',
  description: '미디어, 퍼포먼스, 콘텐츠, 배달플랫폼, 타겟핏 마케팅부터 촬영/제작까지. 하나의 파트너가 전부 해결합니다.',
  keywords: '마케팅대행사, 네이버플레이스, 배달마케팅, 엘리베이터광고, 포커스미디어, 타운보드',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={[
        notoSansKR.variable,
        blackHanSans.variable,
        doHyeon.variable,
        jua.variable,
        gothicA1.variable,
        gugi.variable,
      ].join(' ')}
    >
      <body>
        <GNB />
        {children}
        <Footer />
        <MobileCTA />
      </body>
    </html>
  )
}
