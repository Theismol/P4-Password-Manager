<script lang="ts">
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte'
	import { goto } from '$app/navigation';

	// Highlight JS
	/*import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });*/
</script>
<AppShell scrollbarGutter="auto">
	<svelte:fragment slot="header">
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
	</svelte:fragment>
	<slot />
</AppShell>
