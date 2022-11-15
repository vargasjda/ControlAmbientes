let mongoose = require('mongoose');

let ambienteSchema = new mongoose.Schema({
    nomenclatura: String, 
    encargado: String,
    programa: String 
   
  }, { versionKey: false });

module.exports = mongoose.model('ambiente', ambienteSchema);