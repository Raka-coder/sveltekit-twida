<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { setLocale, getLocale, locales } from '$paraglide/runtime.js';
	import * as m from '$paraglide/messages.js';
	import Languages from '@lucide/svelte/icons/languages';

	const labels: Record<string, string> = {
		en: 'EN',
		de: 'DE',
		id: 'ID'
	};

	const fullNames: Record<string, string> = {
		en: 'English',
		de: 'Deutsch',
		id: 'Bahasa Indonesia'
	};

	function handleSelect(locale: typeof locales[number]) {
		setLocale(locale);
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="sm" class="h-8 gap-1.5 px-2.5 text-xs font-medium">
			<Languages class="size-3.5 opacity-60" />
			<span>{labels[getLocale()] ?? getLocale().toUpperCase()}</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-44">
		<DropdownMenu.Label>{m.language()}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		{#each locales as locale (locale)}
			<DropdownMenu.Item 
				onclick={() => handleSelect(locale)}
				class="flex items-center gap-2 py-2 text-xs {locale === getLocale() ? 'bg-accent text-accent-foreground font-semibold' : ''}"
			>
				<span class="flex-1">{fullNames[locale] ?? locale}</span>
				{#if locale === getLocale()}
					<span class="text-[10px] opacity-40">{m.active()}</span>
				{/if}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
