import type { PageServerLoad, Actions } from './$types';
import QRCode from 'qrcode'
import axios from 'axios';
import { redirect } from '@sveltejs/kit';
export const load = (async () => {
    let TOTPResponse: any;
    let mfaResponse: any;
    await axios.get('http://localhost:4000/api/auth/checkMFA')
    .then((response) => {
      mfaResponse = response.data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
    if (!mfaResponse.mfa) {
        await axios.get('http://localhost:4000/api/auth/generateTOTP')
        .then((response) => {
            TOTPResponse = response.data;
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
        const qrcode = await generateQR(TOTPResponse.totpCode.secret.otpauth_url);
        return {mfa: false,totp:TOTPResponse.totpCode.code, secret:TOTPResponse.totpCode.secret.base32, qrcode:qrcode};
    }
    else {
        return {mfa:true};
    }
    
}) satisfies PageServerLoad;
export const actions =  { 
    verifyFirst : async ({request}) => {
        const formData = await request.formData();
        const TOTP = formData.get('TOTP') as string;
        const secret = formData.get('secret') as string;
        await axios.post('http://localhost:4000/api/auth/verifyTOTPFirstTime', {totp: TOTP, secret: secret})
        .then((response) => {
            if (response.data.code == "200") {
                throw redirect(303,'/passwordStore');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
        
    },
    verify: async ({request}) => {
        const formData = await request.formData();
        const TOTP = formData.get('TOTP') as string;
        await axios.post('http://localhost:4000/api/auth/verifyTOTP', {totp: TOTP})
        .then((response) => {
            if (response.data.code == "200") {
                throw redirect(303,'/passwordStore');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    
    }

}satisfies Actions;
const generateQR = async (key: string) => {
    try {
        return await QRCode.toDataURL(key);
    } catch (err) {
        console.error(err);
    }
};