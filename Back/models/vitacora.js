let mongoose = require('mongoose');

let vitacoraSchema = new mongoose.Schema({
    nombre: String, 
    ambiente: String,
    fecha: Date 
   
  }, { versionKey: false });

module.exports = mongoose.model('vitacora', vitacoraSchema);