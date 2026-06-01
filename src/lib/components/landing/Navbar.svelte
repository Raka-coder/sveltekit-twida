<script lang="ts">
	import { m } from '$paraglide/messages.js';
	import { Button } from '$lib/components/ui/button';
</script>

<nav
	class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-10">
		<a href="/" class="group flex items-center gap-3">
			<span
				class="flex h-7 w-7 items-center justify-center border border-foreground/80 font-mono text-[11px] font-medium text-foreground/80 transition-colors duration-300 group-hover:border-primary group-hover:text-primary"
			>
				T
			</span>
			<span
				class="font-display text-2xl font-light tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary"
			>
				Todo.
			</span>
		</a>
		<div>
			<Button variant="ghost" size="sm" href="/login">
				{m.login_button()}
			</Button>
		</div>
	</div>
</nav>

<style>
	@keyframes nav-fade {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	nav {
		animation: nav-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
</style>
