const jwtModel = require('../models/jwtModel');
const organization = require('../models/organizationModel');
const password = require('../models/passwordModel');
const user = require('../models/userModel');

const deleteAllUsers = async (req, res) => {
    try {
        await user.deleteMany();
        await user.create({ email: 'hello@hello.com', username: 'hello', password: '$2b$10$WCBzoPhzT/qTOL48Bowdxe9st1dDN8aZS3K7VGciBz6eB3j67ovXW' });
        await user.create({ email: '123@123.com', username: '123', password: '$2b$10$6IBs3A./c2MFcty22zBecuN2G3mNOr0i9KdME1CCU61Gzxi4ZPEYa' });
        res.status(200).json({ message: 'All users deleted and added Hello, 123' }).send();
    } catch (error) {
        console.error('Error during deleting users:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

module.exports = {deleteAllUsers};