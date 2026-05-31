<script lang="ts">
	import { SidebarTrigger } from '$lib/components/ui/sidebar';
	import { Separator } from '$lib/components/ui/separator';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import User from '@lucide/svelte/icons/user';
	import Settings from '@lucide/svelte/icons/settings';
	import LogOut from '@lucide/svelte/icons/log-out';

	let {
		user,
		totalCount,
		pendingCount,
		initials,
		onSignOut = async () => {},
		onOpenProfile = () => {},
		onOpenSettings = () => {}
	}: {
		user: { name: string; email: string; image?: string | null };
		totalCount: number;
		pendingCount: number;
		initials: string;
		onSignOut: () => Promise<void> | void;
		onOpenProfile: () => void;
		onOpenSettings: () => void;
	} = $props();
</script>

<header class="flex h-14 items-center gap-3 border-b border-border/40 px-4">
	<SidebarTrigger />

	<Separator orientation="vertical" class="h-6" />

	<div class="flex flex-1 flex-col">
		<h1 class="text-sm font-semibold">My Tasks</h1>
		<p class="text-xs text-muted-foreground">
			{pendingCount} pending &middot; {totalCount} total
		</p>
	</div>

	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="ghost" size="icon-sm" class="rounded-full">
				<Avatar class="size-7">
					<AvatarImage src={user.image ?? ''} alt={user.name} />
					<AvatarFallback class="text-[10px]">{initials}</AvatarFallback>
				</Avatar>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="w-48">
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col">
					<span class="text-sm font-medium text-foreground">{user.name}</span>
					<span class="text-xs font-normal text-muted-foreground">{user.email}</span>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={onOpenProfile}>
				<User class="size-4" />
				<span>Profile</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={onOpenSettings}>
				<Settings class="size-4" />
				<span>Settings</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item variant="destructive" onclick={onSignOut}>
				<LogOut class="size-4" />
				<span>Logout</span>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</header>
