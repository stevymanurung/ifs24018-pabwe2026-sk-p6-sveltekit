<script lang="ts">
  import { GraduationCap } from 'lucide-svelte';
  let name = $state('');
  let email = $state('');
  let password = $state('');
  let message = $state('Form pendaftaran dasar. Hubungkan ke endpoint autentikasi dari latihan SvelteKit 2.2.');
</script>
<svelte:head><title>Daftar — Delcom Courses</title></svelte:head>
<div class="auth"><a href="/" class="logo"><GraduationCap size={38}/><span>Delcom Courses</span></a><section><h1>Buat akun</h1><p>{message}</p><form onsubmit={(e)=>{e.preventDefault(); message='Integrasi register API belum disambungkan. Gunakan modul auth dari latihan 2.2.';}}><label>Nama<input bind:value={name} required/></label><label>Email<input type="email" bind:value={email} required/></label><label>Kata sandi<input type="password" bind:value={password} required minlength="6"/></label><button>Daftar</button></form><p>Sudah punya akun? <a href="/auth/login">Login</a></p></section></div>
<style>.auth{min-height:100vh;display:grid;place-content:center;background:#f6f8fc;padding:24px}.logo{display:flex;align-items:center;gap:10px;justify-content:center;text-decoration:none;color:#2858c5;font-size:22px;font-weight:bold;margin-bottom:24px}.auth section{background:white;border:1px solid #e4e9f2;border-radius:16px;padding:30px;width:min(430px,90vw)}h1{margin-top:0}p{color:#69758b;line-height:1.5}form,label{display:grid;gap:8px}form{gap:16px}input{padding:12px;border:1px solid #dce2ed;border-radius:8px;font:inherit}button{padding:12px;border:0;border-radius:8px;background:#2858c5;color:white;font-weight:bold;cursor:pointer}a{color:#2858c5}</style>
