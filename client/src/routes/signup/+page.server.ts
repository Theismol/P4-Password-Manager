import type {Actions } from './$types';
import axios from 'axios';
import {fail} from '@sveltejs/kit'

const {
    pbkdf2,
} = await import('node:crypto');
let works = false;
export const actions = {
    default : async ({request}) => {
        const formData = await request.formData();
        const email = formData.get('email') ? formData.get('email') : '';
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword')?.toString();
        if (password !== confirmPassword) {
            fail(400, {email,username,message: "Passwords do not match"});
        }
        else {
            pbkdf2(password, '', 600000, 256, 'sha512', (err, derivedKey) => {
                if (err) {
                    return({success: false, message: "An error occurred"});
                }
                else {
                    axios.post('http://localhost:4000/api/signup', {
                        email: email,
                        username: username,
                        password: derivedKey.toString('hex'),
                    }).then(async (response) => {
                        if (response.status !== 200) {
                            fail(400, {email,username,message: "An error occurred"});
                        }
                        else {
                            console.log("this is works");
                            works = true;
                        }
                    }, (error) => {
                        console.log(error);
                        fail(400, {email,username,message: "An error occurred"});
                    });
                }

            }
        )}
        return {success: works};  
    }
} satisfies Actions;


