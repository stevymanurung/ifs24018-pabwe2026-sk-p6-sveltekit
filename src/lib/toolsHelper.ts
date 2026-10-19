export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Terjadi kesalahan yang tidak diketahui.';
}

export function getYouTubeEmbedUrl(input: string): string | null {
  try {
    const url = new URL(input);
    let videoId = '';

    if (url.hostname === 'youtu.be') {
      videoId = url.pathname.slice(1);
    } else if (url.hostname.endsWith('youtube.com')) {
      switch (url.pathname) {
        case '/watch':
          videoId = url.searchParams.get('v') || '';
          break;
        default:
          if (url.pathname.startsWith('/embed/')) {
            videoId = url.pathname.split('/')[2] || '';
          } else if (url.pathname.startsWith('/shorts/')) {
            videoId = url.pathname.split('/')[2] || '';
          }
          break;
      }
    }

    if (/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  } catch {
    return null;
  }
}
