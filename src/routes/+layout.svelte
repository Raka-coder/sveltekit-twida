<script lang="ts">
	import './layout.css';
	import { m } from '$paraglide/messages.js';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="/favicon.svg" /></svelte:head>

{@render children()}

<style>
	:global(body) {
		margin: 0;
	}
</style>
