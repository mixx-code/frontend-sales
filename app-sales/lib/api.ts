// Config
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// HTTP Client
export async function apiClient(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
