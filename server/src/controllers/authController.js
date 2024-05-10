const crypto = require("crypto");
const bcrypt = require("bcrypt");
//const uuid = require('uuid');
const { v5: uuidv5 } = require('uuid');



const {
    generateToken,
    generateRefreshToken,
    verifyRefreshToken,
} = require("../utils/JWT/jwtUtils");
const User = require("../models/userModel");
const jwtModel = require("../models/jwtModel");
const speakeasy = require("speakeasy");
const { Domain } = require("domain");
require("dotenv").config();

//what is NAME_SPACE? 
    //A namespace is a set of symbols that are used to organize objects of various kinds, so that these objects may be referred to by name.
const NAME_SPACE = "f7b3b8b0-3b7b-11eb-b378-0242ac130002";

const csrftoken = process.env.CSRF_TOKEN;
const checkMFA = async (req, res) => {
    let user;
    const { userId } = req.user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return res.status(404).json({ message: "User not found" }).send();
    }
    console.log(user);
    //This should be changed so the string is empty instead probably, but then the field cannot be required :(
    if (user.mfaSecret === "null") {
        const secret = speakeasy.generateSecret({
            length: 20,
            name: "AccessArmor",
        });
        res.status(200).json({csrftoken: csrftoken, mfa: false, secret: secret }).send();
    } else {
        return res.status(200).json({csrftoken: csrftoken, mfa: true });
    }
};
const verifyTOTP = async (req, res) => {
    const totpToken = req.body.totp;
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" }).send();
    }
    const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token: totpToken,
    });
    if (!verified) {
        return res.status(401).json({ message: "Token is invalid" }).send();
    }
    const token = generateToken(
        { userId: user._id, organistations: user.organizations },
        3600
    );
    const refreshToken = generateRefreshToken({
        userId: user._id,
        organistations: user.organizations,
    });
    try {
        await jwtModel.create({
            name: user.username,
            RefreshToken: refreshToken,
        });
    } catch (error) {
        if (error.code === 11000) {
            try {
                await jwtModel.findOneAndUpdate(
                    { name: user.username },
                    { RefreshToken: refreshToken }
                );
            } catch (error) {
                console.error("Error during token creation:", error);
                return res.status(500)
                    .json({ message: "Internal server error" })
                    .send();
            }
        } else {
            console.error("Error during token creation:", error);
            return res.status(500).json({ message: "Internal server error" }).send();
        }
    }
    res.clearCookie("mfatoken");
    res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        secure: true,
        domain: "accessarmor.server"
    })
        .cookie("refreshtoken", refreshToken, {
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            domain: "accessarmor.server"
        })
        .status(200).send();
};


const verifyTOTPFirstTime = async (req, res) => {
    const totpToken = req.body.totp;
    const secret = req.body.secret;
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" }).send();
    }
    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: totpToken,
    });
    if (!verified) {
        return res.status(401).json({ message: "Token is invalid" }).send();
    } else {
        console.log("updating secret" + secret);
        try {
            user.mfaSecret = secret;
            user.save();
            
        }
        catch (err) {
            console.log(err);
            
        }
    }
    const token = generateToken(
        { userId: user._id, organistations: user.organizations },
        3600
    );
    const refreshToken = generateRefreshToken({
        userId: user._id,
        organistations: user.organizations,
    });
    try {
        await jwtModel.create({
            name: user.username,
            RefreshToken: refreshToken,
        });
    } catch (error) {
        if (error.code === 11000) {
            try {
                await jwtModel.findOneAndUpdate(
                    { name: user.username },
                    { RefreshToken: refreshToken }
                );
            } catch (error) {
                console.error("Error during token creation:", error);
                return res.status(500)
                    .json({ message: "Internal server error" })
                    .send();
            }
        } else {
            console.error("Error during token creation:", error);
            return res.status(500).json({ message: "Internal server error" }).send();
        }
    }
    res.clearCookie("mfatoken");
    res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        secure: true,
        domain: "accessarmor.server"
    })
        .cookie("refreshtoken", refreshToken, {
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            domain: "accessarmor.server"
        })
        .status(200).send();
};


const exntionCheckLogin = async (req, res) => {
    try {
        res.status(200).json({ message: "Login successful" });
    }
    catch (err) {
        res.status(401).json({ message: "Login failed" });
    }
};

const checkMasterPassword = async (req, res) => {

    const { userId } = req.user;
    const { password } = req.body;
    try {
        const user = await User.findById(userId);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }
        return res.status(200).json({ message: "Password is valid" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error during login" });
    }
};

const getUserKey = async (req, res) => {
    const { userId } = req.user;

    const key = uuidv5(userId, NAME_SPACE);

    const hashedKey = crypto.createHash("sha256").update(key).digest("hex");
    try {

        return res.status(200).json({ key: hashedKey });
    }
        catch (error) {
        return res.status(500).json({ message: "Error during key generation" });

    }
};





const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" }).send();
        }
        const mfa = user.mfaSecret !== "null";
        const token = generateToken(
            { userId: user._id, organistations: user.organizations },
            3600
        );
        return res.cookie("mfatoken", token, {sameSite: "strict", httpOnly: true, secure: true, domain: "accessarmor.server" })
            .status(200)
            .json({mfa: mfa });
    } catch (error) {
        return res.status(500).json({ message: "Error during login" }).send();
    }
};


const tokenRefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshtoken;

    try {
        const jwt = await jwtModel.findOne({ RefreshToken: refreshToken });
        const out = verifyRefreshToken(refreshToken);
        const user = await User.findById(out.userId);

        if (jwt === null) {
            return res
                .status(401)
                .json({ message: "Invalid refresh token" })
                .send();
        }
        console.log(user);
        const token = generateToken({
            userId: user._id,
            organistations: user.organizations[0],
        }, 3600);
        console.log(token);
        res.cookie("token", token, {
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            domain: "accessarmor.server"
        }).status(200).json({ message: "Token refreshed" }).send();
        console.log(out, token);

    } catch (error) {
        console.error("Error during token refresh:", error);
        res.status(500).json({ message: "Internal server error" }).send();
    }
};

const logout = async (req, res) => {
    console.log(req.cookies);
    try {
        const refreshToken = req.cookies.refreshtoken;

        const output = await jwtModel.deleteOne({ RefreshToken: refreshToken });
        console.log(output);
        res.clearCookie("token");
        res.clearCookie("refreshtoken");
        console.log("cookies cleared");
        res.status(200).json({ message: "Logout successful" }).send();
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" }).send();
    }
};
const getCSRF = async (req, res) => {
    const { userId } = req.user;
    let user;
    try {
        user = User.findById({userId})
    }
    catch(error) {
        return res.status(404).json({ message: "User not found" }).send();
    }
    res.status(200).json({csrftoken: csrftoken});
}

module.exports = {
    login,
    getUserKey,
    exntionCheckLogin,
    checkMasterPassword,
    tokenRefresh,
    logout,
    verifyTOTPFirstTime,
    verifyTOTP,
    checkMFA,
    getCSRF,
};
