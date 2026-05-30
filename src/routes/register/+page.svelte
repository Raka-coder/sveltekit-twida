<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Register — Todo App</title>
</svelte:head>

<div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
	<div
		class="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full opacity-[0.03]"
		style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
	></div>

	<div class="card-elevated relative w-full max-w-sm p-10" style="animation: fade-up 0.6s ease-out both;">
		<div class="mb-4">
			<p class="text-xs font-medium tracking-widest text-primary/60 uppercase">Daftar</p>
			<h1 class="mt-1 text-3xl leading-tight">Buat akun baru</h1>
			<p class="mt-1 text-sm text-muted-foreground">Mulai catat tugas kamu</p>
		</div>

		<form method="post" action="?/signUpEmail" use:enhance class="mt-8 flex flex-col gap-6">
			<div>
				<label class="mb-1.5 block text-xs font-medium text-muted-foreground" for="name">Nama</label>
				<input
					id="name"
					name="name"
					placeholder="Nama lengkap"
					required
					class="input-underline w-full"
				/>
			</div>
			<div>
				<label class="mb-1.5 block text-xs font-medium text-muted-foreground" for="email">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="nama@email.com"
					required
					class="input-underline w-full"
				/>
			</div>
			<div>
				<label class="mb-1.5 block text-xs font-medium text-muted-foreground" for="password">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
					required
					class="input-underline w-full"
				/>
			</div>
			<Button type="submit" class="mt-2 w-full py-5 text-sm font-medium tracking-wide">
				Buat Akun
			</Button>
		</form>

		<p class="mt-8 text-center text-xs text-muted-foreground/60">
			Sudah punya akun?&nbsp;
			<a href={resolve('/login')} class="font-medium text-primary underline decoration-primary/30 decoration-1 underline-offset-4 transition hover:decoration-primary/60">Masuk</a>
		</p>
	</div>

	{#if form?.message}
		<div class="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-destructive/10 px-5 py-2 text-xs text-destructive backdrop-blur-sm" style="animation: fade-up 0.3s ease-out both;">
			{form.message}
		</div>
	{/if}
</div>
