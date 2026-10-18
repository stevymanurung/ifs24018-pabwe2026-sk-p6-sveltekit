<script lang="ts">
  import { onMount } from 'svelte';
  import { userApi } from '$features/users/userApi';
  import { getErrorMessage } from '$lib/toolsHelper';
  import type { AuthProfile } from '$features/auth/authStore';
  let users: AuthProfile[] = $state([]); let loading = $state(true); let error = $state('');
  onMount(async () => { try { const response = await userApi.list(); users = response.data?.users ?? response.data?.data ?? []; } catch(e) { error = getErrorMessage(e); } finally { loading = false; } });
</script>
<svelte:head><title>Pengguna — Delcom Courses</title></svelte:head><section class="panel"><h1>Daftar Pengguna</h1>{#if loading}<p>Memuat pengguna...</p>{:else if error}<p class="error">{error}</p>{:else if users.length===0}<p>Data pengguna belum tersedia.</p>{:else}<div class="list">{#each users as user, i (`${user.id ?? user.email ?? i}`)}<article><div class="avatar">{(user.name ?? user.email ?? 'U').slice(0,1).toUpperCase()}</div><div><strong>{user.name ?? 'Tanpa nama'}</strong><p>{user.email ?? '-'}</p></div></article>{/each}</div>{/if}</section>
<style>.panel{background:white;border:1px solid #e5eaf3;border-radius:14px;padding:24px}h1{margin-top:0}.list{display:grid;gap:12px}article{display:flex;align-items:center;gap:12px;border-bottom:1px solid #edf0f5;padding:10px 0}.avatar{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#e8efff;color:#2858c5;font-weight:bold}p{color:#69758b;margin:4px 0}.error{color:#b42318}</style>
