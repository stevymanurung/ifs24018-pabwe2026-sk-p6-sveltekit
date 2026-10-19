import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { useInput } from './useInput';

describe('useInput', () => {
  it('initializes with default empty string', () => {
    const input = useInput();
    expect(get(input.value)).toBe('');
    expect(get(input.error)).toBe('');
  });

  it('initializes with custom value and updates value/error', () => {
    const input = useInput('hello');
    expect(get(input.value)).toBe('hello');

    input.setValue('world');
    expect(get(input.value)).toBe('world');

    input.setError('Invalid input');
    expect(get(input.error)).toBe('Invalid input');

    input.reset();
    expect(get(input.value)).toBe('hello');
    expect(get(input.error)).toBe('');
  });
});
