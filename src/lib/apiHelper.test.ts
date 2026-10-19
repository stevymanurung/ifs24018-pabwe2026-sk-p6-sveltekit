import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest, getAccessToken, putAccessToken } from './apiHelper';

describe('apiHelper', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('localStorage access token operations', () => {
    it('stores, retrieves, and removes token', () => {
      expect(getAccessToken()).toBeNull();
      putAccessToken('token123');
      expect(getAccessToken()).toBe('token123');
      putAccessToken(null);
      expect(getAccessToken()).toBeNull();
    });

    it('handles undefined localStorage gracefully', () => {
      const originalLocalStorage = globalThis.localStorage;
      delete (globalThis as { localStorage?: Storage }).localStorage;
      try {
        expect(getAccessToken()).toBeNull();
        expect(() => putAccessToken('token')).not.toThrow();
        expect(() => putAccessToken(null)).not.toThrow();
      } finally {
        globalThis.localStorage = originalLocalStorage;
      }
    });
  });

  describe('apiRequest', () => {
    it('makes successful GET request without token', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: 'success', data: { id: 1 } })
      });
      vi.stubGlobal('fetch', fetchMock);

      const res = await apiRequest<{ id: number }>('/test', {}, null);
      expect(res.data?.id).toBe(1);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toContain('/test');
      expect((init.headers as Headers).get('Authorization')).toBeNull();
    });

    it('formats path without leading slash and adds active token from storage when token argument is undefined', async () => {
      putAccessToken('stored-token');
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: 'success', data: 'ok' })
      });
      vi.stubGlobal('fetch', fetchMock);

      const res = await apiRequest('test-path');
      expect(res.data).toBe('ok');
      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toContain('/test-path');
      expect((init.headers as Headers).get('Authorization')).toBe('Bearer stored-token');
    });

    it('handles explicit token and json body content-type header', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: 'success' })
      });
      vi.stubGlobal('fetch', fetchMock);

      await apiRequest('/items', { method: 'POST', body: JSON.stringify({ a: 1 }) }, 'explicit-token');
      const [, init] = fetchMock.mock.calls[0];
      expect((init.headers as Headers).get('Authorization')).toBe('Bearer explicit-token');
      expect((init.headers as Headers).get('Content-Type')).toBe('application/json');
    });

    it('preserves existing Content-Type header', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: 'success' })
      });
      vi.stubGlobal('fetch', fetchMock);

      await apiRequest('/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/vnd.custom+json' },
        body: JSON.stringify({ a: 1 })
      });
      const [, init] = fetchMock.mock.calls[0];
      expect((init.headers as Headers).get('Content-Type')).toBe('application/vnd.custom+json');
    });

    it('does not set application/json for FormData body', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: 'success' })
      });
      vi.stubGlobal('fetch', fetchMock);

      const formData = new FormData();
      await apiRequest('/upload', { method: 'POST', body: formData });
      const [, init] = fetchMock.mock.calls[0];
      expect((init.headers as Headers).get('Content-Type')).toBeNull();
    });

    it('throws error when response is not valid JSON', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => {
          throw new Error('invalid json');
        }
      });
      vi.stubGlobal('fetch', fetchMock);

      await expect(apiRequest('/bad')).rejects.toThrow('Respons API bukan JSON (HTTP 502)');
    });

    it('throws error with payload message on failure status', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ status: 'error', message: 'Custom error message' })
      });
      vi.stubGlobal('fetch', fetchMock);

      await expect(apiRequest('/fail')).rejects.toThrow('Custom error message');
    });

    it('throws fallback error when response not ok and message missing', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ status: 'fail' })
      });
      vi.stubGlobal('fetch', fetchMock);

      await expect(apiRequest('/notfound')).rejects.toThrow('Permintaan gagal (HTTP 404)');
    });
  });
});
