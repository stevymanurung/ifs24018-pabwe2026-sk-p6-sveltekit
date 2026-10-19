import { get } from 'svelte/store';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  courses,
  coursesError,
  coursesLoading,
  mutationState,
  selectedContent,
  selectedCourse,
  setCourses,
  setCoursesError,
  setSelectedContent,
  setSelectedCourse
} from './coursesStore';

describe('coursesStore', () => {
  beforeEach(() => {
    courses.set([]);
    selectedCourse.set(null);
    selectedContent.set(null);
    coursesLoading.set(false);
    coursesError.set('');
    mutationState.set({
      course: false,
      cover: false,
      students: false,
      rating: false,
      content: false
    });
  });

  it('updates stores via helper functions', () => {
    const courseList = [{ id: 1, title: 'Course 1', description: 'Desc 1' }];
    const courseItem = { id: 1, title: 'Course 1', description: 'Desc 1' };
    const contentItem = { id: 10, title: 'Lesson 1' };

    setCourses(courseList);
    expect(get(courses)).toEqual(courseList);

    setSelectedCourse(courseItem);
    expect(get(selectedCourse)).toEqual(courseItem);

    setSelectedContent(contentItem);
    expect(get(selectedContent)).toEqual(contentItem);

    setCoursesError('Error fetching courses');
    expect(get(coursesError)).toBe('Error fetching courses');
  });

  it('provides default initial mutationState and loading state', () => {
    expect(get(coursesLoading)).toBe(false);
    expect(get(mutationState)).toEqual({
      course: false,
      cover: false,
      students: false,
      rating: false,
      content: false
    });
  });
});
