'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { isMobileDevice } from '@/lib/deviceDetection';
import QRCodeUpload from './QRCodeUpload';

interface UploadFormProps {
  onAnalyze: (description: string, files: File[]) => Promise<void>;
  isLoading: boolean;
}

export default function UploadForm({ onAnalyze, isLoading }: UploadFormProps) {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ description?: string; file?: string }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);

  // Detect device type on mount
  useEffect(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);
    setShowQRCode(!mobile); // Show QR code by default on desktop
  }, []);

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
      newErrors.file = 'Please select at least one file';
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

  const handleQRFilesReceived = async (receivedFiles: File[], receivedDescription: string) => {
    // Files received from QR code session
    setFiles(receivedFiles);
    setDescription(receivedDescription);
    setShowQRCode(false);
    
    // Automatically trigger analysis
    await onAnalyze(receivedDescription, receivedFiles);
  };

  const handleQRError = (error: string) => {
    setQrError(error);
  };

  // If on desktop and showing QR code, render QR component
  if (!isMobile && showQRCode) {
    return (
      <div>
        <QRCodeUpload 
          onFilesReceived={handleQRFilesReceived}
          onError={handleQRError}
        />
        {qrError && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-bold text-sm">Error</p>
            <p className="text-sm">{qrError}</p>
          </div>
        )}
        <button
          onClick={() => setShowQRCode(false)}
          className="w-full mt-4 text-sm text-slate-600 hover:text-slate-800 font-medium py-2 transition-colors"
        >
          Or upload from this computer instead
        </button>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-soft">
          <span className="text-2xl">{isMobile ? '📸' : '💻'}</span>
        </div>
        <h2 className="font-display text-2xl text-slate-900">New Claim Submission</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file" className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            {isMobile ? 'Take a Photo or Choose from Gallery *' : 'Upload Files *'}
          </label>
          {isMobile && (
            <p className="text-sm text-slate-600 mb-3 font-serif">
              📷 Tap to use camera · 🖼️ Swipe to choose from gallery
            </p>
          )}
          <input
            type="file"
            id="file"
            accept="image/*,video/*"
            capture={isMobile ? 'environment' : undefined}
            multiple
            onChange={handleFileChange}
            className="input-field cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200"
            disabled={isLoading}
          />
          {isMobile && (
            <p className="text-sm text-primary-600 mt-2 font-serif">
              💡 Tip: You can also record a short video of the issue
            </p>
          )}
          {errors.file && (
            <p className="text-rose-600 text-sm mt-2 font-medium">{errors.file}</p>
          )}
          
          {/* Display selected files */}
          {files.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Selected files ({files.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-xl px-4 py-2 shadow-sm">
                    <span className="text-lg">
                      {file.type.startsWith('video/') ? '🎥' : '📷'}
                    </span>
                    <span className="text-primary-700 truncate max-w-[200px] font-medium text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-rose-500 hover:text-rose-700 font-bold text-lg ml-1 transition-colors"
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
          <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            Description *
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the damage... (e.g., 'dishwasher door fell off', 'phone screen cracked')"
            className="input-field font-serif resize-none"
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-rose-600 text-sm mt-2 font-medium">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : <><span className="mr-2">🔍</span> Analyze Damage</>}
        </button>
      </form>

      {!isMobile && !showQRCode && (
        <button
          onClick={() => setShowQRCode(true)}
          className="w-full mt-6 text-sm text-slate-600 hover:text-primary-600 font-medium py-3 transition-colors border-t border-slate-200 pt-6"
        >
          <span className="mr-2">📱</span> Or scan QR code to upload from phone
        </button>
      )}
    </div>
  );
}

