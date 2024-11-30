'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Inter } from 'next/font/google'
import { 
  Clock, 
  Shield, 
  CheckCircle2, 
  FileText, 
  Brain 
} from 'lucide-react'
import { SignInButton } from "@clerk/nextjs"
import Image from 'next/image'
import nursingimage from '../../public/images/nursingimage.png'

const inter = Inter({ subsets: ['latin'] })

export default function Landing() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  return (
    <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Professional Legal Documentation
              <span className="block text-blue-700">
                for Healthcare Providers
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Secure, accurate, and efficient documentation system designed for legal nursing records.
            </p>
            <div className="flex gap-4">
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-offset-2">
                  Start Free Trial
                </button>
              </SignInButton>
              <button 
                onClick={() => router.push('/about')}
                className="px-8 py-4 border-2 border-teal-500 text-teal-700 rounded-full font-semibold text-lg hover:bg-teal-50 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Training Environment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Instant Feedback</span>
              </div>
            </div>
          </div>
          
          {/* Product Preview */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-6 transform rotate-2">
              <Image 
                src={nursingimage}
                alt="SBAR Voice Assistant Interface"
                width={600}
                height={400}
                className="rounded-lg"
                priority
              />

            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <h2 className="text-3xl font-bold text-teal-700">
              Practice Makes Perfect
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Clock />}
                title="Safe Learning"
                description="Practice SBAR without using real patient information"
              />
              <FeatureCard 
                icon={<FileText />}
                title="Structured Feedback"
                description="Get instant analysis of your SBAR format and content"
              />
              <FeatureCard 
                icon={<Brain />}
                title="AI-Powered Learning"
                description="Receive smart suggestions to improve your communication"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-teal-700 mb-12">
              Loved by Nursing Students & Educators
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard 
                quote="Perfect for practicing SBAR before clinical rotations. It helped build my confidence in giving handoff reports."
                author="Sarah K."
                role="Nursing Student"
              />
              <TestimonialCard 
                quote="An excellent tool for teaching structured communication. Students can practice repeatedly in a safe environment."
                author="Michael R."
                role="Clinical Nursing Instructor"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white space-y-8">
            <h2 className="text-3xl font-bold">Join Our Educational Beta Program</h2>
            <p className="text-xl">
              Perfect for nursing schools and healthcare education programs. Get special academic pricing during our beta period.
            </p>
            <form className="flex gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-gray-500 text-sm">
              © 2024 SBAR Voice Assistant. All rights reserved.
            </div>
            <div className="flex gap-8 text-gray-500">
              <a href="/privacy" className="hover:text-teal-600">Privacy Policy</a>
              <a href="/terms" className="hover:text-teal-600">Terms of Service</a>
              <a href="/contact" className="hover:text-teal-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <div className="text-center space-y-4">
      <div className="w-12 h-12 mx-auto text-teal-500 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-semibold text-xl text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: {
  quote: string,
  author: string,
  role: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">&ldquo;{quote}&rdquo;</p>
      <div>
        <div className="font-semibold text-teal-700">{author}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  )
}





/* This landing page:

1. Has a clear value proposition focused on saving nurses' time with voice-based documentation

2. Includes multiple CTAs:
   - Primary: "Start Free Trial" (using Clerk auth)
   - Secondary: "Learn More" and waitlist signup

3. Shows the problem/solution through three key benefits:
   - Time savings
   - Structured format
   - AI accuracy

4. Incorporates social proof through nurse testimonials

5. Features a lead capture form in the early access section

6. Includes a product preview image (you'll need to add this)

7. Shows trust indicators:
   - HIPAA compliance badge
   - Uptime guarantee
   - Privacy policy/terms links

8. Uses urgency through the early access program offer

9. Maintains the app's existing design language:
   - Same fonts (Fredoka/Caveat)
   - Consistent color scheme
   - Similar UI components

Note: You'll need to:
1. Add an actual product preview image
2. Set up the waitlist form functionality
3. Create privacy/terms/contact pages
4. Add actual testimonials when available
5. Verify HIPAA compliance before claiming it */