'use client'

import { useState } from 'react'
import { Caveat, Fredoka } from 'next/font/google'
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const caveat = Caveat({ subsets: ['latin'] })
const fredoka = Fredoka({ subsets: ['latin'] })

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  department: z.enum(['general', 'technical', 'billing', 'other'])
})

type ContactFormData = z.infer<typeof contactSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setSubmitStatus('success')
      reset() // Clear form
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 ${fredoka.className}`}>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl font-bold text-teal-700 mb-4 ${caveat.className}`}>
              Get in Touch
            </h1>
            <p className="text-gray-600">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <ContactInfo 
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                details="rnsync@gmail.com"
                //link="mailto:support@sbarvoice.com"
              />
            </div>

            {/* Contact Form */}
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="md:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6"
            >
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message sent successfully! We&apos;ll be in touch soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>Failed to send message. Please try again later.</span>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Name"
                  error={errors.name?.message}
                >
                  <input
                    {...register('name')}
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                  />
                </FormField>

                <FormField
                  label="Email"
                  error={errors.email?.message}
                >
                  <input
                    {...register('email')}
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                  />
                </FormField>
              </div>

              <FormField
                label="Department"
                error={errors.department?.message}
              >
                <select
                  {...register('department')}
                  className="form-select"
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing</option>
                  <option value="other">Other</option>
                </select>
              </FormField>

              <FormField
                label="Subject"
                error={errors.subject?.message}
              >
                <input
                  {...register('subject')}
                  type="text"
                  className="form-input"
                  placeholder="What's this about?"
                />
              </FormField>

              <FormField
                label="Message"
                error={errors.message?.message}
              >
                <textarea
                  {...register('message')}
                  rows={4}
                  className="form-textarea"
                  placeholder="Your message..."
                />
              </FormField>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-semibold text-white 
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
                  } transition-all duration-300 flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

function ContactInfo({ 
  icon, 
  title, 
  details, 
  link 
}: { 
  icon: React.ReactNode
  title: string
  details: string
  link?: string
}) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
      <div className="text-teal-600">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{details}</p>
      </div>
    </div>
  )

  if (link) {
    return <a href={link} className="block">{content}</a>
  }

  return content
}

function FormField({ 
  label, 
  error, 
  children 
}: { 
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}