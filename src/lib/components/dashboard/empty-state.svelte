<script lang="ts">
	import { m } from '$paraglide/messages.js';
	import Inbox from '@lucide/svelte/icons/inbox';

	let {
		filterStatus = 'all'
	}: {
		filterStatus: 'all' | 'pending' | 'completed';
	} = $props();

	const messages = $derived(
		({
			all: { heading: m.no_tasks_yet(), desc: m.no_tasks_desc() },
			pending: { heading: m.no_pending(), desc: m.no_pending_desc() },
			completed: {
				heading: m.no_completed(),
				desc: m.no_completed_desc()
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
