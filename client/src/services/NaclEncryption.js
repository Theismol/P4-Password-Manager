import { randomBytes, box } from "tweetnacl";
import {
    decodeUTF8,
    encodeUTF8,
    encodeBase64,
    decodeBase64,
} from "tweetnacl-util";

export function createKeys() {
    const keys = box.keyPair();
    return {public: encodeBase64(keys.publicKey), private: encodeBase64(keys.secretKey)}
}

export function NaclEncrypt(publicKey, privateKey, message) {
    console.log(decodeBase64(publicKey));
    console.log(decodeBase64(privateKey));
    const sharedKey = box.before(decodeBase64(publicKey), decodeBase64(privateKey));
    const nonce = randomBytes(box.nonceLength);
    const messageUint8 = decodeUTF8(JSON.stringify(message));
    const encrypted = box.after(messageUint8, nonce, sharedKey);
    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
}
export function NaclDecrypt(publicKey, privateKey, encryptedMessage) {
	const sharedKey = box.before(decodeBase64(publicKey), decodeBase64(privateKey));
    const messageWithNonceAsUint8Array = decodeBase64(encryptedMessage);
    const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(
        box.nonceLength,
        encryptedMessage.length
    );

    const decrypted = box.open.after(message, nonce, sharedKey);

    if (!decrypted) {
        throw new Error("Could not decrypt message");
    }

    const base64DecryptedMessage = encodeUTF8(decrypted);
    const text = base64DecryptedMessage.split("\\");
    const newPasswordObject = {username:text[3].substring(1),password: text[7].substring(1),url: text[11].substring(1), title:text[15].substring(1)}
    return newPasswordObject;
}
