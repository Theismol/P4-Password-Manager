var pbkdf2 = require('pbkdf2')

export default async function hashPassword(password, iterations) {
    return new Promise((resolve, reject) => {
        pbkdf2.pbkdf2(password, '', iterations, 512, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
}

