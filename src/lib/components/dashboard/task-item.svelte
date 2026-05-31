<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { m } from '$paraglide/messages.js';
	import X from '@lucide/svelte/icons/x';

	let { task, onToggle, onDelete }: { 
		task: { title: string; completed: boolean }; 
		onToggle: (completed: boolean) => void;
		onDelete: () => void;
	} = $props();
</script>

<div
	class="group flex items-center gap-3 rounded-xl border border-primary/5 bg-card px-4 py-3.5 transition-all hover:border-primary/20 hover:bg-primary/1 hover:shadow-sm"
	style="opacity: {task.completed ? 0.6 : 1};"
>
	<Checkbox
		checked={task.completed}
		onCheckedChange={(v) => onToggle(!!v)}
		class="size-5 shrink-0"
	/>
	<span
		class="min-w-0 flex-1 truncate text-sm font-medium transition-all sm:text-base"
		style="text-decoration: {task.completed ? 'line-through' : 'none'}; color: {task.completed ? 'var(--muted-foreground)' : 'var(--foreground)'};"
	>
		{task.title}
	</span>
	<Badge variant={task.completed ? 'secondary' : 'default'} class="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight sm:text-xs">
		{task.completed ? m.done() : m.pending()}
	</Badge>
	<Button
		variant="ghost"
		size="icon"
		onclick={onDelete}
		class="h-8 w-8 shrink-0 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100 focus:opacity-100"
	>
		<X class="size-4" />
	</Button>
</div>
