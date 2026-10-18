import type { Handle } from '@sveltejs/kit';

/** Authentication pages must not be served from a stale browser/proxy cache. */
export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (event.url.pathname === '/auth/login' || event.url.pathname.startsWith('/auth/')) {
    response.headers.set('cache-control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('pragma', 'no-cache');
    response.headers.set('expires', '0');
  }

  return response;
};
