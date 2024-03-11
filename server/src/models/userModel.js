const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true , unique: true},
  password: { type: String, required: true },
  email: { type: String, required: true },
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  passwords: [{ type: Schema.Types.ObjectId, ref: 'Password' }] // Array of references to password documents
});

const User = mongoose.model('User', userSchema);

module.exports = User;