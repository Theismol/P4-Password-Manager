<script lang="ts">
  import ModalChangePasswordComponent from "$lib/modalChangePasswordComponent.svelte";
  import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';
	import type { ActionData } from "./$types";
  export let data: ActionData;

  let isModalCP = false;
  let isModalAddNew = false;

  function openModalCP() {
    isModalCP = true;
  }

  function openModalAddNew() {
    isModalAddNew = true;
  }
let tableSimple: TableSource;
if (data) {
 tableSimple = {
	// A list of heading labels.
	head: ['Username', 'URL', 'Password'],
	// The data visibly shown in your table body UI.
	body: tableMapperValues(data.data, ['username', 'url', 'password']),
	// Optional: The data returned when interactive is enabled and a row is clicked.
	meta: tableMapperValues(data.data, ['username', 'url', 'password']),
	// Optional: A list of footer labels.
	foot: ['Total', '', '<code class="code">5</code>']
  };
}

</script>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="grid grid-cols-3 gap-4">
        <div class="col-span-3">
            <h1>Passwordstoring page</h1>
        </div>
    </div>
</div>

<div role="list" class="container h-full divide-y divide-purple-100 mx-auto flex justify-center items-center">
  {#if data}
  <Table source={tableSimple} /> 
  {/if}
</div>

<div class="button-container">
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={openModalAddNew}>+ Add new</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Share</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={openModalCP}>Change password</button>
  </div>

  <!-- the constent of the modal pages goes here  -->
  <ModalChangePasswordComponent bind:isOpen={isModalAddNew} onClose={() => isModalAddNew = false} 
    modalTitle ="<p>Add new password</p>" modalContent="<p>the content of add new password page</p>"/>

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