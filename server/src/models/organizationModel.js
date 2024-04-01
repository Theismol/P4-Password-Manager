// models/UserModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  adminestrators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const organization = mongoose.model('Organization', organizationSchema);

module.exports = organization;