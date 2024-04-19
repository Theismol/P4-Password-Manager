var CryptoJS = require("crypto-js");
var pbkdf2 = require('pbkdf2')

export default function hashPassword(password) {
    /*var derivedKey = pbkdf2.pbkdf2Sync(password, '', 600000, 256, 'sha512')
    console.log(derivedKey);*/

    var derivedKey = pbkdf2.pbkdf2('password', '', 600000, 512, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        console.log(derivedKey.toString('hex'));
    
    })


/*     const hashedPassword = CryptoJS.PBKDF2(password, "", {
        keySize: 256 / 32,
        iterations: 600000,
        hasher: CryptoJS.algo.SHA256
      }); */
    
      // Convert the hashed password and salt to hexadecimal
      //const hashedPasswordHex = hashedPassword.toString(CryptoJS.enc.Hex);

      return derivedKey;
}