<script lang="ts">
  import { page } from '$app/state';
  import CourseLayout from '../features/courses/layouts/CourseLayout.svelte';
  let { children } = $props();
  let isAuthRoute = $derived(page.url.pathname.startsWith('/auth'));
</script>
<svelte:head>
  <meta name="description" content="Delcom Courses adalah platform pembelajaran untuk menemukan kursus dan mempelajari materi secara online." />
</svelte:head>
{#if isAuthRoute}
  {@render children?.()}
{:else}
  <CourseLayout>{@render children?.()}</CourseLayout>
{/if}
