<script lang="ts">
  import { page } from '$app/state';
</script>
<svelte:head><title>Halaman tidak ditemukan — Delcom Courses</title></svelte:head>
<section class="error-page"><h1>{page.status}</h1><h2>Halaman tidak ditemukan</h2><p>Alamat yang kamu buka tidak tersedia.</p><a href="/">Kembali ke beranda</a></section>
<style>.error-page{max-width:600px;margin:12vh auto;text-align:center;padding:30px}.error-page h1{font-size:64px;color:#2858c5;margin:0}.error-page a{color:#2858c5}</style>
