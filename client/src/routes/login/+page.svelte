<script>
	import { enhance } from '$app/forms';
</script>

<div class="container h-screen text-center justify-center flex mx-auto w-1/2">
	<form method="POST" class="m-auto grid grid-cols-3 gap-4 flex-1" use:enhance>
		<div class="m-4 col-span-3">
			<h1 class="h1">Log in</h1>
		</div>
		<div class="col-span-3 ">
			<label class="h4" for="username">Username</label>
			<input class="input w-full" id="username" type="text" name="username" required />
		</div>
		<div class="col-span-3 ">
			<label class="h4" for="username">Password</label>
			<input class="input w-full" id="password" type="password" name="password" required />
		</div>
        <div class="my-4 col-span-3">
            <button class="btn variant-filled-primary w-1/6 btn bg-gradient-to-br variant-gradient-tertiary-secondary" type="submit">Log in</button>
        </div>

	</form>
</div>
