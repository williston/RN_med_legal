'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

const feedbackSchema = z.object({
  message: z.string().min(10, 'Feedback must be at least 10 characters'),
})

type FeedbackFormData = z.infer<typeof feedbackSchema>

interface FeedbackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema)
  })

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Feedback User',
          email: 'feedback@rnsync.com',
          subject: 'New Feedback Submission',
          message: data.message,
          department: 'feedback'
        }),
      })

      if (!response.ok) throw new Error('Failed to send feedback')

      setSubmitStatus('success')
      reset()
      setTimeout(() => {
        onOpenChange(false)
        setSubmitStatus(null)
      }, 2000)
    } catch (error) {
      console.error('Feedback form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you for your feedback!</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>Failed to send feedback. Please try again.</span>
            </div>
          )}

          <div className="space-y-1">
            <textarea
              {...register('message')}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Tell us what you think..."
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 rounded-lg font-semibold text-white 
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
                Send Feedback
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}