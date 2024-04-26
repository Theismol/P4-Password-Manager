const User = require("../models/userModel");
const organization = require('../models/organizationModel');


const getPublicKey = async (req, res) => {
    const toUser = req.user;
    const jwt = req.cookies.token;
    let decodedJwt;
    try {
        decodedJwt = verifyToken(jwt);
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" }).send(); // Unauthorized
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" }).send(); // Unauthorized
        } else {
            return res
                .status(500)
                .json({ message: "Internal server error" })
                .send(); // Internal server error
        }
    }
    let user;
    let toUserObject;
    try {
        user = await User.findById(decodedJwt.userId);
        toUserObject = await User.findOne({username: toUser});
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" }).send();
    }
    if (user.organizations !== toUserObject.organizations) {
        return res.status(500).json({ message: "User not in same organization" }).send();
    }
    res.status(200).json({publicKey: toUserObject.publicKey});
}

const getPrivateKey = async (req, res) => {
    const jwt = req.cookies.token
    try {
        decodedJwt = verifyToken(jwt);
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" }).send(); // Unauthorized
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" }).send(); // Unauthorized
        } else {
            return res
                .status(500)
                .json({ message: "Internal server error" })
                .send(); // Internal server error
        }
    }
    try {
        const user = await User.findById(decodedJwt.userId);
        res.status(200).json({privateKey : user.privateKey}).send();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" }).send();
    }
}
module.exports = {getPublicKey, getPrivateKey}