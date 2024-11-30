import { useState } from 'react'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { FileCheck } from 'lucide-react'
import nurseForm1 from '../public/images/nurseform1.png'
import nurseForm2 from '../public/images/nurseform2.jpeg'
import nurseForm3 from '../public/images/nurseform3.png'
import nurseForm4 from '../public/images/nurseform4.jpeg'

interface Template {
  id: number;
  name: string;
  thumbnail: StaticImageData;
}

const templates: Template[] = [
  { id: 1, name: 'nurseForm1', thumbnail: nurseForm1 },
  { id: 2, name: 'nurseForm2', thumbnail: nurseForm2 },
  { id: 3, name: 'nurseForm3', thumbnail: nurseForm3 },
  { id: 4, name: 'nurseForm4', thumbnail: nurseForm4 },
]

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: number) => void;
}

export function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId)
    onTemplateSelect(templateId)
  }

  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center mb-4">
        <FileCheck className="w-6 h-6 text-teal-600 mr-2" />
        <h2 className="text-2xl font-bold text-teal-700">Select Practice Scenario</h2>
      </div>
      <p className="text-lg text-gray-600 mb-4">Please choose a template nursing form:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`relative aspect-square bg-white rounded-tl-2xl rounded-br-2xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 ease-in-out transform hover:scale-105 ${
              selectedTemplate === template.id ? 'ring-4 ring-teal-500' : 'ring-4 ring-white'
            }`}
            aria-label={`Select template ${template.name}`}
            aria-pressed={selectedTemplate === template.id}
          >
            <div className="w-full h-full overflow-hidden">
              <Image 
                src={template.thumbnail}
                alt={template.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedTemplate === template.id && (
  template.id === 1 ? (
    <div className="absolute inset-0 bg-teal-500 bg-opacity-50 flex items-center justify-center">
      <FileCheck className="w-12 h-12 text-white" />
    </div>
  ) : (
    <div className="absolute inset-0 bg-teal-500 text-white text-lg font-bold bg-opacity-50 flex items-center justify-center">
      Coming soon
    </div>
  )
)}
          </button>
        ))}
      </div>
    </div>
  )
}