let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    userName: String, 
    correo:String,
    rol: String,
    password: String,
    branchId: String, 
    enabled: Boolean
  }, { versionKey: false });

module.exports = mongoose.model('users', UserSchema);