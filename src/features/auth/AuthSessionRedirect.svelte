<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let authenticated = false;
  export let profileAvailable = false;

  onMount(() => {
    if (authenticated && profileAvailable) void goto('/');
  });
</script>
