import { apiRequest } from '$lib/apiHelper';
import type { AuthProfile } from './authStore';
export type AuthResult = { access_token?: string; token?: string; user?: AuthProfile; profile?: AuthProfile; [key: string]: unknown };
export const authApi = {
  login(email: string, password: string) {
    return apiRequest<AuthResult>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }, null);
  },
  register(name: string, email: string, password: string) {
    return apiRequest<AuthResult>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }, null);
  }
};
