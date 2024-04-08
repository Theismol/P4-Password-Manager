import type { PageServerLoad } from './$types';
import speakeasy from "speakeasy";
import QRCode from 'qrcode'
import axios from 'axios';

export const load = (async () => {
    let data: any;
    await axios.get('http://localhost:4000/api/auth/generateTOTP')
    .then((response) => {
      data = response.data; // Assign data inside the then block
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
    await axios.get('http://localhost:4000/api/auth/generateTOTP')
    .then((response) => {
      data = response.data; // Assign data inside the then block
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
    const qrcode = await generateQR(data.totpCode.secret.otpauth_url);
    return {totp:data.totpCode.code, secret:data.totpCode.secret.base32, qrcode:qrcode};
}) satisfies PageServerLoad;

const generateTOTP = () => {

}
const generateQR = async (key: string) => {
    try {
        return await QRCode.toDataURL(key);
    } catch (err) {
        console.error(err);
    }
};