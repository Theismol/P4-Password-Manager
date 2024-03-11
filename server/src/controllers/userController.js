const bcrypt = require('bcrypt');
const User = require('../models/userModel');


const salt = 10;




const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.cookie("test", "test", { httpOnly: true, secure: true, sameSite: 'none' })
        res.status(200).json(users);
    } catch (error) {
        console.error('Error during fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports =  getAll;