import { env } from '$env/dynamic/public';

export type ApiEnvelope<T> = {
  status?: string;
  message?: string;
  data?: T;
};

const baseUrl = env.PUBLIC_DELCOM_BASEURL || import.meta.env.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1';

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiEnvelope<T>> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
  let payload: ApiEnvelope<T>;
  try {
    payload = (await response.json()) as ApiEnvelope<T>;
  } catch {
    throw new Error(`Respons API bukan JSON (HTTP ${response.status})`);
  }

  if (!response.ok || (payload.status && payload.status !== 'success')) {
    throw new Error(payload.message || `Permintaan gagal (HTTP ${response.status})`);
  }
  return payload;
}
