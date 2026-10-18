<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { GraduationCap, BookOpen, Users, UserRound, LogIn, LogOut } from 'lucide-svelte';
  import { clearSession, authProfile, authToken } from '$features/auth/authStore';
  import { onMount } from 'svelte';
  import { restoreSession, setProfile } from '$features/auth/authStore';
  import { userApi } from '$features/users/userApi';
  let { children } = $props();
  onMount(async () => { const token = restoreSession(); if (token) { try { const result = await userApi.profile(); const profile = result.data?.user ?? result.data?.profile ?? null; if (profile) setProfile(profile); } catch { /* Profil dapat dicoba kembali dari halaman profil. */ } } });
  function logout() { clearSession(); void goto('/auth/login'); }
</script>
<svelte:head><title>Delcom Courses</title></svelte:head>
<div class="shell"><header class="topbar"><a class="brand" href="/"><GraduationCap size={28}/> <span>Delcom Courses</span></a><nav><a href="/">Semua Kursus</a><a href="/users">Pengguna</a><a href="/profile">Profil</a>{#if $authToken}<button onclick={logout}><LogOut size={16}/> Keluar</button>{:else}<a href="/auth/login"><LogIn size={16}/> Login</a>{/if}</nav></header><div class="body"><aside><a class:active={page.url.pathname === '/'} href="/"><BookOpen size={18}/> Semua Kursus</a><a class:active={page.url.pathname === '/users'} href="/users"><Users size={18}/> Pengguna</a><a class:active={page.url.pathname === '/profile'} href="/profile"><UserRound size={18}/> Profil</a></aside><main>{@render children?.()}</main></div></div>
<style>:global(*){box-sizing:border-box}:global(body){margin:0;font-family:Arial,sans-serif;background:#f6f8fc;color:#172033}.topbar{min-height:72px;background:white;border-bottom:1px solid #e6eaf2;display:flex;align-items:center;justify-content:space-between;padding:12px 5%;gap:20px}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#243b73;font-weight:800;font-size:20px}nav{display:flex;gap:20px;align-items:center;flex-wrap:wrap}nav a,nav button{color:#45516a;text-decoration:none;display:flex;gap:6px;align-items:center}nav button{border:0;background:#eef2ff;padding:9px 12px;border-radius:8px;cursor:pointer}.body{display:grid;grid-template-columns:230px 1fr;min-height:calc(100vh - 72px)}aside{padding:24px 14px;background:#fff;border-right:1px solid #e6eaf2;display:flex;flex-direction:column;gap:8px}aside a{display:flex;align-items:center;gap:10px;padding:12px;border-radius:10px;text-decoration:none;color:#4a5873}aside a.active,aside a:hover{background:#eaf0ff;color:#2457c5}main{padding:32px;min-width:0}@media(max-width:700px){.body{grid-template-columns:1fr}aside{flex-direction:row;overflow:auto;border-right:0;border-bottom:1px solid #e6eaf2}main{padding:18px}.topbar{padding:12px 18px;align-items:flex-start;flex-direction:column}nav{gap:12px}nav a{font-size:13px}}
</style>
