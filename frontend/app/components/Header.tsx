'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isLoggedIn, clearToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = typeof window !== 'undefined' && isLoggedIn();

  const handleLogout = () => {
    clearToken();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-blue-600">FixHub</h1>
          </Link>

          <nav className="flex items-center gap-6">
            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    pathname === '/dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`text-gray-700 hover:text-blue-600 transition-colors ${
                    pathname === '/' ? 'font-semibold text-blue-600' : ''
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`text-gray-700 hover:text-blue-600 transition-colors ${
                    pathname === '/about' ? 'font-semibold text-blue-600' : ''
                  }`}
                >
                  About Us
                </Link>
                <Link
                  href="/#services"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className={`text-gray-700 hover:text-blue-600 transition-colors ${
                    pathname === '/contact' ? 'font-semibold text-blue-600' : ''
                  }`}
                >
                  Contact
                </Link>
                <div className="flex items-center gap-3 ml-4">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
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

