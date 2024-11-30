"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Mic, Square, Pause, Play } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface VoiceRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
  onRecordingStart?: () => void;
}

export function VoiceRecorder({ onAudioRecorded, onRecordingStart }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timer, setTimer] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // VoiceRecorder.tsx
const startRecording = useCallback(async () => {
  try {
    onRecordingStart?.();
    
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      }
    });
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    let mimeType;

    if (isIOS) {
      if (MediaRecorder.isTypeSupported('audio/mp4;codecs=mp4a.40.2')) {
        mimeType = 'audio/mp4;codecs=mp4a.40.2';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else {
        mimeType = 'audio/mp4';
      }
    } else {
      mimeType = 'audio/webm';
    }

    console.log('Using MIME type:', mimeType);

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      audioBitsPerSecond: 128000
    });
    
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const finalBlob = new Blob(audioChunksRef.current, { type: mimeType });
      
      // Create a named file with explicit mp4 extension for iOS
      const fileName = isIOS ? 'recording.mp4' : 'recording.webm';
      const file = new File([finalBlob], fileName, {
        type: mimeType,
        lastModified: Date.now()
      });
      
      console.log('Created file:', { name: file.name, type: file.type, size: file.size });
      onAudioRecorded(file);
    };

    mediaRecorder.start(1000); // Smaller chunks for iOS
    setIsRecording(true);
    setIsPaused(false);
  } catch (error: unknown) {
    console.error('Recording error:', error);
    alert('Recording error: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}, [onAudioRecorded, onRecordingStart]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
    }
  }, [])
 
  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      setTimer(0)

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }, [])

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const togglePause = () => {
    if (isPaused) {
      resumeRecording()
    } else {
      pauseRecording()
    }
  }

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRecording, isPaused])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const MAX_RECORDING_TIME = 300 // 5 minutes in seconds

  useEffect(() => {
    if (timer >= MAX_RECORDING_TIME) {
      stopRecording()
      toast.error('Maximum recording time reached')
    }
  }, [timer, stopRecording])

  return (
    <div>
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold text-yellow-800">Important Notice</h3>
        <p className="text-sm text-yellow-700">
          This tool is for educational and training purposes only. 
          DO NOT include any patient identifiers or protected health information:
          • No names, ages, or dates of birth
          • No room numbers or locations
          • No specific medical record details
          • No unique identifying characteristics
        </p>
      </div>
      <div className="flex flex-col items-center space-y-4 p-6 bg-blue-50 rounded-lg shadow-md">
        {isRecording && (
          <div className="text-3xl font-bold text-teal-600" aria-live="polite">
            {formatTime(timer)}
          </div>
        )}
        <div className="flex items-center space-x-6">
          <button 
            onClick={toggleRecording}
            className={cn(
              "w-16 h-16 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-offset-2",
              isRecording 
                ? "bg-red-500 hover:bg-red-600 focus:ring-red-300" 
                : "bg-teal-500 hover:bg-teal-600 focus:ring-teal-300",
              "transition-all duration-300 ease-in-out transform hover:scale-105",
              "rounded-tl-2xl rounded-br-2xl shadow-lg",
              "border-4 border-white"
            )}
            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>
          <span className="text-lg font-medium text-teal-700">
            {isRecording ? "End" : "Start"}
          </span>

          {isRecording && (
            <button 
              onClick={togglePause}
              className={cn(
                "w-12 h-12 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-300",
                "bg-blue-400 hover:bg-blue-500",
                "transition-all duration-300 ease-in-out transform hover:scale-105",
                "rounded-full shadow-lg",
                "border-4 border-white"
              )}
              disabled={!isRecording}
              aria-label={isPaused ? "Resume Recording" : "Pause Recording"}
            >
              {isPaused ? (
                <Play className="w-6 h-6 text-white" />
              ) : (
                <Pause className="w-6 h-6 text-white" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}