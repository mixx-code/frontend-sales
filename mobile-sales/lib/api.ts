import Constants from 'expo-constants';

export const API_URL = 
  Constants.expoConfig?.extra?.apiUrl || 
  'https://electric-hideously-drake.ngrok-free.app'; 


export async function apiClient(endpoint: string, options?: RequestInit) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...options?.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${res.status}: ${res.statusText}`);
    }
    
    return res.json();
  } catch (error) {
    console.log('API Error:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server ngrok tidak merespon. Coba refresh lagi.');
      }
      throw error;
    }
    throw new Error('Network request failed');
  }
}
