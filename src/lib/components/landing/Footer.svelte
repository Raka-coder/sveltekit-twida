<script lang="ts">
	import { m } from '$paraglide/messages.js';
	let year = new Date().getFullYear();
</script>

<footer class="relative pt-16 pb-10 sm:pt-24">
	<div class="mx-auto max-w-7xl px-6 sm:px-10">
		<div class="h-px w-full bg-border"></div>

		<div class="pt-12 sm:pt-20">
			<h2
				class="fade-up font-display text-7xl font-light tracking-tighter text-foreground sm:text-9xl"
				style="font-variation-settings: 'opsz' 144, 'SOFT' 0, 'wght' 280;"
			>
				Todo.
			</h2>
		</div>

		<div
			class="mt-10 flex flex-col gap-8 sm:mt-16 sm:flex-row sm:items-end sm:justify-between"
		>
			<p
				class="fade-up font-mono text-sm text-muted-foreground"
				style="animation-delay: 150ms;"
			>
				{m.footer_tagline()}
			</p>
			<div
				class="fade-up flex flex-col gap-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase sm:flex-row sm:items-center sm:gap-3"
				style="animation-delay: 300ms;"
			>
				<span>© {year} {m.app_name()}</span>
				<span class="hidden opacity-40 sm:inline">—</span>
				<span>{m.tech_stack()}</span>
			</div>
		</div>
	</div>
</footer>

<style>
	.fade-up {
		animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
</style>
