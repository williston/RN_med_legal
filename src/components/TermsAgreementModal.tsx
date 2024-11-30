'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const TERMS_VERSION = '1.0.0'
const TERMS_REACCEPT_DAYS = 90

export function TermsAgreementModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check for version mismatch and agreement expiration
    const agreedVersion = localStorage.getItem('termsVersion')
    const agreedDate = localStorage.getItem('termsAgreedDate')
    
    if (!agreedVersion || agreedVersion !== TERMS_VERSION) {
      // New version or first visit
      setIsOpen(true)
      return
    }

    if (agreedDate) {
      const daysSinceAgreed = (Date.now() - new Date(agreedDate).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceAgreed > TERMS_REACCEPT_DAYS) {
        // Agreement expired
        setIsOpen(true)
        return
      }
    }
  }, [])

  const handleAgree = () => {
    // Store both version and date
    localStorage.setItem('termsVersion', TERMS_VERSION)
    localStorage.setItem('termsAgreedDate', new Date().toISOString())
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-teal-700">Terms of Use Agreement</h2>
          </div>

          <div className="prose prose-sm">
            <p className="font-semibold text-red-600">
              Important: This is a training tool only. Do not enter real patient information.
            </p>

            <h3>Educational Purpose</h3>
            <p>
              This application is designed exclusively for educational and training purposes,
              allowing healthcare professionals to practice SBAR communication techniques
              using simulated scenarios only.
            </p>

            <h3>Key Agreements</h3>
            <ul>
              <li>I will not enter any real patient information</li>
              <li>I will use only simulated or fictional scenarios</li>
              <li>I understand this is a training tool, not for actual documentation</li>
              <li>I will comply with all privacy and confidentiality requirements</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              href="/terms"
              className="text-sm text-teal-600 hover:text-teal-700"
              target="_blank"
            >
              Read full Terms of Use
            </Link>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Decline &apos;n Exit
              </button>
              <button
                onClick={handleAgree}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                I Agree & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}