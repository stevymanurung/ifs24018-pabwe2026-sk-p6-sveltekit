import { describe, expect, it } from 'vitest';
import { getErrorMessage, getYouTubeEmbedUrl } from './toolsHelper';

describe('getErrorMessage', () => {
  it('returns Error message', () => {
    expect(getErrorMessage(new Error('Oops'))).toBe('Oops');
  });

  it('returns string errors', () => {
    expect(getErrorMessage('Bad')).toBe('Bad');
  });

  it('returns fallback for other values', () => {
    expect(getErrorMessage({})).toBe('Terjadi kesalahan yang tidak diketahui.');
    expect(getErrorMessage(null)).toBe('Terjadi kesalahan yang tidak diketahui.');
    expect(getErrorMessage(42)).toBe('Terjadi kesalahan yang tidak diketahui.');
  });
});

describe('getYouTubeEmbedUrl', () => {
  const id = 'abcdefghijk';
  const embed = `https://www.youtube.com/embed/${id}`;

  it('handles youtu.be links', () => {
    expect(getYouTubeEmbedUrl(`https://youtu.be/${id}`)).toBe(embed);
  });

  it('handles youtube watch links', () => {
    expect(getYouTubeEmbedUrl(`https://www.youtube.com/watch?v=${id}`)).toBe(embed);
  });

  it('rejects watch links without a video id', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=')).toBeNull();
  });

  it('handles embed links and rejects an empty embed id', () => {
    expect(getYouTubeEmbedUrl(`https://www.youtube.com/embed/${id}`)).toBe(embed);
    expect(getYouTubeEmbedUrl('https://www.youtube.com/embed/')).toBeNull();
  });

  it('handles shorts links and rejects an empty shorts id', () => {
    expect(getYouTubeEmbedUrl(`https://www.youtube.com/shorts/${id}`)).toBe(embed);
    expect(getYouTubeEmbedUrl('https://www.youtube.com/shorts/')).toBeNull();
  });

  it('rejects unsupported paths, hosts, and invalid video ids', () => {
    expect(getYouTubeEmbedUrl('https://example.com')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/channel/test')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/embed')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/shorts')).toBeNull();
    expect(getYouTubeEmbedUrl('https://youtu.be/short')).toBeNull();
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=bad!video')).toBeNull();
  });

  it('rejects malformed URLs', () => {
    expect(getYouTubeEmbedUrl('not a url')).toBeNull();
  });
});
