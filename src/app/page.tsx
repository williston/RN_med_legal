// pages/index.tsx
'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'
import { Wand2 } from 'lucide-react'
import { VoiceRecorder } from '../components/VoiceRecorder'
import { TranscriptionDisplay } from '@/components/TranscriptionDisplay'
import { TemplateSelector } from '@/components/TemplateSelector'
import { useUser } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { toast } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  const [transcription, setTranscription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAudioRecorded = useCallback(async (audioBlob: Blob) => {
    const formData = new FormData();
    console.log('Sending audio blob type:', audioBlob.type);
    console.log('Sending audio blob size:', audioBlob.size);
    
    formData.append('file', audioBlob, audioBlob.type.includes('mp4') ? 'audio.mp4' : 'audio.webm');
  
    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Transcription failed:', data);
        alert(`Transcription failed: ${data.details?.message || 'Unknown error'}`);
        return;
      }
  
      console.log('Transcription successful:', data);
      setTranscription(data.transcription);
    } catch (error) {
      toast.error('Failed to transcribe audio')
    }
  }, []);

  const handleTranscriptionChange = useCallback((newTranscription: string) => {
    setTranscription(newTranscription)
  }, [])

  const handleTemplateSelect = useCallback((templateId: number) => {
    setSelectedTemplate(templateId)
  }, [])

  const handleRecordingStart = useCallback(() => {
    setTranscription(''); // Clear the transcription when recording starts
  }, []);

  const handleAnalyzeTranscription = useCallback(async () => {
    if (!transcription || selectedTemplate !== 1) return

    setIsAnalyzing(true)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcription: transcription,
          formType: 'nurseForm1'
        }),
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      
      const storeResponse = await fetch('/api/store-form-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data,
          template: selectedTemplate
        }),
      })

      if (!storeResponse.ok) throw new Error('Failed to store form data')

      const { id } = await storeResponse.json()

      router.push(`/populated-form/${id}`)
    } catch (error) {
      console.error('Content generation error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [transcription, selectedTemplate, router])



  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${inter.className}`}>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {user && (
            <h2 className="text-2xl mb-4 text-gray-700 text-center font-medium animate-fade-in-down">
              Welcome, {user.firstName || user.username || 'User'}
            </h2>
          )}
          <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center animate-fade-in-up">Legal Documentation Assistant</h1>
          <p className="text-gray-600 mb-8 text-center">
            Secure and accurate documentation for legal nursing records. 
            All entries are time-stamped and stored securely.
          </p>
          <div className="space-y-8">
            <VoiceRecorder 
              onAudioRecorded={handleAudioRecorded}
              onRecordingStart={handleRecordingStart}
            />
            <TranscriptionDisplay 
              transcription={transcription}
              onTranscriptionChange={handleTranscriptionChange}
            />
            <TemplateSelector 
              onTemplateSelect={handleTemplateSelect}
            />
            <div className="flex justify-center">
              <button 
                onClick={handleAnalyzeTranscription}
                className={`px-6 py-3 rounded-md flex items-center justify-center transition-all duration-300 ${
                  selectedTemplate === 1 && !isAnalyzing
                    ? 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={selectedTemplate !== 1 || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : selectedTemplate !== 1 ? (
                  <>
                    <Wand2 className="mr-2 animate-pulse" />
                    Analyze Transcription
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 animate-pulse" />
                    Analyze Transcription
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
