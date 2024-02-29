// models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // ... other fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
