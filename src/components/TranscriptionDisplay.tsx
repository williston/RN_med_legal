import { Textarea } from '@/components/ui/textarea'
import { FileText, X, InfoIcon } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TranscriptionDisplayProps {
  transcription: string;
  onTranscriptionChange: (transcription: string) => void;
}

export function TranscriptionDisplay({ transcription, onTranscriptionChange }: TranscriptionDisplayProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const helpText = {
    recording: 'Click to start recording your verbal report',
    template: 'Select the appropriate form template for your needs',
    analysis: 'AI will structure your recording into the selected template'
  }

  const handleMouseEnter = () => {
    if (!hasShown) {
      setShowPopup(true);
      setHasShown(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        handleClosePopup();
      }, 5000);
    }
  };

  const handleClosePopup = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsExiting(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 mt-6 relative">
      <div className="relative">
        <div 
          className="flex items-center mb-4 hover:opacity-80 transition-opacity duration-200 w-fit"
          onMouseEnter={handleMouseEnter}
        >
          <FileText className="w-6 h-6 text-blue-700 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Legal Documentation Record</h2>
        </div>

        {/* Popup */}
        {showPopup && (
          <div 
            className={`absolute top-full left-0 mt-2 bg-white rounded-md shadow-md 
              border border-gray-200 w-80 z-50 transition-all duration-300 ease-in-out ${
                isExiting 
                  ? 'opacity-0 transform -translate-y-2' 
                  : 'opacity-100 transform translate-y-0'
              }`}
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-teal-50 
                transition-colors duration-200 text-teal-600 hover:text-teal-700"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="bg-teal-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-teal-700 mb-2">
                Assessment Instructions
              </h3>
              <p className="font-serif text-lg text-gray-500">
                Record your assessment using the recorder above or type/copy paste in your nursing assessment.
              </p>
            </div>
          </div>
        )}
      </div>

      <Textarea
        value={transcription}
        onChange={(e) => onTranscriptionChange(e.target.value)}
        className="w-full min-h-[12rem] p-4 border border-gray-200 rounded-md font-sans text-base text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 ease-in-out"
        placeholder="Enter or edit your documentation here..."
      />
      <div className="absolute bottom-3 right-3 text-sm text-gray-400">
        {transcription.length} characters
      </div>

      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>
            <InfoIcon className="w-4 h-4 text-gray-400" />
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content className="bg-white p-2 rounded shadow-lg">
            {helpText.recording}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </div>
  )
}