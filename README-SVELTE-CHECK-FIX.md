# Svelte Check Fix

This patch addresses the diagnostics reported by Jenkins Svelte Check:

- Removes `node:url` and `node:process` type dependencies from `vite.config.ts` by using URL and a guarded runtime process shape.
- Adds the `$features/*` TypeScript path mapping so `svelte-check` can resolve the existing `src/features` modules.
- Makes the `uploadCover` test safely handle optional request options.
- Explicitly types Svelte rune state for course and content records.

Run locally with Node.js 24:

```sh
npm ci
npm run check
npm run test:coverage
npm run build
```

The archive has not been validated by running these commands in this environment because dependency installation did not complete here. Review the resulting Jenkins logs after pushing.
