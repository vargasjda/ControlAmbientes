let mongoose = require('mongoose');

let novedadSchema = new mongoose.Schema({
    bloque: String, 
    ambiente: String,
    programa: String,
    novedad: String 
   
  }, { versionKey: false });

module.exports = mongoose.model('novedad', novedadSchema);