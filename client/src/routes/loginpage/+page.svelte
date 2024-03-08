<script> 
//put logic script here
</script>

<div class="center">
    <label class="mt-8 sm:mx-auto sm:w-full sm:max-w-md login-label">
        <span>Login</span>
        <input class="input mt-4" id="email" name="email" type="email" placeholder="email" />
        <input class="input mt-4" type="password" placeholder="Password"/>
    </label>
</div>


<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh; /* This makes the container take the full height of the viewport */
    }
    .login-label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input {
        width: 300px; /* Adjust this value as needed */
    }
</style>