# Delcom Courses — PABWE P6

Proyek awal SvelteKit + TypeScript + Svelte 5 untuk username `ifs24018`.

## Menjalankan
1. Install Bun.
2. Ekstrak ZIP.
3. Buka terminal di folder proyek.
4. Jalankan `bun install`.
5. Salin `.env.example` menjadi `.env` (atau gunakan `.env` yang sudah disediakan).
6. Jalankan `bun run dev`, lalu buka http://localhost:3005.

## Build
- `bun run build`
- `bun start`

## Catatan penting
- Proyek ini adalah scaffold awal dengan routing utama, helper HTTP, API kursus, store, dan halaman dasar.
- Endpoint dan format respons API harus dicocokkan lagi dengan dokumentasi Delcom Open API dan akun uji.
- Fitur autentikasi, profil, upload, semua modal, dan pengujian coverage 100% masih perlu diselaraskan dengan file latihan SvelteKit 2.2 yang digunakan di kelas. Jangan menganggap coverage 100% sebelum menjalankan dan memeriksa laporan.
