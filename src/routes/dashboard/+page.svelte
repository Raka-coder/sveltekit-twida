<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/dashboard/app-sidebar.svelte';
	import DashboardHeader from '$lib/components/dashboard/dashboard-header.svelte';
	import Stats from '$lib/components/dashboard/stats.svelte';
	import TaskForm from '$lib/components/dashboard/task-form.svelte';
	import TaskItem from '$lib/components/dashboard/task-item.svelte';
	import EmptyState from '$lib/components/dashboard/empty-state.svelte';
	import ProfileDialog from '$lib/components/dashboard/profile-dialog.svelte';
	import SettingsDialog from '$lib/components/dashboard/settings-dialog.svelte';

	let { data } = $props();

	const user = (() => data.user)();

	let taskList = $state((() => data.tasks)());
	let initialized = $state(true);
	let newTitle = $state('');
	let isLoading = $state(false);
	let filterStatus = $state<'all' | 'pending' | 'completed'>('all');
	let filtersOpen = $state(true);
	let showProfile = $state(false);
	let showSettings = $state(false);

	const filteredTasks = $derived.by(() => {
		if (filterStatus === 'all') return taskList;
		if (filterStatus === 'pending') return taskList.filter((t) => !t.completed);
		return taskList.filter((t) => t.completed);
	});

	const totalCount = $derived(taskList.length);
	const pendingCount = $derived(taskList.filter((t) => !t.completed).length);
	const completedCount = $derived(taskList.filter((t) => t.completed).length);

	const initials = $derived(
		user.name
			? user.name
					.split(' ')
					.map((n: string) => n[0])
					.join('')
					.toUpperCase()
					.slice(0, 2)
			: user.email.split('@')[0].slice(0, 2).toUpperCase()
	);

	async function handleAdd() {
		if (!newTitle.trim()) return;
		isLoading = true;

		try {
			const fd = new FormData();
			fd.set('title', newTitle.trim());
			await fetch('?/create', { method: 'POST', body: fd });
			window.location.reload();
		} finally {
			isLoading = false;
		}
	}

	async function handleToggle(id: number, completed: boolean) {
		const fd = new FormData();
		fd.set('id', id.toString());
		fd.set('completed', completed.toString());
		await fetch('?/toggle', { method: 'POST', body: fd });

		taskList = taskList.map((t) =>
			t.id === id ? { ...t, completed } : t
		);
	}

	async function handleDelete(id: number) {
		const fd = new FormData();
		fd.set('id', id.toString());
		await fetch('?/delete', { method: 'POST', body: fd });

		taskList = taskList.filter((t) => t.id !== id);
	}

	async function handleSignOut() {
		await fetch('/api/auth/sign-out', { method: 'POST' });
		window.location.href = '/login';
	}
</script>

<svelte:head>
	<title>Dashboard — Todo App</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar bind:filterStatus bind:filtersOpen email={user.email} />

	<Sidebar.Inset>
		<DashboardHeader
			user={user}
			{totalCount}
			{pendingCount}
			{initials}
			onSignOut={handleSignOut}
			onOpenProfile={() => (showProfile = true)}
			onOpenSettings={() => (showSettings = true)}
		/>

		<div class="p-6">
			<Stats total={totalCount} pending={pendingCount} completed={completedCount} />

			<div class="mb-6">
				<TaskForm bind:value={newTitle} bind:isLoading onsubmit={handleAdd} />
			</div>

			{#if filteredTasks.length === 0}
				<EmptyState {filterStatus} />
			{:else}
				<div>
					{#each filteredTasks as t (t.id)}
						<TaskItem
							task={t}
							onToggle={(c) => handleToggle(t.id, c)}
							onDelete={() => handleDelete(t.id)}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

<ProfileDialog bind:open={showProfile} user={user} onClose={() => (showProfile = false)} />

<SettingsDialog bind:open={showSettings} onClose={() => (showSettings = false)} />
