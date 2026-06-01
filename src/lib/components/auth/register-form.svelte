<script lang="ts">
	import * as m from '$paraglide/messages';
	import { enhance } from '$app/forms';
	import { resolveRoute } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import Eye from '@lucide/svelte/icons/eye';
	import EyeOff from '@lucide/svelte/icons/eye-off';

	let {
		form,
		error,
		errors,
		values
	}: {
		form: { message?: string } | null;
		error?: string;
		errors?: { name?: string; email?: string; password?: string };
		values?: { name?: string; email?: string };
	} = $props();

	let showPassword = $state(false);
</script>

<form method="post" action="?/signUpEmail" use:enhance class="flex flex-col gap-6">
	<div>
		<label class="mb-1.5 block text-xs font-medium text-muted-foreground" for="name">{m.name_label()}</label>
		<input
			id="name"
			name="name"
			placeholder="Nama lengkap"
			required
			value={values?.name ?? ''}
			aria-invalid={errors?.name ? 'true' : undefined}
			class="input-underline w-full"
		/>
		{#if errors?.name}
			<p class="mt-1 text-xs text-destructive">{errors.name}</p>
		{/if}
	</div>
	<div>
		<label class="mb-1.5 block text-xs font-medium text-muted-foreground" for="email">{m.email()}</label>
		<input
			id="email"
			type="email"
			name="email"
			placeholder="nama@email.com"
			required
			value={values?.email ?? ''}
			aria-invalid={errors?.email ? 'true' : undefined}
			class="input-underline w-full"
		/>
		{#if errors?.email}
			<p class="mt-1 text-xs text-destructive">{errors.email}</p>
		{/if}
	</div>
	<div class="relative">
		<label class="mb-1.5 block text-xs font-medium text-muted-foreground" for="password">{m.password()}</label>
		<div class="relative">
			<input
				id="password"
				type={showPassword ? 'text' : 'password'}
				name="password"
				placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
				required
				aria-invalid={errors?.password ? 'true' : undefined}
				class="input-underline w-full pr-10"
			/>
			<button
				type="button"
				aria-label={showPassword ? 'Hide password' : 'Show password'}
				class="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/50 transition hover:text-primary"
				onclick={() => (showPassword = !showPassword)}
			>
				{#if showPassword}
					<EyeOff class="size-4" />
				{:else}
					<Eye class="size-4" />
				{/if}
			</button>
		</div>
		{#if errors?.password}
			<p class="mt-1 text-xs text-destructive">{errors.password}</p>
		{/if}
	</div>
	{#if error}
		<p class="text-xs text-destructive">{error}</p>
	{/if}
	<Button type="submit" class="mt-2 w-full py-5 text-sm font-medium tracking-wide">
		{m.create_account()}
	</Button>
</form>

<p class="mt-8 text-center text-xs text-muted-foreground/60">
	{m.has_account()}&nbsp;
	<a href={resolveRoute('/login')} class="font-medium text-primary underline decoration-primary/30 decoration-1 underline-offset-4 transition hover:decoration-primary/60">{m.login_link()}</a>
</p>

{#if form?.message}
	<div class="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-destructive/10 px-5 py-2 text-xs text-destructive backdrop-blur-sm" style="animation: fade-up 0.3s ease-out both;">
		{form.message}
	</div>
{/if}
