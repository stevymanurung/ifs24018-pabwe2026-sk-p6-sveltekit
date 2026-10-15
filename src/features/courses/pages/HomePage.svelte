<script lang="ts">
  import { onMount } from 'svelte';
  import { Search, Plus, BookOpen, Trash2 } from 'lucide-svelte';
  import { courseApi, type Course } from '../api/courseApi';
  import { getErrorMessage } from '$lib/toolsHelper';
  import { authProfile, authToken } from '$features/auth/authStore';

  let items: Course[] = $state([]);
  let search = $state('');
  let onlyMine = $state(false);
  let loading = $state(false);
  let error = $state('');
  let title = $state('');
  let description = $state('');
  let showAdd = $state(false);

  async function loadCourses() {
    loading = true; error = '';
    try {
      const response = await courseApi.list();
      items = response.data?.courses ?? [];
    } catch (e) { error = getErrorMessage(e); }
    finally { loading = false; }
  }
  async function addCourse() {
    if (!title.trim() || !description.trim()) { error = 'Judul dan deskripsi wajib diisi.'; return; }
    try {
      await courseApi.create(title.trim(), description.trim());
      title = ''; description = ''; showAdd = false; await loadCourses();
    } catch (e) { error = getErrorMessage(e); }
  }
  async function deleteCourse(id: string | number) {
    if (!confirm('Hapus kursus ini?')) return;
    try { await courseApi.remove(id); await loadCourses(); }
    catch (e) { error = getErrorMessage(e); }
  }
  let filtered = $derived(items.filter((course) => course.title.toLowerCase().includes(search.toLowerCase()) && (!onlyMine || String(course.user_id ?? '') === String($authProfile?.id ?? ''))));
  onMount(() => { void loadCourses(); });
</script>

<svelte:head><title>Semua Kursus — Delcom Courses</title></svelte:head>
<section class="heading">
  <div><p class="eyebrow">RUANG BELAJAR</p><h1>Semua Kursus</h1><p class="muted">Temukan kursus dan pelajari materi bersama.</p></div>
  {#if $authToken}<button class="primary" onclick={() => showAdd = !showAdd}><Plus size={18}/> Tambah Kursus</button>{:else}<a class="primary" href="/auth/login">Login untuk mengelola kursus</a>{/if}
</section>
<div class="toolbar">
  <label class="search"><Search size={18}/><input bind:value={search} placeholder="Cari kursus..." /></label>
  {#if $authToken}<label class="filter"><input type="checkbox" bind:checked={onlyMine}/> Kursus saya</label>{/if}
</div>
{#if showAdd}
  <form class="add" onsubmit={(e)=>{e.preventDefault(); void addCourse();}}>
    <h2>Tambah kursus</h2>
    <label>Judul<input bind:value={title} required /></label>
    <label>Deskripsi<textarea bind:value={description} required rows="3"></textarea></label>
    <div class="actions"><button type="button" class="secondary" onclick={() => showAdd = false}>Batal</button><button class="primary" type="submit">Simpan Kursus</button></div>
  </form>
{/if}
{#if error}<p class="error">{error}</p>{/if}
{#if loading}<p class="muted">Memuat kursus...</p>
{:else if filtered.length === 0}<div class="empty"><BookOpen size={36}/><h2>Belum ada kursus</h2><p class="muted">Kursus akan tampil di sini setelah tersedia.</p></div>
{:else}
  <div class="grid">{#each filtered as course (course.id)}
    <article class="course">
      {#if course.cover}<img class="cover" src={course.cover} alt={`Sampul ${course.title}`}/>{:else}<div class="cover placeholder"><BookOpen size={34}/></div>{/if}
      <div class="course-content"><h2>{course.title}</h2><p>{course.description}</p><div class="card-actions"><a href={`/courses/${course.id}`}>Lihat detail →</a>{#if $authToken}<button aria-label={`Hapus ${course.title}`} class="icon-button" onclick={() => void deleteCourse(course.id)}><Trash2 size={17}/></button>{/if}</div></div>
    </article>
  {/each}</div>
{/if}
<style>
  .heading{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:28px}h1{font-size:32px;margin:4px 0 8px}.eyebrow{font-size:12px;letter-spacing:2px;color:#526fc0;font-weight:bold}.muted{color:#778198}.primary,.secondary{border:0;border-radius:9px;padding:11px 15px;display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-weight:700}.primary{background:#2858c5;color:white;text-decoration:none}.secondary{background:#edf0f6;color:#34415a}.toolbar{display:flex;gap:18px;align-items:center;margin-bottom:22px}.search{background:white;border:1px solid #e1e6f0;border-radius:10px;display:flex;align-items:center;gap:10px;padding:0 12px;max-width:500px;flex:1}.search input{border:0;outline:0;padding:13px 0;width:100%;background:transparent}.filter{display:flex;gap:8px;align-items:center;color:#58647a}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px}.course,.add,.empty{background:white;border:1px solid #e5eaf3;border-radius:14px;overflow:hidden}.cover{width:100%;height:150px;object-fit:cover}.placeholder{background:linear-gradient(135deg,#e6edff,#f4f6fc);display:flex;align-items:center;justify-content:center;color:#4568bf}.course-content{padding:18px}.course h2{font-size:18px;margin:0 0 10px}.course p{color:#69758b;min-height:44px;line-height:1.5}.card-actions{display:flex;justify-content:space-between;align-items:center;margin-top:16px}.card-actions a{color:#2858c5;text-decoration:none;font-weight:bold}.icon-button{border:0;background:#fff0f0;color:#bb3434;border-radius:8px;padding:8px;cursor:pointer}.empty{text-align:center;padding:60px 20px;color:#526fc0}.add{padding:22px;margin-bottom:24px;display:grid;gap:14px}.add h2{margin:0}.add label{display:grid;gap:7px}.add input,.add textarea{border:1px solid #dce2ed;border-radius:8px;padding:10px;font:inherit}.actions{display:flex;justify-content:flex-end;gap:10px}.error{color:#b42318;background:#fff0ef;padding:12px;border-radius:8px}@media(max-width:650px){.heading{align-items:flex-start;flex-direction:column}.toolbar{align-items:stretch;flex-direction:column}.filter{padding:6px}}
</style>
