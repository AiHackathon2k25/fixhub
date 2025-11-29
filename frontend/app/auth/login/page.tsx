'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/app/components/AuthForm';
import Logo from '@/app/components/Logo';
import { apiPost } from '@/lib/apiClient';
import { setToken } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const response = await apiPost('/api/auth/login', { email, password });
    setToken(response.token);
    // Show success message
    setSuccessMessage('Login successful! Redirecting to dashboard...');
    // Redirect to dashboard after 1 second
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-3 mb-4">
            <Logo size="lg" />
            <h1 className="text-4xl font-bold text-slate-800">FixHub</h1>
          </Link>
          <p className="text-slate-600 text-lg">Welcome back! Log in to your account</p>
        </div>

        <AuthForm mode="login" onSubmit={handleLogin} />

        {successMessage && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md animate-fade-in">
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
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-teal-600 hover:text-teal-700 font-semibold">
              Sign up
            </Link>
          </p>
          
          <button
            onClick={handleGoBack}
            className="text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center mx-auto gap-2"
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

