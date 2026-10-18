import { describe, expect, it } from 'vitest';
import { getErrorMessage, getYouTubeEmbedUrl } from './toolsHelper';

describe('getErrorMessage', () => {
  it('returns Error message', () => { expect(getErrorMessage(new Error('Oops'))).toBe('Oops'); });
  it('returns string errors', () => { expect(getErrorMessage('Bad')).toBe('Bad'); });
  it('returns fallback for other values', () => { expect(getErrorMessage({})).toBe('Terjadi kesalahan yang tidak diketahui.'); });
});
describe('getYouTubeEmbedUrl', () => {
  it('handles youtu.be links', () => { expect(getYouTubeEmbedUrl('https://youtu.be/abcdefghijk')).toBe('https://www.youtube.com/embed/abcdefghijk'); });
  it('handles youtube watch links', () => { expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=abcdefghijk')).toBe('https://www.youtube.com/embed/abcdefghijk'); });
  it('rejects invalid links', () => { expect(getYouTubeEmbedUrl('https://example.com')).toBeNull(); });
  it('rejects malformed urls', () => { expect(getYouTubeEmbedUrl('not a url')).toBeNull(); });
});
