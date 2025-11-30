'use client';

import { useState, useEffect, ChangeEvent, FormEvent, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Logo from '../components/Logo';

function MobileUploadContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');

  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ description?: string; file?: string }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setUploadError('Invalid or missing session ID');
    }
  }, [sessionId]);

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

    if (!sessionId) {
      setUploadError('Invalid session ID');
      return;
    }

    // Validation
    const newErrors: { description?: string; file?: string } = {};

    if (files.length === 0) {
      newErrors.file = 'Please capture or select at least one file';
    }

    if (description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('description', description);
      
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`http://localhost:4000/api/upload-session/${sessionId}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      setUploadSuccess(true);
      setDescription('');
      setFiles([]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <span className="text-6xl mb-4 block">❌</span>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Invalid Session</h1>
          <p className="text-slate-600">This upload link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 to-cyan-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <span className="text-6xl mb-4 block">✅</span>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Upload Successful!</h1>
          <p className="text-slate-600 mb-6">
            Your files have been uploaded. You can now return to your computer to view the analysis.
          </p>
          <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4">
            <p className="text-sm text-teal-800 font-medium">
              ✓ {files.length} file{files.length !== 1 ? 's' : ''} uploaded
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-slate-800/50 backdrop-blur border-b border-slate-700">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Logo size="sm" />
          <div>
            <h1 className="text-white font-bold text-lg">Mobile Upload</h1>
            <p className="text-slate-400 text-xs">Capture damage photos/videos</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 block">📸</span>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Capture Damage</h2>
            <p className="text-sm text-slate-600">
              Take photos or videos of the damage
            </p>
          </div>

          {uploadError && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4">
              <p className="font-bold text-sm">Error</p>
              <p className="text-sm">{uploadError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Input */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-slate-700 mb-2">
                Take Photo or Video *
              </label>
              <input
                type="file"
                id="file"
                accept="image/*,video/*"
                capture="environment"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-900 border-2 border-slate-300 rounded-lg cursor-pointer bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 p-3"
                disabled={isUploading}
              />
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{errors.file}</p>
              )}
              
              {/* Display selected files */}
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    Selected files ({files.length}):
                  </p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-lg">
                            {file.type.startsWith('video/') ? '🎥' : '📷'}
                          </span>
                          <span className="text-teal-700 truncate">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 font-bold text-xl leading-none"
                          disabled={isUploading}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description Input */}
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
                className="block w-full text-sm text-slate-900 border-2 border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 p-3"
                disabled={isUploading}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : '📤 Upload Files'}
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-4">
            Files will be securely uploaded to your desktop session
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MobileUploadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <MobileUploadContent />
    </Suspense>
  );
}

