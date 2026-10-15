<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { ArrowLeft, BookOpen, Video } from 'lucide-svelte';
  import { courseApi, type Course } from '../api/courseApi';
  import { getErrorMessage } from '$lib/toolsHelper';
  let course: Course | null = $state(null);
  let loading = $state(true);
  let error = $state('');
  const courseId = $derived(page.params.courseId ?? '');
  onMount(async () => {
    try { const response = await courseApi.detail(courseId); course = response.data?.course ?? null; }
    catch (e) { error = getErrorMessage(e); }
    finally { loading = false; }
  });
</script>
<svelte:head><title>{course?.title ?? 'Detail Kursus'} — Delcom Courses</title></svelte:head>
<a class="back" href="/"><ArrowLeft size={17}/> Kembali ke semua kursus</a>
{#if loading}<p>Memuat detail kursus...</p>
{:else if error}<p class="error">{error}</p>
{:else if course}
  {#if course.cover}<img class="cover" src={course.cover} alt={`Sampul ${course.title}`}/>{:else}<div class="cover placeholder"><BookOpen size={42}/></div>{/if}
  <section class="panel"><p class="eyebrow">DETAIL KURSUS</p><h1>{course.title}</h1><p class="description">{course.description}</p>
    <div class="section-title"><Video size={20}/><h2>Materi Kursus</h2></div>
    <p class="muted">Daftar materi akan ditampilkan setelah data konten tersedia dari API.</p>
  </section>
{/if}
<style>
.back{display:inline-flex;align-items:center;gap:8px;color:#2858c5;text-decoration:none;margin-bottom:20px}.cover{width:100%;max-height:300px;object-fit:cover;border-radius:14px}.placeholder{height:180px;display:grid;place-items:center;background:#e8efff;color:#4266bc}.panel{background:white;border:1px solid #e5eaf3;border-radius:14px;padding:26px;margin-top:20px}.eyebrow{font-size:12px;letter-spacing:2px;color:#526fc0;font-weight:bold}h1{font-size:30px;margin:6px 0 12px}.description,.muted{color:#69758b;line-height:1.6}.section-title{display:flex;align-items:center;gap:10px;margin-top:30px;color:#2858c5}.section-title h2{color:#172033;font-size:20px}.error{color:#b42318}
</style>
