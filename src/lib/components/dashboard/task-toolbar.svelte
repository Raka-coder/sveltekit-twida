<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import CheckCheck from '@lucide/svelte/icons/check-check';
	import Trash2 from '@lucide/svelte/icons/trash-2';

	let { 
		taskCount, 
		onCompleteAll, 
		onDeleteAll 
	}: { 
		taskCount: number; 
		onCompleteAll: () => void; 
		onDeleteAll: () => void;
	} = $props();

	let deleteDialogOpen = $state(false);
</script>

{#if taskCount > 0}
	<div class="mb-4 flex items-center justify-between px-1">
		<div class="text-xs font-medium text-muted-foreground/60">
			Manage Tasks
		</div>
		<div class="flex items-center gap-2">
			<Button 
				variant="ghost" 
				size="sm" 
				class="h-8 text-xs font-medium text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
				onclick={onCompleteAll}
			>
				<CheckCheck class="mr-1.5 size-3.5" />
				All Done
			</Button>

			<AlertDialog.Root bind:open={deleteDialogOpen}>
				<AlertDialog.Trigger>
					{#snippet child({ props })}
						<Button 
							{...props}
							variant="ghost" 
							size="sm" 
							class="h-8 text-xs font-medium text-destructive hover:bg-destructive/10"
						>
							<Trash2 class="mr-1.5 size-3.5" />
							Delete All
						</Button>
					{/snippet}
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently delete all your tasks from our servers.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action 
							onclick={onDeleteAll}
							class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete Everything
						</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</div>
	</div>
{/if}
