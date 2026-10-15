import { writable } from 'svelte/store';

export type AuthProfile = { id?: string | number; name?: string; email?: string; [key: string]: unknown };
export const authToken = writable<string | null>(null);
export const authProfile = writable<AuthProfile | null>(null);

export function setSession(token: string, profile: AuthProfile) {
  authToken.set(token);
  authProfile.set(profile);
}
export function clearSession() {
  authToken.set(null);
  authProfile.set(null);
}
