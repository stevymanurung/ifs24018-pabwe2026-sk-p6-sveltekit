
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const runtimeProcess = (globalThis as typeof globalThis & { process?: { cwd?: () => string; env?: Record<string, string | undefined> } }).process;
  const fileEnv = loadEnv(mode, runtimeProcess?.cwd?.() ?? '.', '');
  const apiBaseUrl = fileEnv.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1';
  const apiRequestBase = apiBaseUrl;

  return {
    plugins: [sveltekit()],
    define: {
      'import.meta.env.VITE_DELCOM_API_URL': JSON.stringify(apiRequestBase),
    },
    resolve: {
      alias: {
        '$features': new URL('./src/features', import.meta.url).pathname
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      include: ['src/**/*.{test,spec}.{js,ts}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        include: [
          'src/lib/**/*.ts',
          'src/features/**/*.ts',
          'src/hooks.server.ts'
        ],
        exclude: [
          '**/*.test.ts',
          '**/*.spec.ts',
          'src/app.d.ts',
          'src/env.d.ts',
          'src/setupTests.ts'
        ],
        thresholds: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
      }
    }
  };
});
