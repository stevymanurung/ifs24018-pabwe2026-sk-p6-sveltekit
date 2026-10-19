import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '$lib/apiHelper';
import { courseApi } from './courseApi';

vi.mock('$lib/apiHelper', () => ({ apiRequest: vi.fn() }));
const requestMock = vi.mocked(apiRequest);

describe('courseApi requests', () => {
  beforeEach(() => requestMock.mockReset().mockResolvedValue({ status: 'success', data: {} }));

  it('lists and gets course details', () => {
    courseApi.list('token');
    expect(requestMock).toHaveBeenLastCalledWith('/courses', {}, 'token');
    courseApi.detail(7);
    expect(requestMock).toHaveBeenLastCalledWith('/courses/7', {}, undefined);
  });
  it('creates, updates, deletes, and deletes all courses', () => {
    courseApi.create('Title', 'Description', 't');
    expect(requestMock).toHaveBeenLastCalledWith('/courses', { method: 'POST', body: JSON.stringify({ title: 'Title', description: 'Description' }) }, 't');
    courseApi.update('abc', 'New', 'Desc');
    expect(requestMock).toHaveBeenLastCalledWith('/courses/abc', { method: 'PUT', body: JSON.stringify({ title: 'New', description: 'Desc' }) }, undefined);
    courseApi.remove(2);
    expect(requestMock).toHaveBeenLastCalledWith('/courses/2', { method: 'DELETE' }, undefined);
    courseApi.removeAll('x');
    expect(requestMock).toHaveBeenLastCalledWith('/courses', { method: 'DELETE' }, 'x');
  });
  it('uploads a cover as FormData', () => {
    const file = new File(['image'], 'cover.png', { type: 'image/png' });
    courseApi.uploadCover(4, file, 'token');
    const [path, options, token] = requestMock.mock.calls.at(-1)!;
    expect(path).toBe('/courses/4/cover');
    expect(options.method).toBe('POST');
    expect((options.body as FormData).get('cover')).toBe(file);
    expect(token).toBe('token');
  });
  it('joins and leaves a course', () => {
    courseApi.join(4);
    expect(requestMock).toHaveBeenLastCalledWith('/courses/4/students', { method: 'POST' }, undefined);
    courseApi.leave(4, 't');
    expect(requestMock).toHaveBeenLastCalledWith('/courses/4/students', { method: 'DELETE' }, 't');
  });
  it('validates ratings and sends valid ratings', () => {
    expect(() => courseApi.rate(1, 6)).toThrow('Rating harus berupa angka 1 sampai 5.');
    expect(() => courseApi.rate(1, 0)).toThrow('Rating harus berupa angka 1 sampai 5.');
    expect(() => courseApi.rate(1, 1.5)).toThrow('Rating harus berupa angka 1 sampai 5.');
    courseApi.rate(1, 5, 't');
    expect(requestMock).toHaveBeenLastCalledWith('/courses/1/rating', { method: 'POST', body: JSON.stringify({ rating: 5 }) }, 't');
  });
  it('adds content and retrieves content details', () => {
    courseApi.addContent(3, 'Lesson', 'About', 'https://youtu.be/abcdefghijk');
    expect(requestMock).toHaveBeenLastCalledWith('/courses/3/contents', { method: 'POST', body: JSON.stringify({ title: 'Lesson', description: 'About', video_url: 'https://youtu.be/abcdefghijk' }) }, undefined);
    courseApi.contentDetail(9, 't');
    expect(requestMock).toHaveBeenLastCalledWith('/courses/-/contents/9', {}, 't');
  });
  it('updates and removes content', () => {
    courseApi.updateContent(9, 'T', 'D', 'url', 't');
    expect(requestMock).toHaveBeenLastCalledWith('/courses/contents/9', { method: 'PUT', body: JSON.stringify({ title: 'T', description: 'D', video_url: 'url' }) }, 't');
    courseApi.removeContent(9);
    expect(requestMock).toHaveBeenLastCalledWith('/courses/contents/9', { method: 'DELETE' }, undefined);
  });
  it('validates progress and sends valid progress values', () => {
    expect(() => courseApi.setContentProgress(1, 2 as 0 | 1)).toThrow('Status belajar hanya boleh 0 atau 1.');
    courseApi.setContentProgress(1, 0);
    expect(requestMock).toHaveBeenLastCalledWith('/courses/contents/1/status', { method: 'PUT', body: JSON.stringify({ status: 0 }) }, undefined);
    courseApi.setContentProgress(1, 1, 't');
    expect(requestMock).toHaveBeenLastCalledWith('/courses/contents/1/status', { method: 'PUT', body: JSON.stringify({ status: 1 }) }, 't');
  });
});
