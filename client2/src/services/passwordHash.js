var CryptoJS = require("crypto-js");

export default function hashPassword(password) {
    const hashedPassword = CryptoJS.PBKDF2(password, "", {
        keySize: 256 / 32,
        iterations: 600000,
        hasher: CryptoJS.algo.SHA256
      });
    
      // Convert the hashed password and salt to hexadecimal
      const hashedPasswordHex = hashedPassword.toString(CryptoJS.enc.Hex);

      return hashedPasswordHex;
}