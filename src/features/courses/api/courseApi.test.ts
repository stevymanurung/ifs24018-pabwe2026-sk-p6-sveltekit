import { describe, expect, it } from 'vitest';
import { courseApi } from './courseApi';

describe('courseApi validation', () => {
  it('rejects ratings outside 1..5 before making a request', () => {
    expect(() => courseApi.rate(1, 6)).toThrow('Rating harus berupa angka 1 sampai 5.');
  });
  it('rejects invalid progress status', () => {
    expect(() => courseApi.setContentProgress(1, 2 as 0 | 1)).toThrow('Status belajar hanya boleh 0 atau 1.');
  });
});
