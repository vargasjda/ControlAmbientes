let mongoose = require('mongoose');

let inventarioSchema = new mongoose.Schema({
    objeto: String, 
    cantidad: int,
    datos: String,
    descripcion: String 
   
  }, { versionKey: false });

module.exports = mongoose.model('inventario', inventarioSchema);