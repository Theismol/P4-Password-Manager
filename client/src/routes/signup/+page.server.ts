import type {Actions } from './$types';
import axios from 'axios';
const {
    pbkdf2,
} = await import('node:crypto');


let signupSuccesful : boolean = false;
let message : string = "";
let hashedPassword : string = "";

export const actions = {
    default : async ({request}) => {
        const formData = await request.formData();
        const email = formData.get('email') ? formData.get('email') : '';
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword')?.toString();
        console.log("email")
        if (password !== confirmPassword) {
            return {success: false, message: "Passwords do not match"};
        }
        
        hashedPassword = await pkFunc(password);

        console.log("hi" + hashedPassword);
        await axios.post('http://localhost:4000/api/signup', {
            email: email,
            username: username,
            password: hashedPassword,
        }).then((response) => {
            
            message = response.data.message;
            signupSuccesful = true;
        }).catch((error) => {
            message = error.response.data.message;
            signupSuccesful = false;
        });
        console.log(signupSuccesful, message);
        return {success: signupSuccesful, message: message};  
    }
} satisfies Actions;

const pkFunc = async (password: string) => {
    return new Promise((resolve, reject) => {
        pbkdf2(password, '', 600000, 256, 'sha512', (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(derivedKey?.toString('hex'));
            }
        });
    });
}

