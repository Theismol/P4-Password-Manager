const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
<<<<<<< HEAD
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  passwords: [{ type: Schema.Types.ObjectId, ref: 'Password' }], // Array of references to password documents
  mfaSecret: { type: String, required: true },
=======
  organizations: { type: Schema.Types.ObjectId, ref: 'Organization' },
  passwords: [{ type: Schema.Types.ObjectId, ref: 'Password' }] // Array of references to password documents
>>>>>>> d14e26c141befa7952e054756861e9bf082b2d05
});

const User = mongoose.model('User', userSchema);

module.exports = User;