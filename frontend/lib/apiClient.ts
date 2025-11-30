import { getToken, clearToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

export async function apiPost<T = any>(
  path: string,
  body: any,
  withAuth: boolean = false
): Promise<T> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (withAuth) {
      const token = getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    console.log(`API Request: POST ${API_BASE_URL}${path}`);

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    const text = await response.text();
    
    let data: any;
    if (text && contentType?.includes('application/json')) {
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse JSON:', text);
        throw new Error(`Invalid JSON response from server: ${text.substring(0, 100)}`);
      }
    } else if (text) {
      // Non-JSON response
      throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
    } else {
      // Empty response
      throw new Error(`Empty response from server. Status: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      console.error('API Error:', data);
      
      // Handle unauthorized errors - clear invalid token
      if (response.status === 401) {
        clearToken();
        // Redirect to login on next tick to avoid React state issues
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.location.href = '/auth/login';
          }, 100);
        }
      }
      
      throw new Error(data.error || `Request failed: ${response.statusText}`);
    }

    console.log('API Success:', data);
    return data;
  } catch (error) {
    console.error('API Call Failed:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const apiUrl = API_BASE_URL || 'http://localhost:4000';
      throw new Error(`Cannot connect to server at ${apiUrl}. Check that NEXT_PUBLIC_API_URL is set correctly in Vercel environment variables.`);
    }
    throw error;
  }
}

export async function apiGet<T = any>(
  path: string,
  withAuth: boolean = false
): Promise<T> {
  const headers: Record<string, string> = {};

  if (withAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers,
  });

  // Check if response has content before parsing JSON
  const contentType = response.headers.get('content-type');
  const text = await response.text();
  
  let data: any;
  if (text && contentType?.includes('application/json')) {
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse JSON:', text);
      throw new Error(`Invalid JSON response from server: ${text.substring(0, 100)}`);
    }
  } else if (text) {
    throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
  } else {
    throw new Error(`Empty response from server. Status: ${response.status} ${response.statusText}`);
  }

  if (!response.ok) {
    // Handle unauthorized errors - clear invalid token
    if (response.status === 401) {
      clearToken();
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 100);
      }
    }
    
    throw new Error(data.error || `Request failed: ${response.statusText}`);
  }

  return data;
}

