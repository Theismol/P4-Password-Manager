<!-- Modal.svelte -->
<script lang="ts">
    export let isOpen = false;
    export let onClose: () => void;
    export let modalContent: any;
    export let modalTitle = '';

  
    function closeModal() {
      isOpen = false;
      if (onClose) onClose();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'q') 
      return closeModal();
    };
  </script>

  {#if isOpen}
  <div role="button" tabindex="0" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50" on:click={closeModal} on:keydown={handleKeyDown}>
    <div role="button" tabindex="0" class="modal mx-auto bg-white rounded-lg shadow-xl p-10 w-[600px] h-[400px]" on:click={(e) => e.stopPropagation()} on:keydown={handleKeyDown}>
        {#if modalTitle}
        <h1>{@html modalTitle}</h1>
      {/if}
      {#if modalContent}
        <p>{@html modalContent}</p>
      {/if}
      <div class="flex justify-end">
      <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 p-4" on:click={closeModal}>Close</button>
    </div>
    </div>
  </div>
{/if} 

  <style>
    /* Styles for modal and overlay go here */
    /* .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .modal {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
    } */
  </style>
