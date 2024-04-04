<script lang="ts">
    import {generateTOTP} from './mfa'

</script>


<div class="flex h-screen" style="background-color:  #08192c;">
    <h1 class="h1">test</h1>
    <button class="btn variant-filled-primary" on:click={() => generateTOTP}> </button>
</div>


