let mongo_inventario = require('../models/inventario');

function getInventarios(request, response){
    mongo_inventario.find().exec((err, inventarios) => {
        if (err) {
            console.log("Error Busqueda");
        }else if(inventarios != 0){
            return response.send(inventarios)
        }else{
            return response.send("inventarios Vacios")
        }
    })
}

function createInventario(request, response){
    var body = request.body; 
       
    mongo_inventario.find(body).exec()
    .then((inventario)=>{
        if(inventario){
            if(inventario.length>0){
                return response.send( 'INVENTARIO YA EXISTENTE' );
            }else{  
                mongo_inventario.insertMany(body, (err, result) => {
                    if(result){
                        return response.status(201).send(result);
                    }else{
                        return response.status(204).send( 'ERROR AL INSERTAR INVENTARIO' );
                    } 
                });
            }
        }else{
            return  response.status(400).send('Datos Erroneos!'); 
        }    
    }).catch(err => console.log("error:", err))
}

function updateInventario(request, response) {
    var body = request.body;
    var filter = {};
        if(request.params.id == null ){
            return response.send({ code: 'CAMPOS_ERROR', description: 'Campo Obligatorio' });
        }else{
            filter.id = request.params.id ;
            mongo_inventario.findOneAndUpdate(
                { "_id":filter.id}, 
                { $set: 
                    { ...body  } 
                },
                { upsert :  true  } 
            ).then((result) => {
                if (result) {
                    response.send(  'Se actualizo correctamente'  );
                } else {
                    response.status(400).send({ code: 'inventario_ERROR ', description: 'Verifique inventario' });
                }
            }).catch(function (err) {
                return response.send({ code: 'POST_Suggestedinventario_ERROR', description: err.toString() });
            });
    }
}

function deleteInventario(request, response) {
    var filter = {};
    if (request.params.id) {
        filter._id = request.params.id;
    }
    mongo_inventario.findOneAndRemove(filter, (err, result) => {
        if (err) {
            console.log(err);
            response.send( 'error al conectar' );
        }
        if (result) {
            return response.send({ title: "SUCCESSFUL", description: "inventario Eliminado" });
        } else {
            return response.send({ code: 'DELETE_ERROR ', description: 'Verifique inventario' });
        }
    });
}

module.exports ={
    getInventarios,
    createInventario,
    updateInventario,
    deleteInventario
      
} 