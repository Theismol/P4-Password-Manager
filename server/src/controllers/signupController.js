const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const signup = async (req, res) => {
    console.log("signup");
    const {email, username, password } = req.body;
    console.log(req.body);

    try {
     
        const user = await User.findOne({ username });
        if (user) {
            return res.sendStatus(404).json({ message: 'Username is already taken' });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.sendStatus(404).json({ message: 'Email is already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        User.create({ email: email, username: username, password: hashedPassword });
 
        res.sendStatus(200).json({ message: 'User created'});
    } catch (error) {
        console.error('Error during signup:', error);
        res.sendStatus(500).json({ message: 'Internal server error' });
    }
}

module.exports =  signup;