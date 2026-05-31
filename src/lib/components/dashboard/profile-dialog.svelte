<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

	let {
		open = $bindable(false),
		user,
		onClose = () => {}
	}: {
		open: boolean;
		user: { name: string; email: string; image?: string | null };
		onClose: () => void;
	} = $props();

	let name = $state('');
	let nameInit = $state(false);
	let isSaving = $state(false);
	let error = $state('');
	let success = $state(false);

	$effect(() => {
		if (!nameInit && user.name) {
			name = user.name;
			nameInit = true;
		}
	});

	let initials = $derived(
		user.name
			? user.name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.toUpperCase()
					.slice(0, 2)
			: user.email.split('@')[0].slice(0, 2).toUpperCase()
	);

	let isValid = $derived(name.trim().length >= 2);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!isValid) return;

		isSaving = true;
		error = '';
		success = false;

		try {
			const formData = new FormData();
			formData.set('name', name.trim());
			const res = await fetch('?/updateName', { method: 'POST', body: formData });

			if (!res.ok) {
				const data = await res.json();
				error = data.message || 'Failed to update profile';
				return;
			}

			success = true;
			setTimeout(() => window.location.reload(), 800);
		} catch {
			error = 'An unexpected error occurred';
		} finally {
			isSaving = false;
		}
	}
</script>

<Dialog.Root bind:open onOpenChange={(o) => { if (!o) onClose(); }}>
	<Dialog.Content class="sm:max-w-sm">
		<Dialog.Header>
			<Dialog.Title>Edit Profile</Dialog.Title>
			<Dialog.Description>Update your display name.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="flex flex-col gap-6">
			<div class="flex justify-center">
				<Avatar class="size-16">
					<AvatarImage src={user.image ?? ''} alt={user.name} />
					<AvatarFallback class="text-sm">{initials}</AvatarFallback>
				</Avatar>
			</div>

			<div class="space-y-2">
				<Label for="profile-name">Name</Label>
				<Input
					id="profile-name"
					type="text"
					bind:value={name}
					placeholder="Your name"
					required
					minlength={2}
				/>
				{#if name.trim().length > 0 && name.trim().length < 2}
					<p class="text-xs text-destructive">Name must be at least 2 characters</p>
				{/if}
			</div>

			{#if error}
				<p class="text-xs text-destructive">{error}</p>
			{/if}

			{#if success}
				<p class="text-xs text-green-600 dark:text-green-400">Profile updated! Refreshing...</p>
			{/if}

			<Dialog.Footer>
				<Button type="submit" disabled={!isValid || isSaving}>
					{isSaving ? 'Saving...' : 'Save'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
