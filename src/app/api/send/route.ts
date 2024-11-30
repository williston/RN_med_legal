import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/email-template'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data = await request.json()
    const { name, email, subject, message, department } = data

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'Contact Form <rnsync.com>',
      to: ['rnsync.team@gmail.com'],
      subject: `New Contact Form Submission: ${subject}`,
      react: EmailTemplate({ 
        firstName: name,
        email,
        subject,
        message,
        department
      }),
    });

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}