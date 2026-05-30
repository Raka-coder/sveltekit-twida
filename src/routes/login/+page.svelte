<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { resolve } from '$app/paths';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login — Todo App</title>
</svelte:head>

<div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
	<div
		class="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full opacity-[0.03]"
		style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
	></div>

	<div class="card-elevated relative w-full max-w-sm p-10" style="animation: fade-up 0.6s ease-out both;">
		<div class="mb-4">
			<p class="text-xs font-medium tracking-widest text-primary/60 uppercase">Masuk</p>
			<h1 class="mt-1 text-3xl leading-tight">Welcome back</h1>
			<p class="mt-1 text-sm text-muted-foreground">Silakan masuk ke akun kamu</p>
		</div>

		<form method="post" action="?/signInEmail" use:enhance class="mt-8 flex flex-col gap-6">
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
				Masuk
			</Button>
		</form>

		<div class="divider-decorative my-8">
			<span class="text-[10px] font-medium tracking-widest text-muted-foreground/50 uppercase">atau</span>
		</div>

		<form method="post" action="?/signInSocial" use:enhance>
			<input type="hidden" name="provider" value="github" />
			<input type="hidden" name="callbackURL" value="/dashboard" />
			<Button type="submit" variant="outline" class="w-full gap-2 py-5 text-sm font-medium">
				<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
				Lanjutkan dengan GitHub
			</Button>
		</form>

		<p class="mt-8 text-center text-xs text-muted-foreground/60">
			Belum punya akun?&nbsp;
			<a href={resolve('/register')} class="font-medium text-primary underline decoration-primary/30 decoration-1 underline-offset-4 transition hover:decoration-primary/60">Daftar</a>
		</p>
	</div>

	{#if form?.message}
		<div class="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-destructive/10 px-5 py-2 text-xs text-destructive backdrop-blur-sm" style="animation: fade-up 0.3s ease-out both;">
			{form.message}
		</div>
	{/if}
</div>
