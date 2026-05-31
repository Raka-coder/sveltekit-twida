<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolveRoute } from '$app/paths';
	import { Button } from '$lib/components/ui/button';

	let {
		form,
		error
	}: {
		form: { message?: string } | null;
		error?: string;
	} = $props();
</script>

<form method="post" action="?/signUpEmail" use:enhance class="flex flex-col gap-6">
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
	{#if error}
		<p class="text-xs text-destructive">{error}</p>
	{/if}
	<Button type="submit" class="mt-2 w-full py-5 text-sm font-medium tracking-wide">
		Buat Akun
	</Button>
</form>

<p class="mt-8 text-center text-xs text-muted-foreground/60">
	Sudah punya akun?&nbsp;
	<a href={resolveRoute('/login')} class="font-medium text-primary underline decoration-primary/30 decoration-1 underline-offset-4 transition hover:decoration-primary/60">Masuk</a>
</p>

{#if form?.message}
	<div class="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-destructive/10 px-5 py-2 text-xs text-destructive backdrop-blur-sm" style="animation: fade-up 0.3s ease-out both;">
		{form.message}
	</div>
{/if}
