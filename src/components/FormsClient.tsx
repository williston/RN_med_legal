'use client'

import { formatDistance, format } from "date-fns";
import Link from "next/link";
import { FileText, Calendar, Clock, Trash2 } from 'lucide-react';

type Submission = {
  id: string;
  formId: string;
  filename: string;
  createdAt: Date;
};

export default function FormsClient({ submissions }: { submissions: Submission[] }) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission) => (
          <div key={submission.id} className="relative">
            <Link 
              href={`/populated-form/${submission.formId}`}
              className="block transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 rounded-lg"
            >
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 text-teal-600">
                    <FileText className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">{submission.filename}</h2>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p className="text-sm flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(submission.createdAt), 'PPP')}</span>
                    </p>
                    <p className="text-sm flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(submission.createdAt), 'pp')}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    Submitted {formatDistance(new Date(submission.createdAt), new Date(), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </Link>
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to delete this submission?')) {
                  try {
                    const response = await fetch(`/api/delete-form/${submission.id}`, {
                      method: 'DELETE',
                    });
                    if (response.ok) {
                      window.location.reload();
                    } else {
                      console.error('Failed to delete submission');
                    }
                  } catch (error) {
                    console.error('Error deleting submission:', error);
                  }
                }
              }}
              className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      
      {submissions.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center animate-fade-in-up">
          <p className="text-xl text-gray-500">No forms submitted yet.</p>
          <Link href="/" className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full hover:from-teal-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300">
            Create Your First Form
          </Link>
        </div>
      )}
    </>
  );
}