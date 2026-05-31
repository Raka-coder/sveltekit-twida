<script lang="ts">
	import AuthCard from '$lib/components/auth/auth-card.svelte';
	import LoginForm from '$lib/components/auth/login-form.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login — Todo App</title>
</svelte:head>

<AuthCard badge="Masuk" title="Welcome back" subtitle="Silakan masuk ke akun kamu" gradientSide="left">
	<LoginForm {form} />
</AuthCard>
