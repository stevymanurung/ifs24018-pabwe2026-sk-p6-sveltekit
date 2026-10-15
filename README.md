# ifs24018-pabwe2026-sk-p6-sveltekit

Aplikasi praktikum Delcom Courses menggunakan SvelteKit, TypeScript, Svelte 5, dan API Delcom.

## Konfigurasi
File `.env` memakai base URL yang diminta modul:

```env
VITE_DELCOM_BASEURL=https://open-api.delcom.org/api/v1
APP_PORT=3005
```

## Menjalankan

```bash
bun install
bun run dev
```

Buka `http://localhost:3005`.

Untuk build produksi:

```bash
bun run build
bun start
```

## Implementasi yang tersedia
- Login `POST /auth/login` dan register `POST /auth/register`.
- Token disimpan pada `localStorage` dan dipakai sebagai `Authorization: Bearer ...` untuk request terautentikasi.
- Profil dan daftar pengguna melalui `userApi.ts`, termasuk edit profil, upload foto, dan ubah kata sandi.
- API kursus untuk daftar/detail/tambah/ubah/hapus, sampul, peserta, rating, dan materi.
- Materi memakai detail `GET /courses/-/contents/:id` dan status belajar `0/1`.

## Catatan
Endpoint API pengguna dan bentuk respons bisa berbeda dari versi server yang aktif. Jika server mengembalikan `404` atau nama field berbeda, cocokkan path dan field dengan dokumentasi API Delcom yang dipakai dosen. Belum ada klaim bahwa semua pengujian coverage 100% sudah lulus; jalankan `bun run check`, `bun run test:coverage`, dan `bun run build` lalu perbaiki pesan error yang muncul.
