<script lang="ts">
  import { page } from '$app/state';
  import CourseLayout from '../features/courses/layouts/CourseLayout.svelte';
  let { children } = $props();
  let isAuthRoute = $derived(page.url.pathname.startsWith('/auth'));
</script>
{#if isAuthRoute}
  {@render children?.()}
{:else}
  <CourseLayout>{@render children?.()}</CourseLayout>
{/if}
