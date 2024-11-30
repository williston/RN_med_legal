import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const submission = await prisma.userFormSubmission.delete({
      where: {
        id: params.id,
        userId: user.id, // Ensure the submission belongs to the user
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}