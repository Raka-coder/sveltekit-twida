<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible';
	import * as Sidebar from '$lib/components/ui/sidebar';
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
						<span class="truncate font-semibold">Todo App</span>
						<span class="truncate text-xs text-muted-foreground/60">{email}</span>
					</div>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton isActive={true} tooltipContent="Dashboard">
						<ListChecks class="size-4" />
						<span class="group-data-[collapsible=icon]:hidden">Dashboard</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupLabel>Organization</Sidebar.GroupLabel>
			<Sidebar.Menu>
				<Collapsible.Root bind:open={filtersOpen} class="group/collapsible">
					<Sidebar.MenuItem>
						<Collapsible.Trigger>
							{#snippet child({ props }: { props: Record<string, unknown> })}
								<Sidebar.MenuButton {...props} tooltipContent="Filters">
									<Tag class="size-4" />
									<span class="group-data-[collapsible=icon]:hidden">Filters</span>
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
										All Tasks
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton
										isActive={filterStatus === 'pending'}
										onclick={() => filterStatus = 'pending'}
									>
										Pending
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton
										isActive={filterStatus === 'completed'}
										onclick={() => filterStatus = 'completed'}
									>
										Completed
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
