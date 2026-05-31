<script lang="ts">
	import * as m from '$paraglide/messages';
	import AuthCard from '$lib/components/auth/auth-card.svelte';
	import LoginForm from '$lib/components/auth/login-form.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>{m.login_title()} — {m.app_name()}</title>
</svelte:head>

<AuthCard badge={m.login_title()} title={m.login_title()} subtitle={m.login_subtitle()} gradientSide="left">
	<LoginForm {form} />
</AuthCard>
