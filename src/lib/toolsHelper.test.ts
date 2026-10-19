import { describe, expect, it } from 'vitest';
import { getErrorMessage, getYouTubeEmbedUrl } from './toolsHelper';

describe('getErrorMessage', () => {
  it('returns Error message', () => expect(getErrorMessage(new Error('Oops'))).toBe('Oops'));
  it('returns string errors', () => expect(getErrorMessage('Bad')).toBe('Bad'));
  it('returns fallback for null, objects, and numbers', () => {
    expect(getErrorMessage({})).toBe('Terjadi kesalahan yang tidak diketahui.');
    expect(getErrorMessage(null)).toBe('Terjadi kesalahan yang tidak diketahui.');
    expect(getErrorMessage(42)).toBe('Terjadi kesalahan yang tidak diketahui.');
  });
});

describe('getYouTubeEmbedUrl', () => {
  const id = 'abcdefghijk';
  it('handles youtu.be links', () => expect(getYouTubeEmbedUrl(`https://youtu.be/${id}`)).toBe(`https://www.youtube.com/embed/${id}`));
  it('handles youtube watch links', () => expect(getYouTubeEmbedUrl(`https://www.youtube.com/watch?v=${id}`)).toBe(`https://www.youtube.com/embed/${id}`));
  it('handles embed links', () => expect(getYouTubeEmbedUrl(`https://www.youtube.com/embed/${id}`)).toBe(`https://www.youtube.com/embed/${id}`));
  it('handles shorts links', () => expect(getYouTubeEmbedUrl(`https://www.youtube.com/shorts/${id}`)).toBe(`https://www.youtube.com/embed/${id}`));
  it('rejects invalid host, path, and video ids', () => {
    expect(getYouTubeEmbedUrl('https://example.com')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/channel/test')).toBeNull();
    expect(getYouTubeEmbedUrl('https://youtu.be/short')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=bad!video')).toBeNull();
  });
  it('rejects malformed urls', () => expect(getYouTubeEmbedUrl('not a url')).toBeNull());
});
