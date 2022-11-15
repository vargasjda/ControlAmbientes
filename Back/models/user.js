let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    userName: String, 
    password: String, 
    rol: String, 
    branchId: String, 
    enabled: Boolean
  }, { versionKey: false });

module.exports = mongoose.model('users', UserSchema);