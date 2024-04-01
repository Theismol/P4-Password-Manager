<script lang="ts">
    import {enhance} from '$app/forms';
    import { fade } from 'svelte/transition';
    import type {ActionData} from './$types';
    export let form: ActionData;
    let responseReceived = false;
    $: {
        if (form) {
            responseReceived = true;
            setTimeout(() => {
                responseReceived = false;
            }, 3000);
        }
    }
</script>

{#if responseReceived}
    {#if form?.success}
        <aside  class="alert variant-ghost-success fixed">
            <div class="alert-message">
                <h3 class="h3">{form?.message}</h3>
            </div>
            </aside>
    {/if}
    {#if !form?.success}
        <aside class="alert variant-ghost-error fixed">
            <div class="alert-message">
                <h3 class="h3">{form?.message}</h3>
            </div>
        </aside>
    {/if}
{/if}


<div class="flex h-screen" style="background-color:  #08192c;">
    <div class="container h-screen text-center justify-center flex mx-auto w-1/2 " style="background-color: #08192c;" >
        <form method="POST" class="m-auto grid grid-cols-3 gap-4 flex-1" use:enhance>
            <div class="m-4 col-span-3" style="color: azure;">
                <h1 class="h1">Sign up</h1>
            </div>
            <div class="col-span-3 w-full" style="color: azure;">
                <label class="h4" for="username">Username</label>
                <input class="input w-1/2" type="text" id="username" name="username" style="color: black;" required>
            </div>
            <div class="col-span-3" style="color: azure;">
                <label class="h4" for="email">Email</label>
                <input class="input w-1/2" type="email" id="email" name="email" style="color: black;" required>
            </div>
            <div class="col-span-3" style="color: azure;">
                <label class="h4" for="password">Password</label>
                <input class="input w-1/2" type="password" id="password" name="password" style="color: black;" required>
            </div>
            <div class="col-span-3" style="color: azure;">
                <label class="h4" for="confirmPassword">Confirm Password</label>
                <input class="input w-1/2" type="password" id="confirmPassword" name="confirmPassword" style="color: black;" required>
            </div>
            <div class="my-4 col-span-3" style="color: azure;">
                <button class="btn variant-filled-primary w-1/6 btn bg-gradient-to-br variant-gradient-tertiary-secondary" type="submit">Sign Up</button>
            </div>
            <div class="col-span-3" style="color:azure">
                    <p>Already have an account? <a href="/loginpage" class="anchor">Log  in</a> </p>
    
            </div>
    
        </form>
    
    </div>*/

</div>


