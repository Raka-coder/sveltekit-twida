<script lang="ts">
	let {
		value = $bindable(''),
		isLoading = $bindable(false),
		onsubmit = () => {}
	}: {
		value: string;
		isLoading: boolean;
		onsubmit: () => void;
	} = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
			e.preventDefault();
			onsubmit();
		}
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		if (value.trim()) onsubmit();
	}}
	class="w-full"
>
	<input
		type="text"
		bind:value
		placeholder="Add a new task..."
		class="input-underline w-full"
		disabled={isLoading}
		onkeydown={handleKeydown}
	/>
</form>
