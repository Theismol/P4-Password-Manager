// models/UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jwtScema = new Schema({
    name: { type: String, required: true, unique: true},
    RefreshToken: {type: String, required: true},
  });

const jwtModel = mongoose.model('JWT', jwtScema);

module.exports = jwtModel;