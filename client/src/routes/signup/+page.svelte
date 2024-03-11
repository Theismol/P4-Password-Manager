<script lang="ts">
    import {enhance, applyAction} from '$app/forms';
    import type {PageData, ActionData} from './$types';
    export let form: ActionData | undefined;
    export let data: PageData;
    let success = false;
    $: {
        if (form && form?.success) {
            console.log("Success");
            success = true;
            setTimeout(() => {
                success = false;
            }, 3000);
        }
    }
</script>
<div class="container h-screen text-center justify-center flex mx-auto">
    <form method="POST" action="?/signup" class="m-auto grid grid-cols-3 gap-4 flex-1" use:enhance>
        <div class="m-4 col-span-3">
            <h1 class="h1">Sign up</h1>
        </div>
        <div class="col-span-3 w-full">
            <label class="h4" for="username">Username</label>
            <input class="rounded w-1/3" type="text" id="username" name="username" required>
        </div>
        <div class="col-span-3">
            <label class="h4" for="email">Email</label>
            <input class="rounded w-1/3" type="email" id="email" name="email" required>
        </div>
        <div class="col-span-3">
            <label class="h4" for="password">Password</label>
            <input class="rounded w-1/3" type="password" id="password" name="password" required>
        </div>
        <div class="col-span-3">
            <label class="h4" for="confirmPassword">Confirm Password</label>
            <input class="rounded w-1/3" type="password" id="confirmPassword" name="confirmPassword" required>
        </div>
        <div class="my-4 col-span-3">
            <button class="btn variant-filled-primary w-1/6" type="submit">Sign Up</button>
        </div>
    </form>
</div>