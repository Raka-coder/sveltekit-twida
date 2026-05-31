<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import CheckCheck from '@lucide/svelte/icons/check-check';
	import ListTodo from '@lucide/svelte/icons/list-todo';
	import Clock from '@lucide/svelte/icons/clock';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import LogOut from '@lucide/svelte/icons/log-out';
	import type { SidebarGroupItem } from '$lib/components/ui/sidebar/types.js';

	let {
		filterStatus = $bindable('all'),
		filtersOpen = $bindable(true),
		email
	}: {
		filterStatus: 'all' | 'pending' | 'completed';
		filtersOpen: boolean;
		email: string;
	} = $props();

	const initials = $derived(
		email
			.split('@')[0]
			.slice(0, 2)
			.toUpperCase()
	);

	const navItems: SidebarGroupItem[] = [
		{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, isActive: true }
	];

	const filterItems = [
		{ title: 'All Tasks', value: 'all' as const, icon: ListTodo },
		{ title: 'Pending', value: 'pending' as const, icon: Clock },
		{ title: 'Completed', value: 'completed' as const, icon: CheckCheck }
	];

	function setFilter(value: 'all' | 'pending' | 'completed') {
		filterStatus = value;
	}
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header class="border-b p-4">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					size="lg"
					class="cursor-default hover:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar class="size-8">
						<AvatarImage src="" alt={email} />
						<AvatarFallback class="text-xs">{initials}</AvatarFallback>
					</Avatar>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<span class="truncate font-semibold">{email.split('@')[0]}</span>
						<span class="truncate text-xs text-muted-foreground">{email}</span>
					</div>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{#each navItems as item (item.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={item.isActive}>
							{#if item.icon}
								<item.icon />
							{/if}
							<span>{item.title}</span>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						onclick={() => filtersOpen = !filtersOpen}
						class="flex w-full items-center justify-between"
					>
						<span>Filters</span>
						<ChevronDown
							class="size-4 transition-transform {filtersOpen ? '' : '-rotate-90'}"
						/>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
			{#if filtersOpen}
				<Sidebar.Menu>
					{#each filterItems as { title, value, icon } (value)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								onclick={() => setFilter(value)}
								isActive={filterStatus === value}
							>
								<icon></icon>
								<span>{title}</span>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			{/if}
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer class="border-t p-4">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					onclick={async () => {
						await fetch('/api/auth/sign-out', { method: 'POST' });
						window.location.href = '/login';
					}}
					class="text-destructive hover:bg-destructive/10 hover:text-destructive"
				>
					<LogOut class="size-4" />
					<span>Logout</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
