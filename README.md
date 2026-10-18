# ifs24018-pabwe2026-sk-p6-sveltekit

Aplikasi praktikum Delcom Courses menggunakan SvelteKit, Svelte 5, TypeScript, dan API Delcom. UI dan fitur aplikasi dipertahankan dari source proyek yang diberikan.

## Menjalankan lokal

Gunakan Node.js 20.19+ atau 22.12+.

```bash
npm install
npm run dev
```

Buka `http://localhost:3005`.

## Build dan preview

```bash
npm run check
npm run build
npm run preview
```

## Deploy ke Vercel

Proyek menggunakan `@sveltejs/adapter-vercel` melalui `svelte.config.js`.

- Framework Preset: **SvelteKit**
- Build Command: default atau `npm run build`
- Install Command: default
- Output Directory: default/kosong
- Root Directory: folder root proyek (folder yang berisi `package.json`)

Jangan commit folder `.vercel`, `.svelte-kit`, `node_modules`, atau file `.env`. Jika `.vercel` pernah ter-track di repository lama, lihat `VERCEL-DEPLOY-NOTES.md` untuk langkah menghapusnya dari Git index sebelum redeploy.

## API

Secara lokal, aplikasi menggunakan `https://open-api.delcom.org/api/v1` secara default. Saat build di Vercel, `vite.config.ts` mengarahkan permintaan ke `/delcom-api`, yang diteruskan oleh `vercel.json` ke API Delcom.

Untuk mengubah base URL lokal, salin `.env.example` menjadi `.env` dan sesuaikan nilainya. Jangan commit `.env` atau token rahasia.

## Fitur utama

- Login dan registrasi.
- Profil dan daftar pengguna.
- Daftar/detail kursus dan materi.
- API kursus, materi, peserta, rating, dan status belajar.
