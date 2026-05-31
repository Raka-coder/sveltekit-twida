<script lang="ts">
	import Inbox from '@lucide/svelte/icons/inbox';

	let {
		filterStatus = 'all'
	}: {
		filterStatus: 'all' | 'pending' | 'completed';
	} = $props();

	const messages = $derived(
		({
			all: { heading: 'No tasks yet', desc: 'Add your first task above to get started.' },
			pending: { heading: 'No pending tasks', desc: 'All caught up! Add new tasks or create some.' },
			completed: {
				heading: 'No completed tasks',
				desc: 'Start checking off tasks to see them here.'
			}
		} as const)[filterStatus]
	);
</script>

<div class="flex flex-col items-center justify-center py-16 text-center">
	<div class="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
		<Inbox class="size-8 text-muted-foreground" />
	</div>
	<h3 class="mb-1 text-base font-medium">{messages.heading}</h3>
	<p class="max-w-xs text-sm text-muted-foreground">{messages.desc}</p>
</div>
