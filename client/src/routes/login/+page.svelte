<script>
	import { enhance } from '$app/forms';
	import MyImage from './Logo.png';
</script>

<div class="flex h-screen">
    <!-- Left Section -->
    <div class="flex-1 " style="background-color: #08192c;">
        <div class="container h-screen text-center justify-center flex mx-auto w-2/5 ">
            <form method="POST" class="m-auto grid grid-cols-3 gap-4 flex-1" use:enhance>
                <div class="m-4 col-span-3" style="color: azure;">
                    <h1 class="h1">Log in</h1>
                </div>
                <div class="col-span-3" style="color: azure;">
                    <label class="h4" for="username">Username</label>
                    <input class="input w-full" id="username" type="text" name="username" style="color: black;" required />
                </div>
                <div class="col-span-3" style="color: azure;">
                    <label class="h4" for="username">Password</label>
                    <input class="input w-full" id="password" type="password" name="password" style="color: black;" required />
                </div>
                <div class="my-4 col-span-3">
                    <button class="btn variant-filled-primary w-1/6 btn bg-gradient-to-br variant-gradient-tertiary-secondary" type="submit">Log in</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Right Section -->
    <div class="flex-1 bg-white w-70 justify-center flex items-center" style="background-color: #08192c;" >
        <!-- Content for the right section goes here -->
		<img src={MyImage} alt="Some alt text"  style="width: 700px; height: 700px;" />
        <div class="p-8">
            <!-- Additional content goes here -->
			
        </div>
    </div>
</div>



