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
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
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
                      ? 'bg-slate-700 text-teal-400'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`text-slate-300 hover:text-white transition-colors font-medium ${
                    pathname === '/' ? 'font-semibold text-teal-400' : ''
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`text-slate-300 hover:text-white transition-colors font-medium ${
                    pathname === '/about' ? 'font-semibold text-teal-400' : ''
                  }`}
                >
                  About Us
                </Link>
                <Link
                  href="/#services"
                  className="text-slate-300 hover:text-white transition-colors font-medium"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className={`text-slate-300 hover:text-white transition-colors font-medium ${
                    pathname === '/contact' ? 'font-semibold text-teal-400' : ''
                  }`}
                >
                  Contact
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 rounded-lg transition-colors font-medium"
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

