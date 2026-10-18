<script lang="ts">
  import { GraduationCap } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { authApi } from '$features/auth/authApi';
  import { setSession, setProfile } from '$features/auth/authStore';
  import { userApi } from '$features/users/userApi';
  import { getErrorMessage } from '$lib/toolsHelper';
  let email = $state(''); let password = $state(''); let message = $state('Masuk untuk melihat kursus dan materi pembelajaran.'); let loading = $state(false);
  async function submit(event: SubmitEvent) {
    event.preventDefault(); loading = true; message = '';
    try {
      const result = await authApi.login(email.trim(), password);
      const data = result.data ?? {};
      const token = String(data.access_token ?? data.token ?? (data as any).accessToken ?? '');
      if (!token) throw new Error('Login API berhasil dipanggil, tetapi token tidak ditemukan pada respons data.');
      setSession(token, (data.user ?? data.profile ?? null) as any);
      try { const profileResult = await userApi.profile(); const profile = profileResult.data?.user ?? profileResult.data?.profile ?? (data.user ?? data.profile ?? null); if (profile) setProfile(profile); } catch { /* Token tetap tersimpan; halaman profil bisa dicoba lagi. */ }
      await goto('/');
    } catch (e) { message = getErrorMessage(e); }
    finally { loading = false; }
  }
</script>
<svelte:head><title>Login — Delcom Courses</title></svelte:head>
<div class="auth"><a href="/" class="logo"><GraduationCap size={38}/><span>Delcom Courses</span></a><section><h1>Selamat datang kembali</h1><p>{message}</p><form onsubmit={submit}><label>Email<input type="email" bind:value={email} autocomplete="email" required/></label><label>Kata sandi<input type="password" bind:value={password} autocomplete="current-password" required/></label><button disabled={loading}>{loading ? 'Memproses...' : 'Masuk'}</button></form><p>Belum punya akun? <a href="/auth/register">Daftar</a></p></section></div>
<style>.auth{min-height:100vh;display:grid;place-content:center;background:#f6f8fc;padding:24px}.logo{display:flex;align-items:center;gap:10px;justify-content:center;text-decoration:none;color:#2858c5;font-size:22px;font-weight:bold;margin-bottom:24px}.auth section{background:white;border:1px solid #e4e9f2;border-radius:16px;padding:30px;width:min(430px,90vw)}h1{margin-top:0}p{color:#69758b;line-height:1.5;overflow-wrap:anywhere}form,label{display:grid;gap:8px}form{gap:16px}input{padding:12px;border:1px solid #dce2ed;border-radius:8px;font:inherit}button{padding:12px;border:0;border-radius:8px;background:#2858c5;color:white;font-weight:bold;cursor:pointer}button:disabled{opacity:.6}a{color:#2858c5}</style>
