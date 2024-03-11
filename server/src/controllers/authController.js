const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/JWT/jwtUtils');
const User = require('../models/userModel');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
    
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        const token = generateToken({ userId: user._id });

    

        res.status(200).json({ message: token}).cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none'});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const tokenRefresh = async (req, res) => {

    const rToken = req.body.refreshToken;
    if (rtoken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)


}

module.exports =  login ;