const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const expiresIn = 60*60;

const JWT_SECRET = process.env.JWT_SECRET ;

const generateToken = (payload) => {

    console.log('payload',payload);
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}


const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports =  {generateToken, verifyToken };
