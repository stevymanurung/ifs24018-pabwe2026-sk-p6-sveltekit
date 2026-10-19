import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as apiHelper from '$lib/apiHelper';
import {
  authProfile,
  authToken,
  clearSession,
  restoreSession,
  setProfile,
  setSession
} from './authStore';

vi.mock('$lib/apiHelper', () => ({
  getAccessToken: vi.fn(),
  putAccessToken: vi.fn()
}));

describe('authStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authToken.set(null);
    authProfile.set(null);
  });

  it('sets session with token and profile', () => {
    const profile = { id: 1, name: 'Tester', email: 'tester@example.com' };
    setSession('my-token', profile);

    expect(apiHelper.putAccessToken).toHaveBeenCalledWith('my-token');
    expect(get(authToken)).toBe('my-token');
    expect(get(authProfile)).toEqual(profile);
  });

  it('sets session with token and default null profile', () => {
    setSession('token-only');
    expect(apiHelper.putAccessToken).toHaveBeenCalledWith('token-only');
    expect(get(authToken)).toBe('token-only');
    expect(get(authProfile)).toBeNull();
  });

  it('restores session from apiHelper', () => {
    vi.mocked(apiHelper.getAccessToken).mockReturnValue('restored-token');
    const token = restoreSession();

    expect(token).toBe('restored-token');
    expect(get(authToken)).toBe('restored-token');
  });

  it('sets profile independently', () => {
    const profile = { id: 2, name: 'Alice' };
    setProfile(profile);
    expect(get(authProfile)).toEqual(profile);
  });

  it('clears session', () => {
    setSession('to-clear', { name: 'Bob' });
    clearSession();

    expect(apiHelper.putAccessToken).toHaveBeenCalledWith(null);
    expect(get(authToken)).toBeNull();
    expect(get(authProfile)).toBeNull();
  });
});
