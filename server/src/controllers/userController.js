const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const auth = require('../middlewares/Auth/JwtAuth');

const salt = 10;




const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(401.1).json({ message: 'Invalid username or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401.1).json({ message: 'Invalid username or password' });
      } else {
        req.user = user;
        await auth.generateToken(req, res); // Note the await here
        return res.status(200).json({ message: 'Logged in' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };


const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ username, password: hashedPassword, email });
        return res.status(201).json({ user });
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {login, createUser}