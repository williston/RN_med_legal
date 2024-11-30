import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { formData, template, filename } = await request.json();
  const id = uuidv4();
  
  try {
    const data = await prisma.formData.create({
      data: {
        id,
        formData: JSON.stringify(formData),
        template,
        filename: filename || null,
      },
    });
    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error('Error storing form data:', error);
    return NextResponse.json({ error: 'Failed to store form data' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }
  
  try {
    const data = await prisma.formData.findUnique({ where: { id } });
    if (!data) {
      return NextResponse.json({ error: 'Form data not found' }, { status: 404 });
    }
    return NextResponse.json({ formData: JSON.parse(data.formData), template: data.template });
  } catch (error) {
    console.error('Error retrieving form data:', error);
    return NextResponse.json({ error: 'Failed to retrieve form data' }, { status: 500 });
  }
}
