import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MessageSquare, Mail, Share } from 'lucide-react'

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (method: 'text' | 'email' | 'airdrop') => void;
}

export function SendModal({ isOpen, onClose, onSend }: SendModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Send Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            onClick={() => onSend('text')} 
            className="flex items-center justify-start bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Send via Text
          </Button>
          <Button 
            onClick={() => onSend('email')} 
            className="flex items-center justify-start bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send via Email
          </Button>
          <Button 
            onClick={() => onSend('airdrop')} 
            className="flex items-center justify-start bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            <Share className="mr-2 h-4 w-4" />
            Send via AirDrop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}