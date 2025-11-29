import { getToken } from './auth';

const API_BASE_URL = 'http://localhost:4000';

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

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error || `Request failed: ${response.statusText}`);
    }

    console.log('API Success:', data);
    return data;
  } catch (error) {
    console.error('API Call Failed:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Please make sure the backend is running on http://localhost:4000');
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.statusText}`);
  }

  return data;
}

