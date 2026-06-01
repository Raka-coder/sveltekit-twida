<script lang="ts">
	import * as m from '$paraglide/messages';
	import AuthCard from '$lib/components/auth/auth-card.svelte';
	import RegisterForm from '$lib/components/auth/register-form.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>{m.register_title()} — {m.app_name()}</title>
</svelte:head>

<AuthCard badge={m.register_title()} title={m.register_title()} subtitle={m.register_subtitle()} gradientSide="right">
	<RegisterForm {form} errors={form?.errors} values={form?.values} />
</AuthCard>
