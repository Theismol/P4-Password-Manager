password = require('../models/passwordModel.js');

const getAllPasswords = async (req, res) => {
    try {
        const passwords = await password.find();
        res.status(200).json(passwords).send();
    } catch (error) {
        console.error('Error during fetching passwords:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

module.exports = { getAllPasswords };