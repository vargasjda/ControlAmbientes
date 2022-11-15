let mongoose = require('mongoose');

let RolSchema = new mongoose.Schema({
    name: String
  })

module.exports = mongoose.model('roles', RolSchema)