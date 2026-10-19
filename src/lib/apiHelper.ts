export type ApiEnvelope<T> = { status?: string; message?: string; data?: T };
const baseUrl = import.meta.env.VITE_DELCOM_API_URL.replace(/\/$/, '');

export function getAccessToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('delcom_access_token');
}
export function putAccessToken(token: string | null): void {
  if (typeof localStorage === 'undefined') return;
  if (token) localStorage.setItem('delcom_access_token', token);
  else localStorage.removeItem('delcom_access_token');
}
export async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string | null): Promise<ApiEnvelope<T>> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && options.body !== undefined && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const activeToken = token === undefined ? getAccessToken() : token;
  if (activeToken) headers.set('Authorization', `Bearer ${activeToken}`);
  const response = await fetch(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`, { ...options, headers });
  let payload: ApiEnvelope<T>;
  try { payload = await response.json() as ApiEnvelope<T>; }
  catch { throw new Error(`Respons API bukan JSON (HTTP ${response.status})`); }
  if (!response.ok || (payload.status && payload.status !== 'success')) throw new Error(payload.message || `Permintaan gagal (HTTP ${response.status})`);
  return payload;
}
