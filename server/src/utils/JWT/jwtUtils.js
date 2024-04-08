const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateToken = (payload,expiry) => {

    return jwt.sign(payload, JWT_SECRET, { expiry });
}


const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, JWT_REFRESH_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken };