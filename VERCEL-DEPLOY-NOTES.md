# Panduan Deployment Vercel

## Struktur proyek

Root proyek harus langsung berisi `package.json`, `svelte.config.js`, `vite.config.ts`, `vercel.json`, dan folder `src/`. Jangan set Root Directory ke folder lain jika file-file tersebut sudah berada di root repository.

## Pengaturan Vercel

- Framework Preset: **SvelteKit**
- Build Command: **Default** atau `npm run build`
- Install Command: **Default**
- Output Directory: **Default/kosong**. Jangan isi `.vercel/output`, `build`, atau `dist` secara manual.
- Development Command: default.

Proyek memakai `@sveltejs/adapter-vercel`. Adapter ini yang harus menghasilkan `.vercel/output/config.json` saat build di Vercel. Jangan mengunggah folder `.vercel/output` hasil build dari laptop.

## Jika sebelumnya gagal dengan `.vercel/output/config.json` tidak ditemukan

Folder `.vercel` adalah output hasil build, bukan source. ZIP final ini sengaja tidak menyertakannya. Jika folder tersebut pernah masuk ke GitHub, mengandalkan `.gitignore` saja tidak cukup untuk menghapus file yang sudah ter-track. Di terminal pada root repository jalankan:

```bash
git rm -r --cached .vercel
```

Jika Git menyatakan path tidak ditemukan, periksa `git status`. Pastikan `.vercel/` tercantum di `.gitignore`, lalu commit dan push perubahan source yang bersih. Jangan commit folder `.vercel/output`.

Setelah itu, buka Vercel → Settings → Build and Deployment, pulihkan pengaturan framework ke **SvelteKit** dan Output Directory ke default/kosong, lalu redeploy tanpa Build Cache jika opsi tersedia.

## Menjalankan lokal

Pakai Node.js 20.19+ atau 22.12+ dan npm:

```bash
npm install
npm run dev
```

Buka `http://localhost:3005`.

Untuk memeriksa build lokal:

```bash
npm run check
npm run build
npm run preview
```

File `.env.example` hanya contoh. Salin menjadi `.env` jika ingin mengganti base URL lokal. Jangan commit `.env` atau token rahasia.
