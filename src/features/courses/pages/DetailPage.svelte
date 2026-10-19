
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { ArrowLeft, BookOpen, Video, Plus } from 'lucide-svelte';
  import { courseApi, type Course, type CourseContent } from '../api/courseApi';
  import { getErrorMessage } from '$lib/toolsHelper';
  import { authToken, authProfile } from '$features/auth/authStore';

  let course = $state<Course | null>(null);
  let loading = $state(true);
  let error = $state('');
  let title = $state('');
  let description = $state('');
  let videoUrl = $state('');
  let showAdd = $state(false);
  let busy = $state(false);
  let rating = $state(5);

  const courseId = $derived(page.params.courseId ?? '');

  async function load() {
    loading = true;
    error = '';

    try {
      const r = await courseApi.detail(courseId);
      course = r.data?.course ?? null;
    } catch (e) {
      error = getErrorMessage(e);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    void load();
  });

  async function join() {
    busy = true;
    error = '';

    try {
      await courseApi.join(courseId);
      await load();
    } catch (e) {
      error = getErrorMessage(e);
    } finally {
      busy = false;
    }
  }

  async function leave() {
    busy = true;
    error = '';

    try {
      await courseApi.leave(courseId);
      await load();
    } catch (e) {
      error = getErrorMessage(e);
    } finally {
      busy = false;
    }
  }

  async function rateCourse() {
    busy = true;
    error = '';

    try {
      await courseApi.rate(courseId, Number(rating));
      await load();
    } catch (e) {
      error = getErrorMessage(e);
    } finally {
      busy = false;
    }
  }

  async function addContent(e: SubmitEvent) {
    e.preventDefault();
    busy = true;
    error = '';

    try {
      await courseApi.addContent(
        courseId,
        title.trim(),
        description.trim(),
        videoUrl.trim()
      );

      title = '';
      description = '';
      videoUrl = '';
      showAdd = false;

      await load();
    } catch (e) {
      error = getErrorMessage(e);
    } finally {
      busy = false;
    }
  }

  async function deleteContent(id: string | number) {
    if (!confirm('Hapus materi ini?')) return;

    try {
      await courseApi.removeContent(id);
      await load();
    } catch (e) {
      error = getErrorMessage(e);
    }
  }

  const contents = $derived(
    (course?.contents ?? (course as any)?.course_contents ?? []) as CourseContent[]
  );

  const isStudent = $derived(
    Boolean(
      course?.students?.some(
        (s) => String(s.id ?? s.user_id) === String($authProfile?.id)
      )
    )
  );
</script>

<svelte:head>
  <title>{course?.title ?? 'Detail Kursus'} — Delcom Courses</title>
</svelte:head>

<a class="back" href="/">
  <ArrowLeft size={17} />
  Kembali ke semua kursus
</a>

{#if loading}
  <p>Memuat detail kursus...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if course}
  {#if course.cover}
    <img class="cover" src={course.cover} alt={`Sampul ${course.title}`} />
  {:else}
    <div class="cover placeholder">
      <BookOpen size={42} />
    </div>
  {/if}

  <section class="panel">
    <p class="eyebrow">DETAIL KURSUS</p>
    <h1>{course.title}</h1>
    <p class="description">{course.description}</p>

    {#if $authToken}
      <div class="actions">
        {#if isStudent}
          <button class="secondary" onclick={leave} disabled={busy}>
            Keluar dari kursus
          </button>
        {:else}
          <button class="primary" onclick={join} disabled={busy}>
            Daftar sebagai peserta
          </button>
        {/if}

        <label>
          Rating
          <select bind:value={rating}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button class="secondary" onclick={rateCourse} disabled={busy}>
            Kirim rating
          </button>
        </label>
      </div>
    {:else}
      <p>
        <a href="/auth/login">Login</a> untuk mendaftar sebagai peserta dan memberi rating.
      </p>
    {/if}

    <div class="section-title">
      <Video size={20} />
      <h2>Materi Kursus</h2>

      {#if $authToken}
        <button class="primary" onclick={() => (showAdd = !showAdd)}>
          <Plus size={16} />
          Tambah Materi
        </button>
      {/if}
    </div>

    {#if showAdd}
      <form class="add" onsubmit={addContent}>
        <label>
          Judul materi
          <input bind:value={title} required />
        </label>

        <label>
          Deskripsi
          <textarea bind:value={description} rows="2"></textarea>
        </label>

        <label>
          URL YouTube
          <input
            type="url"
            bind:value={videoUrl}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </label>

        <button class="primary" disabled={busy}>Simpan Materi</button>
      </form>
    {/if}

    {#if contents.length}
      <div class="contents">
        {#each contents as item (item.id)}
          <article>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description ?? ''}</p>
            </div>

            <a href={`/courses/${course.id}/contents/${item.id}`}>
              Buka materi →
            </a>

            {#if $authToken}
              <button class="delete" onclick={() => void deleteContent(item.id)}>
                Hapus
              </button>
            {/if}
          </article>
        {/each}
      </div>
    {:else}
      <p class="muted">Belum ada materi pada kursus ini.</p>
    {/if}
  </section>
{/if}

<style>
  .back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #2858c5;
    text-decoration: none;
    margin-bottom: 20px;
  }

  .cover {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 14px;
  }

  .placeholder {
    height: 180px;
    display: grid;
    place-items: center;
    background: #e8efff;
    color: #4266bc;
  }

  .panel {
    background: white;
    border: 1px solid #e5eaf3;
    border-radius: 14px;
    padding: 26px;
    margin-top: 20px;
  }

  .eyebrow {
    font-size: 12px;
    letter-spacing: 2px;
    color: #526fc0;
    font-weight: bold;
  }

  h1 {
    font-size: 30px;
    margin: 6px 0 12px;
  }

  .description,
  .muted {
    color: #69758b;
    line-height: 1.6;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    color: #2858c5;
    flex-wrap: wrap;
  }

  .section-title h2 {
    color: #172033;
    font-size: 20px;
    flex: 1;
  }

  .primary,
  .secondary,
  .delete {
    border: 0;
    border-radius: 8px;
    padding: 10px 13px;
    cursor: pointer;
    font-weight: bold;
  }

  .primary {
    background: #2858c5;
    color: white;
  }

  .secondary {
    background: #edf0f6;
    color: #34415a;
  }

  .delete {
    background: #fff0f0;
    color: #a52b35;
  }

  .actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .actions label {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .add {
    display: grid;
    gap: 12px;
    padding: 16px;
    background: #f8faff;
    border-radius: 10px;
  }

  .add label {
    display: grid;
    gap: 6px;
  }

  .add input,
  .add textarea,
  select {
    padding: 9px;
    border: 1px solid #dce2ed;
    border-radius: 8px;
    font: inherit;
  }

  .contents {
    display: grid;
    gap: 10px;
  }

  .contents article {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    padding: 14px;
    border: 1px solid #e8ecf4;
    border-radius: 10px;
    flex-wrap: wrap;
  }

  .contents p {
    color: #69758b;
    margin: 6px 0 0;
  }

  .contents a {
    color: #2858c5;
    text-decoration: none;
  }

  .error {
    color: #b42318;
  }
</style>
