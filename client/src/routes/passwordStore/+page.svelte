<script lang="ts">
  import ModalChangePasswordComponent from "$lib/modalChangePasswordComponent.svelte";
  import { Table} from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';
	import type { ActionData } from "./$types";
 // handle the import of data into the table
  export let data: ActionData;


// the falg for the pop up window
  let isModalCP = false;
  let isModalAddNew = false;
  let isModalUserCredentials = false;
  
  function openModalCP() {
    isModalCP = true;
  }

  function openModalUserCredentials() {
    isModalUserCredentials = true;

  }

  function openModalAddNew() {
    isModalAddNew = true;
  }

  // <-----------------------------------the table in the passwordstoring page --------------------------------------->
    let tableSimple: TableSource;

    if (data) {
      tableSimple = {
        head: ['Username', 'URL', 'Password'],
        body: tableMapperValues(data.data, ['username', 'url', 'password']),
        meta: tableMapperValues(data.data, ['username', 'url', 'password']) // Use the whole row object as metadata
      };
    };

  function tableMapperValues(data: any[], keys: string[]) {
    return data.map(row => keys.map(key => row[key]));
  }

  // add functionality to this!!!!
  function handleRowClick(row: any) {
    console.log("Row clicked:", row);
    openModalUserCredentials();
  }

//---------------------------------------------------------------------------------------------------------------------
</script>

<div class="container h-full mx-auto flex justify-center items-center">
    <div class="grid grid-cols-3 gap-4">
        <div class="col-span-3">
            <h1>Passwordstoring page</h1>
        </div>
    </div>
</div>

<div role="list" class="container min-h-screen divide-y divide-purple-100 mx-auto flex justify-center items-center">
  <table class="table-hover">
    <tbody>
     {#if tableSimple && tableSimple.meta}
        {#each tableSimple.body as row, rowIndex}
          <tr on:click={() => handleRowClick(tableSimple.meta && tableSimple.meta[rowIndex])}> 
            <td>
              <Table source={tableSimple} />
            </td>
        </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<div class="button-container">
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={openModalAddNew}>+ Add new</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Share</button>
  </div>

  <!-- the constent of the modal pages goes here  -->
  <ModalChangePasswordComponent bind:isOpen={isModalAddNew} onClose={() => isModalAddNew = false} 
    modalTitle ="<p>Add new password</p>" modalContent="<p>the content of add new password page</p>"/>
  
    <ModalChangePasswordComponent bind:isOpen={isModalUserCredentials} onClose={() => isModalUserCredentials = false} 
      modalTitle ="<p>User credentials</p>" modalContent="<p>add the individual users info here/p>"/>
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