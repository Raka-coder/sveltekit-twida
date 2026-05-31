<script lang="ts">
	import AuthCard from '$lib/components/auth/auth-card.svelte';
	import RegisterForm from '$lib/components/auth/register-form.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Register — Todo App</title>
</svelte:head>

<AuthCard badge="Daftar" title="Buat akun baru" subtitle="Mulai catat tugas kamu" gradientSide="right">
	<RegisterForm {form} />
</AuthCard>
