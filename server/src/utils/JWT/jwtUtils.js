const e = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'AAA';

const generateToken = (payload) => {
    const expiresIn = 1; // 1 hour
    console.log('payload',payload);
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}


const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports =  {generateToken, verifyToken };
