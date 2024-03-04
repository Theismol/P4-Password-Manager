<script >

import { focusTrap } from '@skeletonlabs/skeleton';

</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>


<form use:focusTrap={true}>
	<input data-focusindex="1" type="text" placeholder="Name" value="Bob" />
	<!-- Email will be the first focused -->
	<input data-focusindex="0" type="email" placeholder="Email" />
	<button class="btn variant-filled-primary">Submit</button>
</form>
