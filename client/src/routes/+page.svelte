<script>

	import { goto } from "$app/navigation";

</script>
<!-- <script lang="ts">

</script>



 <div class="container h-screen mx-auto flex justify-center items-center  ">
	<div class="grid grid-cols-3 place-content-center">
		<h1 class="h1 col-span-3">Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
	</div>
	<div>
	<button class="btn variant-filled-primary">get started</button>
	</div>
</div> -->


  <div class="container flex flex-col items-center h-screen my-8">
	<h1 class="text-4xl font-bold mb-4">This is the headline</h1>
	<h2 class="text-xl font-semibold mb-4">This is the subheading</h2>
	<button class="btn variant-filled-primary" on:click={()=> goto("/signup")}>get started</button>
	<!-- logo tag here -->
  </div>