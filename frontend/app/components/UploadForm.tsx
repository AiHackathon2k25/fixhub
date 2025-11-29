'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface UploadFormProps {
  onAnalyze: (description: string, files: File[]) => Promise<void>;
  isLoading: boolean;
}

export default function UploadForm({ onAnalyze, isLoading }: UploadFormProps) {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ description?: string; file?: string }>({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setFiles(fileArray);
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (e.target.value.length >= 5) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const newErrors: { description?: string; file?: string } = {};

    if (files.length === 0) {
      newErrors.file = 'Please select at least one image file';
    }

    if (description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call the parent handler
    await onAnalyze(description, files);
    
    // Clear form after successful submission
    setDescription('');
    setFiles([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📸</span>
        New Claim Submission
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-slate-700 mb-2">
            Upload Images of Damaged Item * (Multiple files allowed)
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-900 border-2 border-slate-300 rounded-lg cursor-pointer bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 p-3 hover:border-teal-400 transition-colors"
            disabled={isLoading}
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
          )}
          
          {/* Display selected files */}
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-slate-700">Selected files ({files.length}):</p>
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 text-sm">
                    <span className="text-teal-700 truncate max-w-[200px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 font-bold"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the damage... (e.g., 'dishwasher door fell off', 'phone screen cracked')"
            className="block w-full text-sm text-slate-900 border-2 border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 p-3 hover:border-teal-400 transition-colors"
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : '🔍 Analyze Damage'}
        </button>
      </form>
    </div>
  );
}

