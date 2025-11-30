'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/app/components/AuthForm';
import Logo from '@/app/components/Logo';
import { apiPost } from '@/lib/apiClient';

export default function SignupPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignup = async (email: string, password: string, username?: string, phone?: string) => {
    await apiPost('/api/auth/signup', { email, password, username, phone });
    // Show success message
    setSuccessMessage('Account created successfully! Redirecting to login...');
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 via-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-indigo-200/15 via-purple-200/20 to-pink-200/15 animate-gradient-slow"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-float-slow-delayed"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">FH</span>
            </div>
            <span className="text-3xl font-semibold text-slate-800">
              <span className="text-slate-800">Fix</span>
              <span className="text-primary-600">Hub</span>
            </span>
          </Link>
          <p className="text-slate-700 text-lg font-medium">Create your account and get started</p>
        </div>

        <AuthForm mode="signup" onSubmit={handleSignup} />

        {successMessage && (
          <div className="mt-6 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold">Success!</p>
                <p>{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-6 space-y-4">
          <p className="text-slate-700">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
              Log in
            </Link>
          </p>
          
          <button
            onClick={handleGoBack}
            className="text-slate-600 hover:text-slate-800 text-sm flex items-center justify-center mx-auto gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go back to home
          </button>
        </div>
      </div>
    </div>
  );
}

