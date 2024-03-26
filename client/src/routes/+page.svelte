<script lang="ts">
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte'
	import { goto } from '$app/navigation';
</script>
<AppBar  shadow="shadow-2xl" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<div>
			<button class="btn variant-filled-secondary mx-4" on:click={() => goto("/loginpage")}>Log in</button>
			<button class="btn variant-filled-secondary" on:click={() => goto("/signup")}>Sign up</button>
		</div>
	</svelte:fragment>
	<a href="/">
		<h2 class="h2">Placeholder Name</h2>
	</a>
	<svelte:fragment slot="trail">
		<a href="https://github.com/Theismol/P4-Password-Manager">
			<Icon icon="mdi:github" height="auto" />
		</a>
	</svelte:fragment>
</AppBar>
 <div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
		<ul>
			<li><code class="code">/src/routes/+layout.svelte</code> - barebones layout</li>
			<li><code class="code">/src/app.postcss</code> - app wide css</li>
			<li>
				<code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
			</li>
		</ul>
	</div>
</div>