import { writable } from 'svelte/store';
import type { Course, CourseContent } from '../api/courseApi';

export const courses = writable<Course[]>([]);
export const selectedCourse = writable<Course | null>(null);
export const selectedContent = writable<CourseContent | null>(null);
export const coursesLoading = writable(false);
export const coursesError = writable('');
export const mutationState = writable({
  course: false,
  cover: false,
  students: false,
  rating: false,
  content: false
});

export function setCourses(items: Course[]) { courses.set(items); }
export function setSelectedCourse(item: Course | null) { selectedCourse.set(item); }
export function setSelectedContent(item: CourseContent | null) { selectedContent.set(item); }
export function setCoursesError(message: string) { coursesError.set(message); }
