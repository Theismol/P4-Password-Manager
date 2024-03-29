<script lang="ts">
import Icon from '@iconify/svelte'
import crypto from 'crypto';
export const selectedUser = { username: '', password: '', url: '' };
let openChangeWindow: boolean = false;


let candEdit: boolean = false;

function theFunction() {
    //rnove the readonly attribute from the password input and not-alllowed class
    const passwordInput = document.getElementById('password');
    if (passwordInput && !candEdit) {
        candEdit = true;
        //set the bg color to white
        passwordInput.style.backgroundColor = 'white';
        passwordInput.removeAttribute('readonly');
        passwordInput.classList.remove('cursor-not-allowed');
        passwordInput.classList.remove('pointer-events-none');
    }
}


function closeChange() {
    candEdit = false;
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.value = selectedUser.password;
        passwordInput.style.backgroundColor = '#f3f4f6';
        passwordInput.setAttribute('readonly', '');
        passwordInput.classList.add('cursor-not-allowed');
        passwordInput.classList.add('pointer-events-none');
    }

}

function saveChange() {
    candEdit = false;
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        selectedUser.password = passwordInput.value;
        // fetch the data from the server
        passwordInput.style.backgroundColor = '#f3f4f6';
        passwordInput.setAttribute('readonly', '');
        passwordInput.classList.add('cursor-not-allowed');
        passwordInput.classList.add('pointer-events-none');
    }
}


function randomPassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?';
    const passwordLength = 26;
    let passwordString = '';
    const randomValues = window.crypto.getRandomValues(new Uint32Array(passwordLength));
    for (let i = 0; i < passwordLength; i++) {
        passwordString += characters[randomValues[i] % characters.length];
    }
    //set the password to the selected user
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.value = passwordString;
    }
    //set the password to the selected user

}


export function setTheUser(currentSeledeUser: { username: any; password: any; url: any; }) {
  selectedUser.username = currentSeledeUser.username;
  selectedUser.password = currentSeledeUser.password;
  selectedUser.url = currentSeledeUser.url;

  console.log("Row clicked:", selectedUser);
  openChangeWindow = true;

}

</script>

<!--create a if "isModalAddNew" is true then show the modal-->

{#if openChangeWindow}
<div role="button" tabindex="0" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
  <div class="modal mx-auto bg-white rounded-lg shadow-xl p-10 w-[800px] h-[400px]">
    <div class="p-2 flex-col justify-center items-center h-full">
      <h1>User credentials</h1>
      <div class="flex flex-col mb-4">
        <label for="username" class="mb-1 text-sm text-gray-600">Username:</label>
        <input type="text" id="username" value="${selectedUser?.username}" readonly class="justify cursor-not-allowed pointer-events-none bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg w-full">
      </div>
      <label for="password" class="mb-1 text-sm text-gray-600">Password:</label>
      <div class="flex flex-row mb-4">
      <div class="grow">
        <input type="text" id="password" value="{selectedUser.password}" readonly class="cursor-not-allowed pointer-events-none bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg w-full">
        </div>
        {#if !candEdit}
        <!-- a button to change the password use iconify a penseil icon -->
        <div class="flex justify-center">
        <button class="bg-blue-500 text-white px-4 rounded-full hover:bg-blue-400 p-2 ml-10" on:click={theFunction}>
          <Icon icon="bi:pencil-square" class="auto" />
          </div>
          {/if}
          {#if candEdit}
          <div class="flex justify-center">
          <button class="bg-blue-500 text-white px-4 rounded-full hover:bg-blue-400 p-2 ml-10" on:click={randomPassword}>
          <Icon icon="mage:reload" class="auto" /></button>
            <button class="bg-green-500 text-white px-4 rounded-full hover:bg-green-400 p-2 ml-2" on:click={saveChange}>
            <Icon icon="bi:check2" class="auto" /></button>
            <button class="bg-red-500 text-white px-4 rounded-full hover:bg-red-400 p-2 ml-2" on:click={closeChange}>
            <Icon icon="bi:x" class="auto" /></button>
        </div>
        {/if}
      </div>
      <div class="flex flex-col mb-4">
        <label for="url" class="mb-1 text-sm text-gray-600">URL:</label>
        <input type="text" id="url" value="${selectedUser?.url}" readonly class="cursor-not-allowed pointer-events-none bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg w-full">
      </div>
      <div class="flex justify-center">
      <button class="bg-red-500 text-white px-4 rounded-lg hover:bg-red-400 p-4 mb-6" on:click={() => openChangeWindow = false}>Close</button>
      </div>
    </div>
  </div>
</div>
{/if}

