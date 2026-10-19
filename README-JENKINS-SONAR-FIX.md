# Jenkins, SonarQube, dan Coverage Fix

Paket ini mempertahankan source aplikasi Stevy dan menyesuaikan pipeline ke pola Jenkins teman: stage Docker, Trivy, SonarQube, Quality Gate, packaging, publish, dan deploy.

## Perubahan utama
- Jenkinsfile menggunakan container Docker Node 24 untuk npm/test/check/build, bukan `tools { nodejs ... }` atau runtime host.
- Install menggunakan `npm ci` jika `package-lock.json` tersedia.
- Coverage reporter menyertakan `lcov`, agar SonarQube dapat membaca `coverage/lcov.info`.
- Sonar project key/name menggunakan `ifs24018-pabwe2026-sk-p6-sveltekit`.
- `toolsHelper.ts` menghilangkan fallback nullish yang tidak dapat tercapai setelah pemeriksaan prefix, untuk menghapus branch yang tidak teruji. Test mencakup empty embed/shorts IDs.
- Coverage threshold 100% untuk statements, branches, functions, lines di seluruh modul aplikasi (apiHelper, toolsHelper, useInput, authApi, authStore, courseApi, coursesStore, userApi, hooks.server).

## Sebelum push
1. Pastikan Jenkins memiliki Docker Pipeline, SonarQube Scanner integration, Quality Gate webhook, Warnings NG/SARIF, Pipeline Utility Steps, dan akses Docker yang digunakan pipeline.
2. Pastikan konfigurasi server SonarQube bernama `SonarQube`.
3. Pastikan environment/credentials untuk publish dan deploy (URL, token, website ID) tersedia di job seperti pada pipeline referensi teman. Tahap deployment bergantung pada konfigurasi server tersebut.
4. Jalankan `npm ci`, `npm run test:coverage`, `npm run check`, dan `npm run build` secara lokal sebelum push.

Pipeline belum dapat dinyatakan sukses sampai dijalankan pada Jenkins aktual.
