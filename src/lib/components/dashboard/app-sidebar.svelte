<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { m } from '$paraglide/messages.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import Tag from '@lucide/svelte/icons/tag';

	let {
		email,
		filterStatus = $bindable('all'),
		filtersOpen = $bindable(true)
	}: {
		email: string;
		filterStatus: 'all' | 'pending' | 'completed';
		filtersOpen: boolean;
	} = $props();
</script>

<Sidebar.Root collapsible="icon" variant="sidebar">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg" class="gap-3">
					<div class="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-md shrink-0">
						<ListChecks class="size-4" />
					</div>
					<div class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
						<span class="truncate font-semibold">{m.app_name()}</span>
						<span class="truncate text-xs text-muted-foreground/60">{email}</span>
					</div>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>{m.navigation()}</Sidebar.GroupLabel>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton isActive={true} tooltipContent={m.dashboard_title()}>
						<ListChecks class="size-4" />
						<span class="group-data-[collapsible=icon]:hidden">{m.dashboard_title()}</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupLabel>{m.organization()}</Sidebar.GroupLabel>
			<Sidebar.Menu>
				<Collapsible.Root bind:open={filtersOpen} class="group/collapsible">
					<Sidebar.MenuItem>
						<Collapsible.Trigger>
							{#snippet child({ props }: { props: Record<string, unknown> })}
								<Sidebar.MenuButton {...props} tooltipContent={m.filters()}>
									<Tag class="size-4" />
									<span class="group-data-[collapsible=icon]:hidden">{m.filters()}</span>
									<ChevronDown
										class="ml-auto size-3 transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden"
									/>
								</Sidebar.MenuButton>
							{/snippet}
						</Collapsible.Trigger>
						<Collapsible.Content>
							<Sidebar.MenuSub>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton
										isActive={filterStatus === 'all'}
										onclick={() => filterStatus = 'all'}
									>
										{m.all_tasks()}
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton
										isActive={filterStatus === 'pending'}
										onclick={() => filterStatus = 'pending'}
									>
										{m.pending()}
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton
										isActive={filterStatus === 'completed'}
										onclick={() => filterStatus = 'completed'}
									>
										{m.completed()}
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							</Sidebar.MenuSub>
						</Collapsible.Content>
					</Sidebar.MenuItem>
				</Collapsible.Root>
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Rail />
</Sidebar.Root>
