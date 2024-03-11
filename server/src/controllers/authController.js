const bcrypt = require('bcrypt');
const {generateToken, generateRefreshToken, verifyRefreshToken} = require('../utils/JWT/jwtUtils');
const User = require('../models/userModel');
const jwtModel = require('../models/jwtModel');

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
        const refreshToken = generateRefreshToken({ userId: user._id })

        jwtModel.create({name: username, RefreshToken: refreshToken});
        
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' })
       .cookie("refreshtoken", refreshToken, { httpOnly: true, secure: true, sameSite: 'none' })
       .status(200)
       .json({ message: 'Login successful', token, RefreshToken: refreshToken });
    
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const tokenRefresh = async (req, res) => {

    const refreshToken = req.body.refreshToken;
    const username = req.body.username;
    try{
        const jwt = await jwtModel.findOne({username, RefreshToken: refreshToken})
        const out = verifyRefreshToken(refreshToken);
       
        if(jwt === null){
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
        const token = generateToken({ userId: out.userId });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' })
        console.log(out);
        res.status(200).json({ message: 'Token refreshed', token });
    }catch(error){
        console.error('Error during token refresh:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const logout = async (req, res) => {
    try{
        const username = req.body.username;
        const output = await jwtModel.deleteOne({username: username,RefreshToken: req.body.refreshToken});
        console.log(output);
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logout successful' });
    }catch(error){
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
}
}

module.exports =  {login, tokenRefresh, logout};