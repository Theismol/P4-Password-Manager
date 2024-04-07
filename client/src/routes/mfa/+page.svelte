<script lang="ts">
    import type { PageData } from './$types';
	export let data: PageData;


</script>

<div class="flex h-screen" style="background-color:  #08192c;">
    <div class="container h-screen text-center justify-center flex mx-auto w-1/2 " style="background-color: #08192c;">
        <div class="m-auto grid grid-cols-3 gap-4 flex-1" style="color: azure;">
            <p class="col-span-3">Scan the QR code below with your authenticator app or enter the secret</p>
            {#if data}
                <h1 class="h1 col-span-3">{data.secret}</h1>
                <img src={data.qrcode} alt="QR Code" class="col-span-3" />
            {/if}
            <input type="text" placeholder="Enter the code from your authenticator app" style="color: black;" />
            <button class="btn variant-filled-primary w-1/6 btn bg-gradient-to-br variant-gradient-tertiary-secondary" type="submit">Verify</button>
        </div>
    </div>
</div>
