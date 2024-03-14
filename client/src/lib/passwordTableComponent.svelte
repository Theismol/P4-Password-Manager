<script lang="ts">
	import { writable } from "svelte/store";

  export let password : Passwords = {id: "", Username: "", Password:"", URL: ""};
</script>

<div>
    <ul role="list" class="container h-full divide-y divide-purple-100 mx-auto flex justify-center items-center">
    <div class="3/4 p-6 rounded sh">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
            <th scope="col" class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
            <th scope="col" class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase">password</th>
          </tr>
        </thead>
        <tbody>
          <tr class="">
            <td class="py-4 px-6">{password.Username}</td>
            <td class="py-4 px-6">{password.URL}</td>
            <td class="py-4 px-6">{password.Password}</td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </ul>
</div>