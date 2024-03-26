<script>

	import { goto } from "$app/navigation";

</script>

  <div class="container flex flex-col items-center h-screen my-8">
	<h1 class="text-4xl font-bold mb-4">This is the headline</h1>
	<h2 class="text-xl font-semibold mb-4">This is the subheading</h2>
	<button class="btn variant-filled-primary" on:click={()=> goto("/signup")}>get started</button>
	<!-- logo tag here -->
  </div>