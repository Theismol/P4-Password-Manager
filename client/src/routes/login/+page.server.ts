
import type {Actions} from './$types';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
const {
    pbkdf2,
} = await import('node:crypto');

export const actions =  { 
    default : async ({request}) => {
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        //console.log("username is ", username)
        //console.log("password is ", password)

        const hashedpassword:any = await hashPassword(password);
        
        //console.log("hashedPassword is ", hashedpassword);

        const code = await fetchData(username, hashedpassword);
        //console.log("code is BUVI BABA ", code);
        
        if (code == "200") {
            throw redirect(303,'/mfa');
        }
        

    }

}satisfies Actions;

const hashPassword = async (password: string) => {
    return new Promise((resolve, reject) => {
        pbkdf2(password, '', 600000, 256, 'sha512', (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(derivedKey.toString('hex'));
            }
        });   
    });
    
    
    
}

const fetchData = async (username: string, password: string) => {
    try {
        const response = await axios.post(
            'http://localhost:4000/api/auth/login',
            {
                username: username,
                password: password
            }
        , {headers: {'Content-Type': 'application/json'}, withCredentials: true});

        const receivedCookies = response.headers['Set-Cookie'];

        console.log("receivedCookies is ", receivedCookies)
        
      
        if (receivedCookies) {
            receivedCookies.forEach((cookie: string) => {
              document.cookie = cookie; // Set received cookies
            });
         }
         console.log("cookies are" + document.cookie);

          
        console.log(response);
        return JSON.stringify(response.status);
        } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
}


