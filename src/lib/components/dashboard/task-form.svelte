<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { m } from '$paraglide/messages.js';
	import Plus from '@lucide/svelte/icons/plus';

	let { value = $bindable(), isLoading, onsubmit }: { value: string; isLoading: boolean; onsubmit: () => void } = $props();
</script>

<div class="card-elevated mb-8 p-4 sm:p-6">
	<form onsubmit={(e) => { e.preventDefault(); onsubmit(); }} class="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
		<div class="flex-1">
			<label for="new-task" class="mb-2 block text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
				{m.what_needs_done()}
			</label>
			<input
				id="new-task"
				type="text"
				bind:value
				placeholder={m.add_task_placeholder()}
				class="input-underline w-full text-base sm:text-base"
			/>
		</div>
		<Button type="submit" disabled={isLoading || !value.trim()} size="lg" class="h-10 px-4 shadow-md transition-all hover:shadow-lg active:scale-95">
			<Plus class="mr-2 size-4" />
			<span>{m.add_task()}</span>
		</Button>
	</form>
</div>
