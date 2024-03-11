import type { PageServerLoad, Actions } from './$types';
import axios from 'axios';

const {
    pbkdf2,
} = await import('node:crypto');

export const actions = {
    default : async ({request}) => {
        const formData = await request.formData();
        const email = formData.get('email') ? formData.get('email') : '';
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword')?.toString();
        if (password !== confirmPassword) {
            return({success: false, message: "Passwords do not match"});
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
                    }).then((response) => {
                        if (response.status === 200) {
                            console.log("redirecting");
                            return({success: true, status: 'redirect', location: '/'});
                        }
                        else {
                            console.log("fk");
                            return({success: false, message: response.data.message});
                        }
                    })
                }
            }


        )}

        return({success: true})
    }
} satisfies Actions;