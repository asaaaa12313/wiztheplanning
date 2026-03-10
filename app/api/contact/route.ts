import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, phone, store, message, type, industry } = await req.json()

    const subject = type === '견적서'
      ? `[견적서/제안서 요청] ${store || name}`
      : `[무료상담신청] ${store || name}`

    const industryLine = industry ? `업종: ${industry}\n` : ''
    const text = `이름: ${name}\n연락처: ${phone}\n가게명: ${store}\n${industryLine}\n문의사항:\n${message}`

    const { error } = await resend.emails.send({
      from: 'WizThePlanning <onboarding@resend.dev>',
      to: 'qpqpqp@wiztheplanning.com',
      subject,
      text,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
