const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const signup = async (req, res) => {
    const {email, username, password } = req.body;
    console.log(req.body)

    try {
     
        const user = await User.findOne({ username });
        const emailCheck = await User.findOne({ email });
        if (user) {
            return res.status(404).json({ message: 'Username is already taken' });
        }
        else if (emailCheck) {
            return res.status(404).json({ message: 'Email is already taken' });
        }
        else {
         
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create({ email: email, username: username, password: hashedPassword, organizations: null});
            res.status(200).json({ message: 'Signup successful!'});
        }
 
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports =  signup;