<script lang="ts">
  import PasswordTableComponent from "$lib/passwordTableComponent.svelte";
  const passwords : Passwords[] = [
    // {
    //   id: "1",

    //   Username: 'hej',
      
    //   Password: '123',

    //   URL: '123sprugt'

    // }

    // import data here
    
  ]

</script>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="grid grid-cols-3 gap-4">
        <div class="col-span-3">
            <h1>Passwordstoring page</h1>
        </div>
    </div>
</div>

<div>
  {#each passwords as password}
      <PasswordTableComponent password={password}/>
      {/each}
</div>

<div class="button-container">
    <button class="bg-blue-500 text-white px-4 py-2 rounded">+ Add new</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Share</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Change password</button>
  </div>

<style>

   .button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
}
</style>