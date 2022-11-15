let mongoose = require('mongoose');

let bloqueSchema = new mongoose.Schema({
   nomenclatura: String, 
    programa: String 
   
  }, { versionKey: false });

module.exports = mongoose.model('bloques', bloqueSchema);