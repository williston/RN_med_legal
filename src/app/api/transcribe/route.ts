// api/transcribe/route.ts
import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'Invalid file format' }, { status: 400 });
    }

    // Log the incoming file details
    console.log('Received file:', {
      type: file.type,
      size: file.size
    });

    const audioBuffer = await file.arrayBuffer();
    
    // Keep the original file type from the recorder
    const audioFile = new File([audioBuffer], 'audio.mp4', {
      type: file.type, // Preserve the original MIME type
      lastModified: Date.now()
    });

    console.log('Sending file to OpenAI:', {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size
    });

    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
      response_format: 'json',
    });

    return NextResponse.json({ transcription: response.text.trim() });
  } catch (error) {
    console.error('Transcription error:', error);
    
    // Send detailed error information
    return NextResponse.json({
      error: 'Transcription failed',
      details: {
        message: error instanceof Error ? error.message : 'Unknown error',
         // @ts-expect-error OpenAI error object includes type
        type: error.type || 'unknown',
         // @ts-expect-error OpenAI error object includes type
        status: error.status || 500
      }
    }, { status: 500 });
  }
}