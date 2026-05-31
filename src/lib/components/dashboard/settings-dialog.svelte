<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

	let {
		open = $bindable(false),
		onClose = () => {}
	}: {
		open: boolean;
		onClose: () => void;
	} = $props();

	let currentPassword = $state('');
	let newPassword = $state('');
	let isSaving = $state(false);
	let error = $state('');
	let success = $state(false);

	let isValid = $derived(currentPassword.length > 0 && newPassword.length >= 8);
	let passwordError = $derived(
		newPassword.length > 0 && newPassword.length < 8
			? 'Password must be at least 8 characters'
			: ''
	);

	function clearFields() {
		currentPassword = '';
		newPassword = '';
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!isValid) return;

		isSaving = true;
		error = '';
		success = false;

		try {
			const formData = new FormData();
			formData.set('currentPassword', currentPassword);
			formData.set('newPassword', newPassword);
			const res = await fetch('?/changePassword', { method: 'POST', body: formData });

			if (!res.ok) {
				const data = await res.json();
				error = data.message || 'Failed to change password';
				return;
			}

			success = true;
			clearFields();
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
			<Dialog.Title>Change Password</Dialog.Title>
			<Dialog.Description>Update your account password.</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="flex flex-col gap-5">
			<div class="space-y-2">
				<Label for="current-password">Current Password</Label>
				<Input
					id="current-password"
					type="password"
					bind:value={currentPassword}
					placeholder="Enter current password"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="new-password">New Password</Label>
				<Input
					id="new-password"
					type="password"
					bind:value={newPassword}
					placeholder="At least 8 characters"
					required
					minlength={8}
				/>
				{#if passwordError}
					<p class="text-xs text-destructive">{passwordError}</p>
				{/if}
			</div>

			{#if error}
				<p class="text-xs text-destructive">{error}</p>
			{/if}

			{#if success}
				<p class="text-xs text-green-600 dark:text-green-400">Password changed successfully!</p>
			{/if}

			<Dialog.Footer>
				<Button type="submit" disabled={!isValid || isSaving}>
					{isSaving ? 'Saving...' : 'Change Password'}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
