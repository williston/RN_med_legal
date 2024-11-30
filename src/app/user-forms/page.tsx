import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Fredoka } from 'next/font/google';

interface Submission {
  id: string;
  formId: string;
  filename: string;
  createdAt: Date;
}

const fredoka = Fredoka({ subsets: ['latin'] });

import FormsClient from '../../components/FormsClient';

export default async function MyFormsPage() {
  const user = await currentUser();
  const userId = user?.id;
  
  if (!userId) {
    redirect("/sign-in");
  }

  const submissions = await prisma.userFormSubmission.findMany({
    where: {
      userId: userId,
    },
    include: {
      formData: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 ${fredoka.className}`}>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-teal-700 text-center animate-fade-in-down">Saved SBAR Forms</h1>
        <FormsClient submissions={submissions as Submission[]} />
      </div>
    </div>
  );
}