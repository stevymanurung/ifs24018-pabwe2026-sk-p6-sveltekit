import { describe, expect, it, vi } from 'vitest';
import { handle } from './hooks.server';

describe('hooks.server handle', () => {
  it('adds no-cache headers for /auth/login and other /auth/* routes', async () => {
    const mockHeaders = new Headers();
    const mockResponse = new Response('ok', { headers: mockHeaders });
    const mockResolve = vi.fn().mockResolvedValue(mockResponse);

    const eventLogin = {
      url: new URL('http://localhost:3000/auth/login')
    } as any;

    const res = await handle({ event: eventLogin, resolve: mockResolve });
    expect(res.headers.get('cache-control')).toBe('no-store, no-cache, must-revalidate, max-age=0');
    expect(res.headers.get('pragma')).toBe('no-cache');
    expect(res.headers.get('expires')).toBe('0');

    const mockHeadersRegister = new Headers();
    const resRegister = await handle({
      event: { url: new URL('http://localhost:3000/auth/register') } as any,
      resolve: vi.fn().mockResolvedValue(new Response('ok', { headers: mockHeadersRegister }))
    });
    expect(resRegister.headers.get('cache-control')).toBe('no-store, no-cache, must-revalidate, max-age=0');
  });

  it('leaves headers unchanged for non-auth routes', async () => {
    const mockHeaders = new Headers({ 'content-type': 'text/plain' });
    const mockResponse = new Response('ok', { headers: mockHeaders });
    const mockResolve = vi.fn().mockResolvedValue(mockResponse);

    const eventCourses = {
      url: new URL('http://localhost:3000/courses')
    } as any;

    const res = await handle({ event: eventCourses, resolve: mockResolve });
    expect(res.headers.get('cache-control')).toBeNull();
    expect(res.headers.get('pragma')).toBeNull();
    expect(res.headers.get('expires')).toBeNull();
  });
});
