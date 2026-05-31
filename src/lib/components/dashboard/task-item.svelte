<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import Trash2 from '@lucide/svelte/icons/trash-2';

	let {
		task,
		onToggle = (_completed: boolean) => {},
		onDelete = () => {}
	}: {
		task: { id: number; title: string; completed: boolean; priority: number };
		onToggle: (completed: boolean) => void;
		onDelete: () => void;
	} = $props();

	let initialized = $state(false);
	let checked = $state(false);

	$effect(() => {
		if (!initialized) {
			checked = task.completed;
			initialized = true;
		}
	});

	$effect(() => {
		if (checked !== task.completed) {
			onToggle(checked);
		}
	});
</script>

<div
	class="group flex items-center gap-3 border-b border-border/40 px-1 py-3 transition-colors hover:bg-muted/30"
>
	<Checkbox bind:checked /> 

	<span
		class="flex-1 text-sm transition-all {checked
			? 'text-muted-foreground line-through'
			: ''}"
	>
		{task.title}
	</span>

	<Badge variant="outline" class="text-[10px]">
		P{task.priority}
	</Badge>

	<Button
		variant="ghost"
		size="icon-xs"
		onclick={onDelete}
		class="opacity-40 transition-opacity hover:opacity-100 group-hover:opacity-60"
	>
		<Trash2 class="size-3.5 text-destructive" />
	</Button>
</div>
