<script lang="ts">
	import * as m from '$paraglide/messages';
	import { enhance } from '$app/forms';
	import { resolveRoute } from '$app/paths';
	import { Button } from '$lib/components/ui/button';
	import GitHubButton from './github-button.svelte';
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
		errors?: { email?: string; password?: string };
		values?: { email?: string };
	} = $props();

	let showPassword = $state(false);
</script>

<form method="post" action="?/signInEmail" use:enhance class="flex flex-col gap-6">
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
		{m.login_button()}
	</Button>
</form>

<div class="divider-decorative my-8">
	<span class="text-[10px] font-medium tracking-widest text-muted-foreground/50 uppercase">{m.or()}</span>
</div>

<form method="post" action="?/signInSocial" use:enhance>
	<input type="hidden" name="provider" value="github" />
	<input type="hidden" name="callbackURL" value="/dashboard" />
	<GitHubButton />
</form>

<p class="mt-8 text-center text-xs text-muted-foreground/60">
	{m.no_account()}&nbsp;
	<a href={resolveRoute('/register')} class="font-medium text-primary underline decoration-primary/30 decoration-1 underline-offset-4 transition hover:decoration-primary/60">{m.register_link()}</a>
</p>

{#if form?.message}
	<div class="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-destructive/10 px-5 py-2 text-xs text-destructive backdrop-blur-sm" style="animation: fade-up 0.3s ease-out both;">
		{form.message}
	</div>
{/if}
