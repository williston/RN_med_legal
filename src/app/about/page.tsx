'use client'

import { Inter } from 'next/font/google'
import { Stethoscope, Mic, FileText, Brain, Shield } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <div className={`min-h-screen bg-slate-50 ${inter.className}`}>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Legal Documentation Assistant
            </h1>
            <p className="text-lg text-gray-600">
              Secure and accurate documentation for legal nursing records
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Mic className="w-8 h-8 text-blue-700" />}
              title="Voice-to-Text Documentation"
              description="Efficiently create legal documentation using voice recording technology."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-700" />}
              title="AI-Powered Analysis"
              description="Advanced processing ensures accurate and structured legal documentation."
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-blue-700" />}
              title="Legal Templates"
              description="Standardized formats ensuring compliance with legal requirements."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-700" />}
              title="Secure & Compliant"
              description="" //HIPAA-compliant platform with robust security measures.
            />
          </div>

          <div className="bg-white rounded-md border border-gray-200 shadow-sm p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Documentation Process</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 mr-4">1</span>
                <p>Record your patient report using the voice recorder</p>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 mr-4">2</span>
                <p>Select your preferred documentation template</p>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 mr-4">3</span>
                <p>AI analyzes your recording and structures the information</p>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 mr-4">4</span>
                <p>Review and edit the generated documentation</p>
              </li>
            </ol>
          </div>

          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Key Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <BenefitCard title="Legal Compliance" description="Ensures documentation meets legal standards" />
              <BenefitCard title="Time Efficiency" description="Streamlined documentation process" />
              <BenefitCard title="Risk Management" description="Reduces documentation errors and liability" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
      <div className="flex items-center space-x-4 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-teal-700">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function BenefitCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-teal-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-teal-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}