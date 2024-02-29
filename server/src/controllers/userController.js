// controllers/userController.js
const User = require('../models/userModel.js');

const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getUser, createUser , deleteUser};