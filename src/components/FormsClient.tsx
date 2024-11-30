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
              className="block transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md"
            >
              <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm hover:border-blue-300">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <FileText className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">{submission.filename}</h2>
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
                  <p className="text-sm text-gray-500">
                    Created {formatDistance(new Date(submission.createdAt), new Date(), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </Link>
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to delete this legal document?')) {
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
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      
      {submissions.length === 0 && (
        <div className="bg-white p-8 rounded-md border border-gray-200 shadow-sm text-center">
          <p className="text-lg text-gray-600">No legal documents created yet.</p>
          <Link href="/" className="mt-4 inline-block px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Create New Document
          </Link>
        </div>
      )}
    </>
  );
}