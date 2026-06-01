<script lang="ts">
	import { m } from '$paraglide/messages.js';

	let features = $derived([
		{ num: '01', title: m.feature_auth_title(), desc: m.feature_auth_desc(), icon: '◇' },
		{ num: '02', title: m.feature_crud_title(), desc: m.feature_crud_desc(), icon: '◈' },
		{ num: '03', title: m.feature_isolate_title(), desc: m.feature_isolate_desc(), icon: '◉' },
		{ num: '04', title: m.feature_ui_title(), desc: m.feature_ui_desc(), icon: '○' }
	]);
</script>

<section id="features" class="relative py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 sm:px-10">
		<div
			class="mb-16 flex flex-col gap-6 sm:mb-20 sm:flex-row sm:items-end sm:justify-between sm:gap-16"
		>
			<span class="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
				{m.features_section_label()}
			</span>
			<h2
				class="max-w-2xl font-display text-3xl font-light tracking-tight text-balance text-foreground sm:text-4xl"
				style="font-variation-settings: 'opsz' 144, 'SOFT' 20;"
			>
				{m.features_section_caption()}
			</h2>
		</div>

		<div class="border-t border-border">
			{#each features as feature, i (feature.num)}
				<div
					class="fade-up group border-b border-border transition-colors duration-500 hover:bg-muted/30"
					style="animation-delay: {i * 80}ms;"
				>
					<div
						class="grid grid-cols-1 items-start gap-x-6 gap-y-3 px-2 py-8 sm:grid-cols-[5rem_1fr_3rem] sm:items-center sm:gap-x-12 sm:px-4 sm:py-10"
					>
						<span
							class="font-mono text-2xl text-muted-foreground transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-3xl"
						>
							{feature.num}
						</span>
						<div class="flex flex-col gap-2">
							<h3
								class="font-display text-2xl font-light text-foreground transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-3xl"
							>
								{feature.title}
							</h3>
							<p class="max-w-xl text-base leading-relaxed text-muted-foreground">
								{feature.desc}
							</p>
						</div>
						<span
							class="justify-self-start font-display text-2xl text-foreground/30 transition-all duration-500 group-hover:text-primary sm:justify-self-end sm:text-3xl"
						>
							{feature.icon}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.fade-up {
		animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
</style>
