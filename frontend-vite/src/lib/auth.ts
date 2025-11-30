/**
 * Client-side JWT authentication helpers.
 * 
 * NOTE: Storing JWT in localStorage is insecure for production applications
 * as it's vulnerable to XSS attacks. This is acceptable for a hackathon demo.
 * 
 * In production, consider:
 * - HttpOnly cookies with SameSite and Secure flags
 * - Server-side session management
 * - Refresh token rotation
 */

const TOKEN_KEY = 'fixhub_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}

export function isAuthenticated(): boolean {
  return isLoggedIn();
}

