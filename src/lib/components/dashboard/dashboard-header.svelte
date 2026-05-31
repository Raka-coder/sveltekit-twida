<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import LogOut from '@lucide/svelte/icons/log-out';
	import User from '@lucide/svelte/icons/user';
	import Settings from '@lucide/svelte/icons/settings';

	let {
			user,
			totalCount,
			pendingCount,
			initials,
			onSignOut,
			onOpenProfile,
			onOpenSettings
		}: {
			user: { name: string; email: string; image: string | null };
			totalCount: number;
			pendingCount: number;
			initials: string;
			onSignOut: () => void;
			onOpenProfile: () => void;
			onOpenSettings: () => void;
		} = $props();
</script>

<header class="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 sm:px-6">
	<div class="flex items-center gap-2 sm:gap-3 min-w-0">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mr-2 h-4" />
		<div class="min-w-0">
			<h1 class="font-display text-base font-semibold leading-tight sm:text-lg truncate">My Tasks</h1>
			<p class="truncate text-[10px] text-muted-foreground/60 sm:text-xs">
				{totalCount} task{totalCount !== 1 ? 's' : ''}, {pendingCount} pending
			</p>
		</div>
	</div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="rounded-full ring-primary/10 transition-shadow hover:ring-4">
			<Avatar class="size-8 shrink-0 ring-2 ring-primary/10">
				<AvatarImage src={user.image ?? ''} alt={user.name} />
				<AvatarFallback class="text-xs sm:text-sm">{initials}</AvatarFallback>
			</Avatar>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="w-56">
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">{user.name}</p>
					<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item onclick={onOpenProfile}>
					<User class="mr-2 size-4" />
					<span>Profile</span>
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={onOpenSettings}>
					<Settings class="mr-2 size-4" />
					<span>Settings</span>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={onSignOut} class="text-destructive focus:bg-destructive/10 focus:text-destructive">
				<LogOut class="mr-2 size-4" />
				<span>Log out</span>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</header>
