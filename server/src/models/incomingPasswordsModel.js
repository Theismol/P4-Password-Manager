// models/UserModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomingPasswordSchema = new Schema({
    from : { type: Schema.Types.ObjectId, ref: 'User', required: true},
    to : { type: Schema.Types.ObjectId, ref: 'User', required: true},
    password: { type: String, required: true}
});

const incomingPasswordModel = mongoose.model("incomingPassword", incomingPasswordSchema);

module.exports = incomingPasswordModel;
