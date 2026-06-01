<script lang="ts">
	import { m } from '$paraglide/messages.js';
	import { Button } from '$lib/components/ui/button';

	let taglineParts = $derived.by(() => {
		const full = m.tagline();
		const idx = full.indexOf(' ');
		return {
			first: idx > 0 ? full.slice(0, idx) : full,
			rest: idx > 0 ? full.slice(idx + 1) : ''
		};
	});
</script>

<section class="relative overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 pt-20 pb-28 sm:px-10 sm:pt-32 sm:pb-40">
		<div class="relative">
			<span
				class="fade-up block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
				style="animation-delay: 0ms;"
			>
				{m.hero_label()}
			</span>

			<h1
				class="fade-up mt-8 max-w-5xl text-6xl font-light tracking-tighter text-balance text-foreground sm:text-8xl"
				style="font-variation-settings: 'opsz' 144, 'SOFT' 30; animation-delay: 100ms;"
			>
				<span
					class="italic"
					style="font-variation-settings: 'opsz' 144, 'SOFT' 80;"
				>
					{taglineParts.first}
				</span> {taglineParts.rest}
			</h1>

			<p
				class="fade-up mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
				style="animation-delay: 200ms;"
			>
				{m.tagline_id()}
			</p>

			<div
				class="fade-up mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
				style="animation-delay: 300ms;"
			>
				<Button size="lg" href="/login" class="h-11 px-8">
					{m.cta_start()}
				</Button>
				<Button variant="outline" size="lg" href="/#features" class="h-11 px-8">
					{m.hero_secondary_cta()}
				</Button>
			</div>
		</div>
	</div>

	<div
		class="pointer-events-none absolute top-1/2 right-0 font-mono text-[10rem] leading-none text-foreground opacity-[0.04] sm:text-[18rem] lg:text-[24rem]"
		style="transform: translate(12%, -50%) rotate(-8deg);"
		aria-hidden="true"
	>
		01
	</div>
</section>

<style>
	.fade-up {
		animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
</style>
