const bcrypt = require('bcrypt');
const { generateToken, generateRefreshToken, verifyRefreshToken, verifyToken } = require('../utils/JWT/jwtUtils');
const User = require('../models/userModel');
const jwtModel = require('../models/jwtModel');
const speakeasy = require('speakeasy');
require('dotenv').config();

const csrftoken = process.env.CSRF_TOKEN;
const generateTOTP = async (req, res) => {
    const jwt = req.cookies.token;
    const decoded_jwt = verifyToken(jwt);
    const user = await User.findOne(decoded_jwt.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' }).send();
    }
    const secret = speakeasy.generateSecret({ length: 20, name: 'AccessArmor'});
    res.status(200).json({secret: secret }).send();
}
const checkMFA = async (req, res) => {
    const jwt = req.cookies.token;
    console.log(req.cookies);
    console.log(jwt);
    const decoded_jwt = verifyToken(jwt);
    const user = await User.findOne(decoded_jwt.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' }).send();
    }
    if (user.mfaSecret === "") {
        return res.status(200).json({ mfa: false }).send();
    }
    else {
        return res.status(200).json({ mfa: true }).send();
    }

}
const verifyTOTP = async (req, res) => {
    const jwt = req.cookies.token;
    const totpToken = req.body.totp;
    let decodedJwt;
    try {
        decodedJwt = verifyToken(jwt);
    } catch (error) {

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' }).send(); // Unauthorized
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' }).send(); // Unauthorized
        } else {
            return res.status(500).json({ message: 'Internal server error' }).send(); // Internal server error
        }
    }
    const user = await User.findOne(decodedJwt.userID);
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' }).send();
    }
    const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: totpToken
    });
    if (!verified) {
        res.status(401).json({ message: 'Token is invalid' }).send();
    }
    try {
        await jwtModel.create({ name: user.username, RefreshToken: refreshToken });
    } catch (error) {
        if (error.code === 11000) {
            try {
                await jwtModel.findOneAndUpdate({ name: user.username }, { RefreshToken: refreshToken })
            } catch (error) {
                console.error('Error during token creation:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            }
        } else {
            console.error('Error during token creation:', error);
            res.status(500).json({ message: 'Internal server error' }).send();
        }
    }
    const token = generateToken({ userId: user._id, organistations: user.organizations },3600);
    const refreshToken = generateRefreshToken({ userId: user._id, organistations: user.organizations })
    console.log('Token:', csrftoken);
    console.log('Token:' + token + '\nRefreshToken:' + refreshToken);
    res.cookie("token", token, { sameSite: 'none', httpOnly: true, secure: true })
        .cookie("refreshtoken", refreshToken, { sameSite: 'none', httpOnly: true, secure: true })
        .status(200)
        .json({ csrftoken: csrftoken }).send();
}
const verifyTOTPFirstTime = async (req, res) => {
    const totpToken = req.body.totp;
    const secret = req.body.secret;
    const jwt = req.cookies.token;
    console.log(req.cookies);
    let decoded_jwt;
    try {
        decoded_jwt = verifyToken(jwt);
    } catch (error) {

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' }).send(); // Unauthorized
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' }).send(); // Unauthorized
        } else {
            return res.status(500).json({ message: 'Internal server error' }).send(); // Internal server error
        }
    }
    const user = await User.findOne(decoded_jwt.userID);
    console.log(user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' }).send();
    }
    

    const verified = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: totpToken
    });
    if (!verified) {
        res.status(401).json({ message: 'Token is invalid' }).send();
    }
    else {
        User.findOneAndUpdate({ _id: user._id }, { mfaSecret: user.mfaSecret });
    }
    try {
        await jwtModel.create({ name: user.username, RefreshToken: refreshToken });
    } catch (error) {
        if (error.code === 11000) {
            try {
                await jwtModel.findOneAndUpdate({ name: user.username }, { RefreshToken: refreshToken })
            } catch (error) {
                console.error('Error during token creation:', error);
                res.status(500).json({ message: 'Internal server error' }).send();
            }
        } else {
            console.error('Error during token creation:', error);
            res.status(500).json({ message: 'Internal server error' }).send();
        }
    }
    const token = generateToken({ userId: user._id, organistations: user.organizations },3600);
    const refreshToken = generateRefreshToken({ userId: user._id, organistations: user.organizations })
    console.log('Token:', csrftoken);
    console.log('Token:' + token + '\nRefreshToken:' + refreshToken);
    res.cookie("token", token, { sameSite: 'none', httpOnly: true, secure: true })
        .cookie("refreshtoken", refreshToken, { sameSite: 'none', httpOnly: true, secure: true })
        .status(200)
        .json({ csrftoken: csrftoken }).send();

}
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }).send();
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' }).send();
        }
        const mfa = user.mfaSecret !== "test";
        const token = generateToken({ userId: user._id, organistations: user.organizations },300);
        res.cookie("token", token, {sameSite: 'none', httpOnly: true, secure: true  }).
        status(200).json({ csrftoken: csrftoken, mfa:mfa }).send();
        



    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

const tokenRefresh = async (req, res) => {


    const refreshToken = req.cookies.refreshtoken;

    try {
        const jwt = await jwtModel.findOne({ RefreshToken: refreshToken })
        const out = verifyRefreshToken(refreshToken);

        if (jwt === null) {
            return res.status(401).json({ message: 'Invalid refresh token' }).send();
        }
        const token = generateToken({ userId: out.userId, organistations: out.organistations});
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' })
        console.log(out, token);
        res.status(200).json({ message: 'Token refreshed', token }).send();
    } catch (error) {
        console.error('Error during token refresh:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshtoken;

        const output = await jwtModel.deleteOne({ RefreshToken: refreshToken });
        console.log(output);
        res.clearCookie('token');
        res.clearCookie('refreshtoken');
        res.status(200).json({ message: 'Logout successful' }).send();
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}


module.exports = { login, tokenRefresh, logout,verifyTOTPFirstTime, verifyTOTP, generateTOTP, checkMFA};