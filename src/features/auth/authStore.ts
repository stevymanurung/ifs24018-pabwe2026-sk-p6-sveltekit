import { writable } from 'svelte/store';
import { getAccessToken, putAccessToken } from '$lib/apiHelper';
export type AuthProfile = { id?: string | number; name?: string; email?: string; photo?: string; [key: string]: unknown };
export const authToken = writable<string | null>(null);
export const authProfile = writable<AuthProfile | null>(null);
export function setSession(token: string, profile: AuthProfile | null = null) {
  putAccessToken(token); authToken.set(token); authProfile.set(profile);
}
export function restoreSession() {
  const token = getAccessToken(); authToken.set(token); return token;
}
export function setProfile(profile: AuthProfile | null) { authProfile.set(profile); }
export function clearSession() { putAccessToken(null); authToken.set(null); authProfile.set(null); }
