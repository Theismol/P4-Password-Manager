// models/UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  organization_id: { type: Schema.Types.ObjectId, ref: 'Organization' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  url: { type: String },
  notes: { type: String }
});

const password = mongoose.model('Password', passwordSchema);

module.exports = password;