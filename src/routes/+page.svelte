<script lang="ts">
	import { m } from '$paraglide/messages.js';
	import Navbar from '$lib/components/landing/Navbar.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
</script>

<svelte:head>
	<title>{m.app_title()}</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-background font-sans antialiased">
	<Navbar />
	<main class="flex-1">
		<Hero />
		<Features />
	</main>
	<Footer />
</div>
