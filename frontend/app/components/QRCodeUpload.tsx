'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeUploadProps {
  onFilesReceived: (files: File[], description: string) => void;
  onError: (error: string) => void;
}

export default function QRCodeUpload({ onFilesReceived, onError }: QRCodeUploadProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [status, setStatus] = useState<'creating' | 'waiting' | 'received' | 'error' | 'timeout'>('creating');
  const [pollingAttempts, setPollingAttempts] = useState(0);

  const MAX_POLLING_ATTEMPTS = 150; // 5 minutes (150 * 2 seconds)
  const POLLING_INTERVAL = 2000; // 2 seconds

  // Create session on mount
  useEffect(() => {
    createSession();
  }, []);

  const createSession = async () => {
    try {
      const token = localStorage.getItem('fixhub_token');
      const response = await fetch('http://localhost:4000/api/upload-session/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create upload session');
      }

      const data = await response.json();
      const sid = data.sessionId;
      setSessionId(sid);

      // Create QR code URL
      const baseUrl = window.location.origin;
      const uploadUrl = `${baseUrl}/mobile-upload?session=${sid}`;
      setQrCodeUrl(uploadUrl);

      setStatus('waiting');
      setIsPolling(true);
    } catch (err) {
      console.error('Error creating session:', err);
      setStatus('error');
      onError('Failed to create upload session. Please try again.');
    }
  };

  // Poll for session status
  useEffect(() => {
    if (!isPolling || !sessionId) return;

    const pollInterval = setInterval(async () => {
      try {
        const token = localStorage.getItem('fixhub_token');
        const response = await fetch(`http://localhost:4000/api/upload-session/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to check session status');
        }

        const data = await response.json();

        if (data.status === 'uploaded' && data.fileCount > 0) {
          // Files have been uploaded! Now retrieve them
          setStatus('received');
          setIsPolling(false);
          await retrieveFiles();
          return;
        }

        // Check timeout
        setPollingAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= MAX_POLLING_ATTEMPTS) {
            setIsPolling(false);
            setStatus('timeout');
            onError('Upload timeout. No files received from mobile device.');
          }
          return newAttempts;
        });
      } catch (err) {
        console.error('Error polling session:', err);
        // Continue polling on error
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(pollInterval);
  }, [isPolling, sessionId, pollingAttempts]);

  const retrieveFiles = async () => {
    if (!sessionId) return;

    try {
      const token = localStorage.getItem('fixhub_token');
      const response = await fetch(`http://localhost:4000/api/upload-session/${sessionId}/files`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve files');
      }

      const data = await response.json();
      
      // Convert file data back to File objects
      const files: File[] = data.files.map((fileData: any) => {
        const buffer = Buffer.from(fileData.buffer);
        const blob = new Blob([buffer], { type: fileData.mimetype });
        return new File([blob], fileData.filename, { type: fileData.mimetype });
      });

      onFilesReceived(files, data.description);
    } catch (err) {
      console.error('Error retrieving files:', err);
      onError('Failed to retrieve uploaded files');
    }
  };

  const retry = () => {
    setStatus('creating');
    setPollingAttempts(0);
    setIsPolling(false);
    setSessionId(null);
    setQrCodeUrl(null);
    createSession();
  };

  if (status === 'creating') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-slate-600">Creating upload session...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 text-center">
        <span className="text-4xl mb-4 block">❌</span>
        <p className="text-slate-600 mb-4">Failed to create upload session</p>
        <button
          onClick={retry}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (status === 'timeout') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 text-center">
        <span className="text-4xl mb-4 block">⏰</span>
        <p className="text-slate-600 mb-4">Upload session timed out</p>
        <p className="text-sm text-slate-500 mb-4">No files were received from your mobile device.</p>
        <button
          onClick={retry}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Generate New QR Code
        </button>
      </div>
    );
  }

  if (status === 'received') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 text-center">
        <span className="text-4xl mb-4 block">✅</span>
        <p className="text-teal-600 font-semibold">Files received from mobile device!</p>
        <p className="text-sm text-slate-500 mt-2">Processing...</p>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-soft">
          <span className="text-2xl">📱</span>
        </div>
        <h2 className="font-display text-2xl text-slate-900">Scan QR Code to Upload</h2>
      </div>

      <div className="bg-gradient-soft rounded-2xl p-8 mb-6 border border-primary-100">
        {qrCodeUrl && (
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-2xl shadow-soft-lg mb-4">
              <QRCodeSVG 
                value={qrCodeUrl} 
                size={220} 
                level="M"
                includeMargin={true}
              />
            </div>
            <p className="text-base text-slate-800 font-medium text-center mb-2 font-serif">
              Scan this code with your phone's camera
            </p>
            <p className="text-sm text-slate-500 text-center">
              Session expires in 10 minutes
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <p className="text-slate-600 font-serif">Open your phone's camera app</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
          <p className="text-slate-600 font-serif">Point it at the QR code above</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
          <p className="text-slate-600 font-serif">Tap the notification to open the upload page</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
          <p className="text-slate-600 font-serif">Take photos/videos and describe the damage</p>
        </div>
      </div>

      <div className="p-5 bg-cream-200 rounded-xl border border-slate-200">
        <div className="flex items-center justify-center gap-3">
          <div className="animate-pulse w-3 h-3 bg-primary-500 rounded-full"></div>
          <p className="text-sm text-slate-700 font-medium">
            Waiting for upload from phone...
          </p>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2 font-serif">
          Checking every 2 seconds · {pollingAttempts}/{MAX_POLLING_ATTEMPTS}
        </p>
      </div>

      <button
        onClick={retry}
        className="w-full mt-6 text-sm text-slate-600 hover:text-primary-600 font-medium py-3 transition-colors border-t border-slate-200 pt-6"
      >
        <span className="mr-2">🔄</span> Generate New QR Code
      </button>
    </div>
  );
}

