import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewImage: string | null;
}

export function PreviewModal({ isOpen, onClose, previewImage }: PreviewModalProps) {
  if (!previewImage) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] bg-white rounded-lg shadow-lg p-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Button 
            onClick={onClose} 
            className="absolute top-2 right-2 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </Button>
          <Image 
            src={previewImage} 
            alt="Preview of Generated Image" 
            layout="responsive"
            width={1000}
            height={1000}
            objectFit="contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}