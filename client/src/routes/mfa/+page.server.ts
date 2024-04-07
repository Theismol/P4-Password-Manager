import type { PageServerLoad } from './$types';
import speakeasy from "speakeasy";
import QRCode from 'qrcode'

export const load = (async () => {
    const totpCode = generateTOTP();
    const qrcode = await generateQR(totpCode.secret.otpauth_url);
    return {totp:totpCode.code, secret:totpCode.secret.base32, qrcode:qrcode};
}) satisfies PageServerLoad;

const generateTOTP = () => {
    const secret = speakeasy.generateSecret({length: 20, name: 'AccessArmor'});
    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
      });
    return {code:token, secret:secret};
}
const generateQR = async (key: string) => {
    try {
        return await QRCode.toDataURL(key);
    } catch (err) {
        console.error(err);
    }
};