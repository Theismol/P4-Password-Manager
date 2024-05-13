const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const expiresIn = 60 * 60;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_MFASECRET = process.env.JWT_MFASECRET;

const generateToken = (payload,expiry) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}


const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}
const generateMFAToken = (payload,expiry) => {
    return jwt.sign(payload, JWT_MFASECRET, { expiresIn });
}

const verifyMFAToken = (token) => {
    return jwt.verify(token, JWT_MFASECRET);
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken, generateMFAToken, verifyMFAToken};