import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface GeneratedContentProps {
  generatedImage: string | null;
  onPreview: () => void;
  onSend: () => void;
}

export function GeneratedContent({ generatedImage, onPreview, onSend }: GeneratedContentProps) {
  if (!generatedImage) {
    return null
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex-shrink-0">
        <Image 
          src={generatedImage} 
          alt="Generated Image" 
          width={200}
          height={200}
          className="w-full md:w-[200px] h-[200px] object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <Button onClick={onPreview} className="w-full mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300">
          Preview
        </Button>
        <Button onClick={onSend} variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
          Send
        </Button>
      </div>
    </div>
  )
}