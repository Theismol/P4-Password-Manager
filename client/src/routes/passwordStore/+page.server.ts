import type { PageServerLoad } from './$types';
import axios from 'axios';
import {fail, type Actions} from '@sveltejs/kit'
import { writable } from "svelte/store";
import { userInfo } from 'os';
import { json } from 'stream/consumers';

// export const GET = async ({request}) => {
//   const authHeader = request.headers.get('Authorization')

//   if(authHeader !== 'Myauthheader') {
//     return new Response (JSON.stringify({message: 'Invalid credentials'}), {status: 401})

//   }

//   return new Response(JSON.stringify({message:"hello"}),{status: 200})

// const res = await fetch('http://localhost:4000/api/password/getRandom')
// const data = await res.json()

// return new Response(JSON.stringify(data), {status: 200})
// }


  export const load = ({fetch}) => {

    const fetchdata = async () => {
      const response = await axios.get('http://localhost:4000/api/password/getRandom'); 
      const data = response.data; 
      console.log('Fetched data:', data);
      return data.getRandom;
    }
    return {
      getRandom: fetchdata()
    }
  }


