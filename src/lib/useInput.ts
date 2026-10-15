import { writable } from 'svelte/store';

export function useInput(initialValue = '') {
  const value = writable(initialValue);
  const error = writable('');
  return {
    value,
    error,
    setValue: (nextValue: string) => value.set(nextValue),
    setError: (message: string) => error.set(message),
    reset: () => { value.set(initialValue); error.set(''); }
  };
}
