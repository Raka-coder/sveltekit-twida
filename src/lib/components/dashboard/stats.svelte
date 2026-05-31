<script lang="ts">
	let { total, pending, completed }: { total: number; pending: number; completed: number } = $props();
</script>

<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
	<div class="card-elevated flex flex-col justify-between p-5 transition-transform hover:scale-[1.02]">
		<div class="text-[10px] font-bold tracking-widest text-muted-foreground/50 uppercase">Total Tasks</div>
		<div class="mt-2 font-display text-3xl font-bold">{total}</div>
	</div>
	<div class="card-elevated flex flex-col justify-between border-primary/20 bg-primary/3 p-5 transition-transform hover:scale-[1.02]">
		<div class="text-[10px] font-bold tracking-widest text-primary/70 uppercase">Pending</div>
		<div class="mt-2 font-display text-3xl font-bold text-primary">{pending}</div>
	</div>
	<div class="card-elevated flex flex-col justify-between p-5 transition-transform hover:scale-[1.02]">
		<div class="text-[10px] font-bold tracking-widest text-emerald-500/70 uppercase">Completed</div>
		<div class="mt-2 font-display text-3xl font-bold text-emerald-500">{completed}</div>
	</div>
</div>
