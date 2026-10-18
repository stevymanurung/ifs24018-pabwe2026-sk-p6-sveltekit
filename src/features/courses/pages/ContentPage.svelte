<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { ArrowLeft, Video } from 'lucide-svelte';
  import { courseApi, type CourseContent } from '../api/courseApi';
  import { getYouTubeEmbedUrl, getErrorMessage } from '$lib/toolsHelper';
  let content: CourseContent | null = $state(null);
  let loading = $state(true);
  let error = $state('');
  let completed = $state(false);
  const contentId = $derived(page.params.contentId ?? '');
  onMount(async () => {
    try {
      const response = await courseApi.contentDetail(contentId);
      content = response.data?.course_content ?? null;
      completed = content?.is_completed === 1;
    } catch (e) { error = getErrorMessage(e); }
    finally { loading = false; }
  });
  async function toggleCompleted() {
    if (!content) return;
    const next: 0 | 1 = completed ? 0 : 1;
    try { await courseApi.setContentProgress(content.id, next); completed = next === 1; }
    catch (e) { error = getErrorMessage(e); }
  }
  let embedUrl = $derived(content?.video_url ? getYouTubeEmbedUrl(content.video_url) : null);
</script>
<svelte:head><title>{content?.title ?? 'Materi Kursus'} — Delcom Courses</title></svelte:head>
<a class="back" href={`/courses/${page.params.courseId ?? ''}`}><ArrowLeft size={17}/> Kembali ke kursus</a>
{#if loading}<p>Memuat materi...</p>
{:else if error}<p class="error">{error}</p>
{:else if content}
  <section class="panel"><div class="heading"><Video size={24}/><div><p class="eyebrow">MATERI KURSUS</p><h1>{content.title}</h1></div></div>
    <p class="description">{content.description}</p>
    {#if embedUrl}<div class="video"><iframe src={embedUrl} title={content.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    {:else}<p class="muted">Tautan video YouTube belum tersedia atau format tautan tidak valid.</p>{/if}
    <label class="check"><input type="checkbox" checked={completed} onchange={() => void toggleCompleted()}/> Tandai materi selesai</label>
  </section>
{/if}
<style>
.back{display:inline-flex;gap:8px;align-items:center;text-decoration:none;color:#2858c5;margin-bottom:20px}.panel{background:#fff;border:1px solid #e5eaf3;border-radius:14px;padding:26px}.heading{display:flex;align-items:center;gap:14px;color:#2858c5}.eyebrow{font-size:12px;letter-spacing:2px;font-weight:bold}h1{margin:4px 0;font-size:28px;color:#172033}.description,.muted{color:#69758b;line-height:1.6}.video{position:relative;aspect-ratio:16/9;margin:22px 0}.video iframe{position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:12px}.check{display:flex;gap:10px;align-items:center}.error{color:#b42318}
</style>
