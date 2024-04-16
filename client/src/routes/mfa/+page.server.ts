import type { PageServerLoad, Actions } from './$types';
import QRCode from 'qrcode'
import axios from 'axios';
import { redirect } from '@sveltejs/kit';
export const load = (async ({cookies, fetch}) => {
    let TOTPResponse: any;
    let mfaResponse: any;
    await fetch('http://localhost:4000/api/auth/checkMFA', {
        method: 'POST',
        credentials: 'include' // equivalent to withCredentials: true
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        mfaResponse = data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      
    if (mfaResponse.mfa) {
        await fetch('http://localhost:4000/api/auth/generateTOTP', {
            method: 'GET',
            credentials: 'include' // equivalent to withCredentials: true
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            TOTPResponse = data;
          })
          .catch(error => {
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
    verifyFirst : async ({request, fetch}) => {
        const formData = await request.formData();
        const TOTP = formData.get('TOTP') as string;
        const secret = formData.get('secret') as string;
        let status;
        await fetch('http://localhost:4000/api/auth/verifyTOTPFirstTime', {
        method: 'POST',
        credentials: 'include', // equivalent to withCredentials: true
        body: JSON.stringify({totp: TOTP, secret: secret}),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            status = data.status;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        if (status == 200) {
            throw redirect(303,'/passwordStore');
        
        }
    },
    verify: async ({request}) => {
        const formData = await request.formData();
        const TOTP = formData.get('TOTP') as string;
        let status;
        await fetch('http://localhost:4000/api/auth/verifyTOTP', {
        method: 'POST',
        credentials: 'include', // equivalent to withCredentials: true
        body: JSON.stringify({totp: TOTP}),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            status = data.status;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        if (status == 200) {
            throw redirect(303,'/passwordStore');
        }
    }} satisfies Actions;
const generateQR = async (key: string) => {
    try {
        return await QRCode.toDataURL(key);
    } catch (err) {
        console.error(err);
    }
};