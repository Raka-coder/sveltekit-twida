<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Todo App — Organize Your Life</title>
</svelte:head>

<div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
	<div
		class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-[0.04]"
		style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
	></div>
	<div
		class="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-[0.03]"
		style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
	></div>

	<div class="card-elevated relative w-full max-w-lg p-12" style="animation: fade-up 0.6s ease-out both;">
		<div class="mb-3 h-0.5 w-12 rounded-full bg-primary" style="animation: draw-line 0.8s 0.3s ease-out both;"></div>

		<h1 class="mt-6 text-4xl leading-tight" style="animation: fade-up 0.6s 0.15s ease-out both;">
			Todo App
		</h1>
		<p class="mt-2 text-base leading-relaxed text-muted-foreground" style="animation: fade-up 0.6s 0.25s ease-out both;">
			Organize your life. One task at a time.
		</p>
		<p class="mt-1 text-sm leading-relaxed text-muted-foreground/70" style="animation: fade-up 0.6s 0.3s ease-out both;">
			Catat, kelola, dan selesaikan tugas harian kamu.
		</p>

		<div class="mt-10 flex flex-col gap-3" style="animation: fade-up 0.6s 0.4s ease-out both;">
			<Button onclick={() => goto('/login')} class="w-full py-5 text-sm font-medium tracking-wide">
				Mulai Sekarang &rarr;
			</Button>
			<p class="text-center text-xs text-muted-foreground/60">
				Belum punya akun?
				<a href={resolve("/register")} class="font-medium text-primary underline decoration-primary/30 decoration-1 underline-offset-4 transition hover:decoration-primary/60">Daftar</a>
			</p>
		</div>

		<div class="mt-10 grid grid-cols-3 gap-4 border-t border-border/40 pt-8">
			{#each [
				{ icon: '→', label: 'Kerjakan', desc: 'Tambah tugas' },
				{ icon: '✓', label: 'Selesaikan', desc: 'Kelola progres' },
				{ icon: '↻', label: 'Ulangi', desc: 'Rutinitas harian' }
			] as item (item.label)}
				<div class="text-center">
					<div class="text-lg text-primary/70">{item.icon}</div>
					<div class="mt-1 text-xs font-medium">{item.label}</div>
					<div class="mt-0.5 text-[10px] text-muted-foreground/50">{item.desc}</div>
				</div>
			{/each}
		</div>
	</div>

	<p class="mt-6 text-[10px] tracking-widest text-muted-foreground/25 uppercase">
		SvelteKit 5 · Better-Auth · Drizzle ORM
	</p>
</div>
