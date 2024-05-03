var pbkdf2 = require('pbkdf2')

export default async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        pbkdf2.pbkdf2(password, '', 600000, 512, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
}

