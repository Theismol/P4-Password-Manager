<script lang="ts">

  import Icon from '@iconify/svelte'
  import ModalChangePasswordComponent from "$lib/modalChangePasswordComponent.svelte";
  import ChangePassword from "$lib/ChangePassword.svelte";
  import { Table} from '@skeletonlabs/skeleton';
  import type { TableSource } from '@skeletonlabs/skeleton';
  import type { ActionData } from "./$types";
 // handle the import of data into the table
  export let data: ActionData;

  let chanePass: ChangePassword;



// the falg for the pop up window

  //let selectedUser: { username: any; password: any; url: any; } | null = null;
  const selectedUser = { username: '', password: '', url: '' };

  let isModalAddNew = false;
  let isModalUserCredentials = false;


  function openModalUserCredentials() {
    isModalUserCredentials = true;
  }

  function openModalAddNew() {
    isModalAddNew = true;
  }

  // <-----------------------------------the table in the passwordstoring page --------------------------------------->
    let tableOfUsers: TableSource;

    if (data) {
      tableOfUsers = {
        head: ['Username ','URL','Password'],
        body: tableMapperValues(data.data, ['username','url','password']),
        meta: data.data// Use the whole row object as metadata
      };
      //console.log("Table of users:", tableOfUsers);
    };

  function tableMapperValues(data: any[], keys: string[]) {
    return data.map(row => keys.map(key => row[key]));
  }

  function handleRowClick(row: any) {
    //selectedUser = row;
    //map the row to the selected user
    selectedUser.username = row.username;
    selectedUser.password = row.password;
    selectedUser.url = row.url;
    chanePass.setTheUser(selectedUser);
    //how to call a function from another svelte file
    openModalUserCredentials();
  }

//---------------------------------------------------------------------------------------------------------------------
</script>
<ChangePassword bind:this={chanePass} />
<!--------------------------------------------- looping of the table with users ----------------------------------------->

<div class="container mx-auto flex flex-col items-center h-screen my-8">
  <h1 class="h3 mb-2">Password Storing Page</h1>
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <div class="table-container overflow-auto max-h-96">
      <table class="table-hover table-auto min-w-full">
        <thead class="sticky top-0 bg-gray-200 z-10 ">
          <tr>
            {#each tableOfUsers.head as header}
              <th class="px-4 py-2">{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#if tableOfUsers}
            {#each tableOfUsers.body as row, rowIndex}
              <tr class="bg-white hover:bg-wintry-lighter" on:click={() => handleRowClick(tableOfUsers.meta && tableOfUsers.meta[rowIndex])}>
                {#each row as cell}
                  <td class="border px-4 py-2">{cell}</td>
                {/each}
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
  <div class="button-container flex justify-center mt-4">
    <button class="bg-blue-500 text-white px-4 py-2 rounded mr-4" on:click={openModalAddNew}>+ Add new</button>
    <button class="bg-blue-500 text-white px-4 py-2 rounded mr-4">Share</button>
  </div>
</div>

<!---------------------------------------------------------------------------------------------------------------->
  <!-- the constent of the modal pages goes here  -->
  <ModalChangePasswordComponent bind:isOpen={isModalAddNew} onClose={() => isModalAddNew = false} 
    modalTitle ="<p>Add new password</p>" modalContent="<p>the content of add new password page</p>"/>

    <!-- the modal for the user credentials 

    <ModalChangePasswordComponent bind:isOpen={isModalUserCredentials} onClose={() => isModalUserCredentials = false}
    modalTitle={`<div class="p-2 flex flex-col justify-center items-center h-full">
                  <h1>User credentials</h1>  
                 </div>`}
      
      modalContent={`<div class="flex flex-col mb-4">
          <label for="username" class="mb-1 text-sm text-gray-600">Username:</label>
          <input type="text" id="username" value="${selectedUser?.username}" readonly 
                 class="cursor-not-allowed pointer-events-none bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg">

        <div class="flex-col mb-4">
          <label for="password" class="mb-1 text-sm text-gray-600">Password:</label>

          <div class="flex">

            <input type="text" id="password" value="${selectedUser?.password}" readonly class="grow pointer-events-none bg-gray-100 border border-gray-300 px-3 py-2 rounded-r-lg"/>

      </div>
    </div>
        <div class="flex flex-col mb-4">
          <label for="url" class="mb-1 text-sm text-gray-600">URL:</label>
          <input type="text" id="url" value="${selectedUser?.url}" readonly 
                 class="cursor-not-allowed pointer-events-none bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg">
        </div>`
    }/>
    -->

