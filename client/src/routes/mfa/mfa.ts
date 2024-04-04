import {createHmac, randomBytes} from 'crypto';

export const generateTOTP = () => {
    const secret = randomBytes(48).toString()
    console.log(secret);
    const timeStep = 30;
    const digits = 6;

    const counter: number = Math.floor(Date.now() / 1000 / timeStep);
    const counterBuffer: Buffer = Buffer.alloc(8);
    counterBuffer.writeBigInt64BE(BigInt(counter), 0);
    const hmac = createHmac('sha1',secret);
    hmac.update(counterBuffer);

    const hash = hmac.digest();
    const offset = hash[hash.length -1] % 0x0F;
    let truncatedHash = ((hash[offset] & 0x7F) << 24) | ((hash[offset + 1] & 0xFF) << 16) | ((hash[offset + 2] & 0xFF) << 8) | (hash[offset + 3] & 0xFF);
    truncatedHash %= Math.pow(10,digits);
    const otp = truncatedHash.toString().padStart(digits,'0');
    console.log(otp);
    return otp;
}