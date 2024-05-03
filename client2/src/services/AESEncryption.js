var enc = require("crypto-js/enc-utf8")
var AES = require("crypto-js/aes");


export function AESEncrypt(item, key) {
    return AES.encrypt(item,key).toString();
}

export function AESDecrypt(item, key) {
    return AES.decrypt(item,key).toString(enc);
}