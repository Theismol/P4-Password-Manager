
import type {Actions} from './$types';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';
const {
    pbkdf2,
} = await import('node:crypto');

export const actions =  { 
    default : async ({request, cookies, fetch}) => {
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        let status;
        //console.log("username is ", username)
        //console.log("password is ", password)

        const hashedpassword:any = await hashPassword(password);
        
        //console.log("hashedPassword is ", hashedpassword);
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({username: username, password: hashedpassword}),
            });
            const result = await response.json();
            console.log("result is ");
            console.log(result);
            console.log(response.status);
            status = response.status;
            cookies.set('token', response.headers.get('set-cookie'), {path: '/'});
            //console.log("code is BUVI BABA ", code);
        }
        catch(error) {
            console.log(error);
        }
        if (status == 200) {
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

