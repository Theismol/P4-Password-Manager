<script> 
 import {handleLogin} from './loginLogic';
</script>

<div class="center">
    <form on:submit={handleLogin}>
        <label class="mt-8 sm:mx-auto sm:w-full sm:max-w-md login-label " >
            <span>Login</span>
            <input class="input mt-4" id="username" type="username" name="username" placeholder="username" />
            <input class="input mt-4" type="password" placeholder="Password" name="password"/>
            <button class="btn variant-filled-primary w-1/6" type="submit">Log in</button>
        </label>
    </form>
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