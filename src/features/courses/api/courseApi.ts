import { apiRequest } from '$lib/apiHelper';

export type Course = {
  id: number | string;
  title: string;
  description: string;
  user_id?: number | string;
  cover?: string | null;
  students?: Array<{ id?: number | string; user_id?: number | string; name?: string }>;
  [key: string]: unknown;
};

export type CourseContent = {
  id: number | string;
  title: string;
  description?: string;
  video_url?: string;
  is_completed?: number;
  [key: string]: unknown;
};

export const courseApi = {
  list(token?: string | null) {
    return apiRequest<{ courses: Course[] }>('/courses', {}, token);
  },
  detail(id: string | number, token?: string | null) {
    return apiRequest<{ course: Course }>(`/courses/${id}`, {}, token);
  },
  create(title: string, description: string, token?: string | null) {
    return apiRequest<{ course?: Course }>('/courses', {
      method: 'POST',
      body: JSON.stringify({ title, description })
    }, token);
  },
  update(id: string | number, title: string, description: string, token?: string | null) {
    return apiRequest<{ course?: Course }>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description })
    }, token);
  },
  remove(id: string | number, token?: string | null) {
    return apiRequest<unknown>(`/courses/${id}`, { method: 'DELETE' }, token);
  },
  removeAll(token?: string | null) {
    return apiRequest<unknown>('/courses', { method: 'DELETE' }, token);
  },
  uploadCover(id: string | number, cover: File, token?: string | null) {
    const body = new FormData();
    body.append('cover', cover);
    return apiRequest<unknown>(`/courses/${id}/cover`, { method: 'POST', body }, token);
  },
  join(id: string | number, token?: string | null) {
    return apiRequest<unknown>(`/courses/${id}/students`, { method: 'POST' }, token);
  },
  leave(id: string | number, token?: string | null) {
    return apiRequest<unknown>(`/courses/${id}/students`, { method: 'DELETE' }, token);
  },
  rate(id: string | number, rating: number, token?: string | null) {
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new Error('Rating harus berupa angka 1 sampai 5.');
    }
    return apiRequest<unknown>(`/courses/${id}/rating`, {
      method: 'POST',
      body: JSON.stringify({ rating })
    }, token);
  },
  addContent(id: string | number, title: string, description: string, video_url: string, token?: string | null) {
    return apiRequest<{ course_content?: CourseContent }>(`/courses/${id}/contents`, {
      method: 'POST',
      body: JSON.stringify({ title, description, video_url })
    }, token);
  },
  contentDetail(id: string | number, token?: string | null) {
    return apiRequest<{ course_content: CourseContent }>(`/courses/-/contents/${id}`, {}, token);
  },
  updateContent(id: string | number, title: string, description: string, video_url: string, token?: string | null) {
    return apiRequest<unknown>(`/courses/contents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, video_url })
    }, token);
  },
  removeContent(id: string | number, token?: string | null) {
    return apiRequest<unknown>(`/courses/contents/${id}`, { method: 'DELETE' }, token);
  },
  setContentProgress(id: string | number, status: 0 | 1, token?: string | null) {
    if (status !== 0 && status !== 1) throw new Error('Status belajar hanya boleh 0 atau 1.');
    return apiRequest<unknown>(`/courses/contents/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }, token);
  }
};
