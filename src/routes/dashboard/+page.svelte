<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/dashboard/app-sidebar.svelte';
	import DashboardHeader from '$lib/components/dashboard/dashboard-header.svelte';
	import { m } from '$paraglide/messages.js';
	import Stats from '$lib/components/dashboard/stats.svelte';
	import TaskForm from '$lib/components/dashboard/task-form.svelte';
	import TaskItem from '$lib/components/dashboard/task-item.svelte';
	import TaskToolbar from '$lib/components/dashboard/task-toolbar.svelte';
	import EmptyState from '$lib/components/dashboard/empty-state.svelte';
	import ProfileDialog from '$lib/components/dashboard/profile-dialog.svelte';
	import SettingsDialog from '$lib/components/dashboard/settings-dialog.svelte';

	type DashboardData = {
		user: { name: string; email: string; image: string | null };
		tasks: Array<{ id: number; title: string; completed: boolean; priority: number; userId: string }>;
	};

	let { data }: { data: DashboardData } = $props();

	let taskList = $derived(data.tasks);
	let newTitle = $state('');
	let isLoading = $state(false);
	let filterStatus = $state<'all' | 'pending' | 'completed'>('all');
	let filtersOpen = $state(true);
	let showProfile = $state(false);
	let showSettings = $state(false);

	const filteredTasks = $derived(
		filterStatus === 'all' ? taskList : taskList.filter((t) => filterStatus === 'completed' ? t.completed : !t.completed)
	);

	const completedCount = $derived(taskList.filter((t) => t.completed).length);
	const totalCount = $derived(taskList.length);
	const pendingCount = $derived(totalCount - completedCount);

	const initials = $derived(
		data.user.name
			.split(' ')
			.map((n: string) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
			);

	async function handleAdd() {
		const trimmed = newTitle.trim();
		if (!trimmed) return;
		isLoading = true;
		const formData = new FormData();
		formData.set('title', trimmed);
		const response = await fetch('?/create', { method: 'POST', body: formData });
		if (response.ok) {
			newTitle = '';
			await invalidateAll();
		}
		isLoading = false;
	}

	async function handleToggle(id: number, completed: boolean) {
		const formData = new FormData();
		formData.set('id', String(id));
		formData.set('completed', String(completed));
		const response = await fetch('?/toggle', { method: 'POST', body: formData });
		if (response.ok) {
			await invalidateAll();
		}
	}

	async function handleDelete(id: number) {
		const formData = new FormData();
		formData.set('id', String(id));
		const response = await fetch('?/delete', { method: 'POST', body: formData });
		if (response.ok) {
			await invalidateAll();
		}
	}

	async function handleCompleteAll() {
		const formData = new FormData();
		const response = await fetch('?/completeAll', { method: 'POST', body: formData });
		if (response.ok) {
			await invalidateAll();
		}
	}

	async function handleDeleteAll() {
		const formData = new FormData();
		const response = await fetch('?/deleteAll', { method: 'POST', body: formData });
		if (response.ok) {
			await invalidateAll();
		}
	}

	async function handleSignOut() {
		const formData = new FormData();
		await fetch('?/signOut', { method: 'POST', body: formData });
		window.location.href = '/login';
	}
</script>

<svelte:head>
	<title>{m.dashboard_title()} — {m.app_name()}</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar
		bind:filterStatus
		bind:filtersOpen
		email={data.user.email}
	/>

	<Sidebar.Inset>
		<div class="flex min-h-svh flex-col">
			<DashboardHeader
				user={data.user}
				{totalCount}
				{pendingCount}
				{initials}
				onSignOut={handleSignOut}
				onOpenProfile={() => showProfile = true}
				onOpenSettings={() => showSettings = true}
			/>

			<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
				<div class="mx-auto w-full max-w-5xl" style="animation: fade-up 0.5s ease-out both;">
					<Stats total={totalCount} pending={pendingCount} completed={completedCount} />

					<TaskForm bind:value={newTitle} {isLoading} onsubmit={handleAdd} />

					<TaskToolbar 
						taskCount={totalCount}
						onCompleteAll={handleCompleteAll}
						onDeleteAll={handleDeleteAll}
					/>

					<div class="flex flex-col gap-3">
						{#if filteredTasks.length === 0}
							<EmptyState {filterStatus} />
						{:else}
							{#each filteredTasks as t (t.id)}
								<TaskItem
									task={t}
									onToggle={(c) => handleToggle(t.id, c)}
									onDelete={() => handleDelete(t.id)}
								/>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

<ProfileDialog bind:open={showProfile} user={data.user} onClose={() => showProfile = false} />
<SettingsDialog bind:open={showSettings} onClose={() => showSettings = false} />
