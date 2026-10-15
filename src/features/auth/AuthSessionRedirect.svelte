<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authApi } from './authApi';
  import { restoreSession, setProfile, clearSession } from './authStore';
  import { userApi } from '../users/userApi';
  let { children } = $props();
  onMount(async () => {
    const token = restoreSession();
    if (!token) return;
    try {
      const result = await userApi.profile();
      const profile = result.data?.user ?? result.data?.profile ?? null;
      if (profile) { setProfile(profile); await goto('/'); }
    } catch { clearSession(); }
  });
</script>
{@render children?.()}
