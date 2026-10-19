import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '$lib/apiHelper';
import { authApi } from './authApi';

vi.mock('$lib/apiHelper', () => ({ apiRequest: vi.fn() }));
const requestMock = vi.mocked(apiRequest);

describe('authApi', () => {
  beforeEach(() => {
    requestMock.mockReset().mockResolvedValue({ status: 'success', data: {} });
  });

  it('calls login with email and password and null token', async () => {
    await authApi.login('test@example.com', 'password123');
    expect(requestMock).toHaveBeenCalledWith(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email: 'test@example.com', password: 'password123' }) },
      null
    );
  });

  it('calls register with name, email, password and null token', async () => {
    await authApi.register('John Doe', 'john@example.com', 'secret');
    expect(requestMock).toHaveBeenCalledWith(
      '/auth/register',
      { method: 'POST', body: JSON.stringify({ name: 'John Doe', email: 'john@example.com', password: 'secret' }) },
      null
    );
  });
});
