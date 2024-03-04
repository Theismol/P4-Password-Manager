<script >
import { focusTrap } from '@skeletonlabs/skeleton';

</script>
  


<main>
    <form use:focusTrap={true}>
        
        <input data-focusindex="1" type="text" placeholder="Username" />
        <!-- Email will be the first focused -->
        <input data-focusindex="0" type="password" placeholder="Password" />
        <button class="btn variant-filled-primary">Submit</button>
    </form>
</main>


<style>
    /* Custom styles */
    header {
        text-align: center;
        margin-bottom: 20px;
    }

    main {
        margin-bottom: 20px;
        text-align: center;
    }

    footer {
        text-align: center;
        font-size: 0.8em;
    }
</style>
