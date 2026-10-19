import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '$lib/apiHelper';
import { userApi } from './userApi';

vi.mock('$lib/apiHelper', () => ({ apiRequest: vi.fn() }));
const requestMock = vi.mocked(apiRequest);

describe('userApi', () => {
  beforeEach(() => {
    requestMock.mockReset().mockResolvedValue({ status: 'success', data: {} });
  });

  it('calls list', async () => {
    await userApi.list();
    expect(requestMock).toHaveBeenCalledWith('/users');
  });

  it('calls profile', async () => {
    await userApi.profile();
    expect(requestMock).toHaveBeenCalledWith('/users/profile');
  });

  it('calls updateProfile', async () => {
    await userApi.updateProfile('New Name', 'new@example.com');
    expect(requestMock).toHaveBeenCalledWith(
      '/users/profile',
      { method: 'PUT', body: JSON.stringify({ name: 'New Name', email: 'new@example.com' }) }
    );
  });

  it('calls uploadPhoto with FormData', async () => {
    const file = new File(['avatar content'], 'avatar.png', { type: 'image/png' });
    await userApi.uploadPhoto(file);

    const call = requestMock.mock.calls.at(-1);
    expect(call).toBeDefined();
    const [path, options] = call!;
    expect(path).toBe('/users/profile/photo');
    expect(options?.method).toBe('POST');
    expect((options?.body as FormData).get('photo')).toBe(file);
  });

  it('calls changePassword', async () => {
    await userApi.changePassword('oldpass123', 'newpass123');
    expect(requestMock).toHaveBeenCalledWith(
      '/users/profile/password',
      { method: 'PUT', body: JSON.stringify({ old_password: 'oldpass123', new_password: 'newpass123' }) }
    );
  });
});
