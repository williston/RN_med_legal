'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NurseForm1 from '../../../components/NurseForm1';
import { NurseFormProps1 } from '../../../components/NurseForm1';
//import NurseForm2 from '../../nursing-form2/page';
//import NurseForm3 from '../../nursing-form3/page';
//import NurseForm4 from '../../nursing-form4/page';
import { useUser } from '@clerk/nextjs';

export default function PopulatedFormPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState<NurseFormProps1 | null>(null);
  const [template, setTemplate] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [filename, setFilename] = useState<string>('');
  const [isFilenameModalOpen, setIsFilenameModalOpen] = useState(false);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchFormData = async () => {
      const response = await fetch(`/api/store-form-data?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data.formData);
        setTemplate(data.template);
      } else {
        console.error('Failed to fetch form data');
      }
    };

    if (id) {
      fetchFormData();
    }
  }, [id]);

  if (!formData || !template) return <div>Loading...</div>;

  const handleFormDataUpdate = (newData: NurseFormProps1) => {
    setFormData(newData);
  };

  const handleSave = async (providedFilename: string) => {
    if (!user) return;
    
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // First, update the form data
      const updateResponse = await fetch(`/api/save-submission`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          formData,
          template,
          filename: providedFilename
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update form data');
      }

      // Then, save the user submission
      const submissionResponse = await fetch('/api/save-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          userName: user.fullName || user.username,
          userEmail: user.primaryEmailAddress?.emailAddress || '',
          formId: id,
          filename: providedFilename
        }),
      });

      if (!submissionResponse.ok) {
        throw new Error('Failed to save submission');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setIsFilenameModalOpen(false);
      setFilename('');
    } catch (error) {
      console.error('Error saving form:', error);
      setSaveError('Failed to save your form. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const FilenameModal = () => {
    const [inputValue, setInputValue] = useState(filename);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSave(inputValue);
    };
    // Stop propagation to prevent modal from closing when clicking inside
    const handleModalClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };
  
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setIsFilenameModalOpen(false)}
      >
        <div 
          className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
          onClick={handleModalClick}
        >
          <h2 className="text-xl font-bold mb-4">Save Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-2">
                Enter filename:
              </label>
              <input
                type="text"
                id="filename"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter filename"
                autoFocus
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFilenameModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`px-4 py-2 rounded-md text-white ${
                  inputValue.trim() ? 'bg-teal-500 hover:bg-teal-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderNurseForm = () => {
    switch (template) {
      case 1:
        return <NurseForm1 data={formData} onUpdate={handleFormDataUpdate} />;
      /* case 2:
        return <NurseForm2 data={formData} onUpdate={handleFormDataUpdate} />;
      case 3:
        return <NurseForm3 data={formData} onUpdate={handleFormDataUpdate} />;
      case 4:
        return <NurseForm4 data={formData} onUpdate={handleFormDataUpdate} />; */
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Save and Print Buttons */}
      <div className="print:hidden sticky top-4 z-50 flex flex-col gap-2 items-end px-4 mb-4">
        <button
          onClick={() => setIsFilenameModalOpen(true)}
          disabled={isSaving}
          className={`px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
            isSaving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-600'
          } text-white focus:outline-none focus:ring-4 focus:ring-teal-300`}
        >
          {isSaving ? (
            <>
              <span className="animate-spin mr-2">⌛</span>
              Saving...
            </>
          ) : (
            'Save Form'
          )}
        </button>

        <button
          onClick={() => window.print()}
          className="px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <span className="mr-2">🖨️</span>
          Print Form
        </button>
      </div>

      {/* Filename Modal */}
      {isFilenameModalOpen && <FilenameModal />}

      {/* Success Message */}
      {saveSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Form saved successfully!
          </div>
        </div>
      )}

      {/* Error Message */}
      {saveError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {saveError}
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="px-4">
        {renderNurseForm()}
      </div>
    </div>
  );
}