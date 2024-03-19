
const password = require('../models/passwordModel.js');

const getAllPasswords = async (req, res) => {
    try {
        const passwords = await password.find();
        res.status(200).json(passwords).send();
    } catch (error) {
        console.error('Error during fetching passwords:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

const getRandom = async (req, res) => {
    try {
        const numPasswords = req.query.num || 10; 
        const passwords = [];

        for (let i = 0; i < numPasswords; i++) {
            const newPassword = new password({
                organization_id: '65e5d28e1d546bf0e961c358', 
                user_id: "65e5d28e1d546bf0e961c358", 
                title: "faker.lorem.words()", 
                username: "faker.internet.userName()", 
                password: "faker.internet.password()", 
                url: "faker.internet.url()", 
                notes: "faker.lorem.paragraph()" 
            });

            passwords.push(newPassword);
        }

        console.log(passwords);

        res.status(200).json(passwords).send();
    } catch (error) {
        console.error('Error during generating passwords:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const addPasswordToUser = async (req, res) => {
    try {
        const newPassword = new password({
            organization_id: req.body.organization_id, 
            user_id: req.user.userId, 
            title: req.body.title, 
            username: req.body.username, 
            password: req.body.password, 
            url: req.body.url, 
            notes: req.body.notes 
        });

        await newPassword.save();
        res.status(201).json(newPassword).send();
    } catch (error) {
        console.error('Error during adding password:', error);
        res.status(500).json({ message: 'Internal server error' }).send();
    }
}

module.exports = { getAllPasswords, getRandom };