import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


///save user data and form data to database 
export async function POST(request: Request) {
  try {
    const { userId, userName, userEmail, formId, filename } = await request.json();

    if (!userId || !userName || !userEmail || !formId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const submission = await prisma.userFormSubmission.create({
      data: {
        userId,
        userName,
        userEmail,
        formId,
        filename,
      },
    });

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

//update saved data to database
export async function PUT(request: Request) {
    const { id, formData, template, filename } = await request.json();
    
    try {
      // Update both the FormData and any related UserFormSubmission records
      await prisma.$transaction([
        prisma.formData.update({
          where: { id },
          data: {
            formData: JSON.stringify(formData),
            template,
            filename,
          },
        }),
        prisma.userFormSubmission.updateMany({
          where: { formId: id },
          data: { filename },
        }),
      ]);
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error updating form data:', error);
      return NextResponse.json({ error: 'Failed to update form data' }, { status: 500 });
    }
  }