<script lang="ts">
	let {
		badge = '',
		title = '',
		subtitle = '',
		gradientSide = 'left',
		children
	}: {
		badge: string;
		title: string;
		subtitle: string;
		gradientSide?: 'left' | 'right';
		children: import('svelte').Snippet;
	} = $props();
</script>

<div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
	<div
		class="pointer-events-none absolute {gradientSide === 'left' ? '-left-20 top-1/3' : '-right-20 bottom-1/4'} h-72 w-72 rounded-full opacity-[0.03]"
		style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
	></div>

	<div class="card-elevated relative w-full max-w-sm p-10" style="animation: fade-up 0.6s ease-out both;">
		<div class="mb-4">
			<p class="text-xs font-medium tracking-widest text-primary/60 uppercase">{badge}</p>
			<h1 class="mt-1 text-3xl leading-tight">{title}</h1>
			<p class="mt-1 text-sm text-muted-foreground">{subtitle}</p>
		</div>
		{@render children()}
	</div>
</div>
