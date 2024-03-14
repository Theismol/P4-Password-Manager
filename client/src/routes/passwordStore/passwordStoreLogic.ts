import { onMount } from "svelte";
import { writable } from "svelte/store";


export const importedData = writable([]);

// Fetch data from the server and update the writable store
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    importedData.set(data); // Update the writable store with the fetched data
    console.log('Imported Data:', data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


// the logic behind the pop-pages and the passwordstore 