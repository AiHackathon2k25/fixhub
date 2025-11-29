'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isLoggedIn, clearToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = typeof window !== 'undefined' && isLoggedIn();

  const handleLogout = () => {
    clearToken();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          <nav className="flex items-center gap-6">
            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    pathname === '/dashboard'
                      ? 'bg-teal-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`text-slate-700 hover:text-teal-600 transition-colors font-medium ${
                    pathname === '/' ? 'font-semibold text-teal-600' : ''
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`text-slate-700 hover:text-teal-600 transition-colors font-medium ${
                    pathname === '/about' ? 'font-semibold text-teal-600' : ''
                  }`}
                >
                  About Us
                </Link>
                <Link
                  href="/#services"
                  className="text-slate-700 hover:text-teal-600 transition-colors font-medium"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className={`text-slate-700 hover:text-teal-600 transition-colors font-medium ${
                    pathname === '/contact' ? 'font-semibold text-teal-600' : ''
                  }`}
                >
                  Contact
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 rounded-lg transition-colors shadow-md hover:shadow-lg font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

