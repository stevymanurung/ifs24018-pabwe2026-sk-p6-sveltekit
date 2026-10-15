import { apiRequest } from '$lib/apiHelper';
import type { AuthProfile } from '../auth/authStore';
export const userApi = {
  list() { return apiRequest<{ users?: AuthProfile[]; data?: AuthProfile[] }>('/users'); },
  profile() { return apiRequest<{ user?: AuthProfile; profile?: AuthProfile }>('/users/profile'); },
  updateProfile(name: string, email: string) { return apiRequest<unknown>('/users/profile', { method: 'PUT', body: JSON.stringify({ name, email }) }); },
  uploadPhoto(photo: File) { const body = new FormData(); body.append('photo', photo); return apiRequest<unknown>('/users/profile/photo', { method: 'POST', body }); },
  changePassword(old_password: string, new_password: string) { return apiRequest<unknown>('/users/profile/password', { method: 'PUT', body: JSON.stringify({ old_password, new_password }) }); }
};
