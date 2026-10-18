
import { fileURLToPath, URL } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = fileEnv.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1';
  const apiRequestBase = process.env.VERCEL ? '/delcom-api' : apiBaseUrl;

  return {
    plugins: [sveltekit()],
    define: {
      'import.meta.env.VITE_DELCOM_API_URL': JSON.stringify(apiRequestBase),
    },
    resolve: {
      alias: {
        '$features': fileURLToPath(
          new URL('./src/features', import.meta.url)
        )
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      include: ['src/**/*.{test,spec}.{js,ts}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/lib/**/*.ts', 'src/features/**/*.ts'],
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
