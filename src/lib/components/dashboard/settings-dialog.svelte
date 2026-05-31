<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { m } from '$paraglide/messages.js';

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
			? m.password_minlength()
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
				error = data.message || m.failed_change_password();
				return;
			}

			success = true;
			clearFields();
		} catch {
			error = m.unexpected_error();
		} finally {
			isSaving = false;
		}
	}
</script>

<Dialog.Root bind:open onOpenChange={(o) => { if (!o) onClose(); }}>
	<Dialog.Content class="sm:max-w-sm">
		<Dialog.Header>
			<Dialog.Title>{m.change_password()}</Dialog.Title>
			<Dialog.Description>{m.change_password_desc()}</Dialog.Description>
		</Dialog.Header>

		<form onsubmit={handleSubmit} class="flex flex-col gap-5">
			<div class="space-y-2">
				<Label for="current-password">{m.current_password()}</Label>
				<Input
					id="current-password"
					type="password"
					bind:value={currentPassword}
					placeholder={m.current_password_placeholder()}
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="new-password">{m.new_password()}</Label>
				<Input
					id="new-password"
					type="password"
					bind:value={newPassword}
					placeholder={m.new_password_placeholder()}
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
				<p class="text-xs text-green-600 dark:text-green-400">{m.password_changed()}</p>
			{/if}

			<Dialog.Footer>
				<Button type="submit" disabled={!isValid || isSaving}>
					{isSaving ? m.saving() : m.change_password()}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
