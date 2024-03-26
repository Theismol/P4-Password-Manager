import type { PageServerLoad } from './$types';
import axios from 'axios';

  export const load: PageServerLoad = async () => {
    let data: userCredentials | undefined; // Initialize data as undefined
  
    await axios.get('http://localhost:4000/api/password/getRandom')
      .then((response) => {
        data = response.data; // Assign data inside the then block
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  
    if (data !== undefined) {
      console.log('Fetched data:', data);
      return {data: data};
    } else {
      // Handle the case where data is undefined
      return null; // Or handle it in any other appropriate way
    }
  };

