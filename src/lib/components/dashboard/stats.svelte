<script lang="ts">
	import ListTodo from '@lucide/svelte/icons/list-todo';
	import Clock from '@lucide/svelte/icons/clock';
	import CheckCheck from '@lucide/svelte/icons/check-check';

	let {
		total = 0,
		pending = 0,
		completed = 0
	}: {
		total: number;
		pending: number;
		completed: number;
	} = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
	<div class="card-elevated flex items-center gap-4 p-5">
		<div class="flex size-10 items-center justify-center rounded-lg bg-primary/10">
			<ListTodo class="size-5 text-primary" />
		</div>
		<div>
			<p class="text-2xl font-semibold">{total}</p>
			<p class="text-xs text-muted-foreground">Total Tasks</p>
		</div>
	</div>

	<div class="card-elevated flex items-center gap-4 p-5">
		<div class="flex size-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20">
			<Clock class="size-5 text-orange-600 dark:text-orange-400" />
		</div>
		<div>
			<p class="text-2xl font-semibold">{pending}</p>
			<p class="text-xs text-muted-foreground">Pending</p>
		</div>
	</div>

	<div class="card-elevated flex items-center gap-4 p-5">
		<div class="flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
			<CheckCheck class="size-5 text-green-600 dark:text-green-400" />
		</div>
		<div>
			<p class="text-2xl font-semibold">{completed}</p>
			<p class="text-xs text-muted-foreground">Completed</p>
		</div>
	</div>
</div>
