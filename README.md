# ifs24018-pabwe2026-sk-p6-sveltekit

Aplikasi praktikum Delcom Courses menggunakan SvelteKit, Svelte 5, TypeScript, dan API Delcom. UI dan fitur aplikasi dipertahankan dari source proyek yang diberikan.

## Menjalankan lokal

Gunakan Node.js 20.19+ atau 22.12+.

```bash
npm install
npm run dev
```

Buka `http://localhost:3005`.

## Build dan jalankan produksi

Bisa menggunakan Bun atau Node.js:

Menggunakan Bun:
```bash
bun run check
bun run build
bun start
```

Menggunakan npm:
```bash
npm run check
npm run build
npm start
```

## API

Aplikasi menggunakan `https://open-api.delcom.org/api/v1` secara default.
Untuk mengubah base URL, sesuaikan nilai `VITE_DELCOM_BASEURL` di file `.env`. Jangan commit `.env` atau token rahasia.

Untuk mengubah base URL lokal, salin `.env.example` menjadi `.env` dan sesuaikan nilainya. Jangan commit `.env` atau token rahasia.

## Fitur utama

- Login dan registrasi.
- Profil dan daftar pengguna.
- Daftar/detail kursus dan materi.
- API kursus, materi, peserta, rating, dan status belajar.


## Jenkins and SonarQube

- `Jenkinsfile` runs dependency installation, Vitest coverage, Svelte checks, production build, and SonarQube analysis.
- The Jenkins controller must have a NodeJS tool installation named `NodeJS 24`, the SonarQube Scanner tool available on PATH, and a SonarQube server installation named `SonarQube` configured in **Manage Jenkins → System**. If your Jenkins uses different names, update the matching names in `Jenkinsfile`.
- Configure the SonarQube project key to match `sonar.projectKey` in `sonar-project.properties`.
- Test setup imports `@testing-library/jest-dom/vitest`, the supported integration for Vitest.
