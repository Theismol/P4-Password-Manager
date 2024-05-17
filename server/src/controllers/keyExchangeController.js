const User = require("../models/userModel");
const organization = require('../models/organizationModel');


const getKeys = async (req, res) => {
    const toUser = req.query.user;
    console.log("touser");
    console.log(toUser);
    const { userId, organizations } = req.user;
    let user;
    let toUserObject;
    try {
        user = await User.findById(userId);
        toUserObject = await User.findOne({_id: toUser, organizations : {$in : organizations}});
        console.log(toUserObject);
        console.log(organizations);

    } catch (error) {
        console.log("shit maan");
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" }).send();
    }
    res.status(200).json({publicKey: toUserObject.publicKey, privateKey: user.privateKey});
}
module.exports = {getKeys}