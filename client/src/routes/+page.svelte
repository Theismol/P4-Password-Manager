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
<div class="container mx-auto flex flex-col items-center h-screen my-8">
	<h1 class="h1 mb-4">This is the headline</h1>
	<h2 class="h2 mb-4">This is the subheading</h2>
	<button class="btn variant-filled-primary" on:click={()=> goto("/signup")}>get started</button>
<!-- logo tag here -->
</div>