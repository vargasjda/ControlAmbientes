let mongo_bloque = require('../models/bloques');

function getBloques(request, response){
    mongo_bloque.find().exec((err, bloques) => {
        if (err) {
            console.log("Error Busqueda");
        }else if(bloques != 0){
            return response.send(bloques)
        }else{
            return response.send("Bloques Vacios")
        }
    })
}

function createBloque(request, response){
    var body = request.body; 
       
    mongo_bloque.find(body).exec()
    .then((bloque)=>{
        if(bloque){
            if(bloque.length>0){
                return response.send( 'BLOQUE YA EXISTENTE' );
            }else{  
                mongo_bloque.insertMany(body, (err, result) => {
                    if(result){
                        return response.status(201).send(result);
                    }else{
                        return response.status(204).send( 'ERROR AL INSERTAR BLOQUE' );
                    } 
                });
            }
        }else{
            return  response.status(400).send('Datos Erroneos!'); 
        }    
    }).catch(err => console.log("error:", err))
}

function updatebloque(request, response) {
    var body = request.body;
    var filter = {};
        if(request.params.id == null ){
            return response.send({ code: 'CAMPOS_ERROR', description: 'Campo Obligatorio' });
        }else{
            filter.id = request.params.id ;
            mongo_bloque.findOneAndUpdate(
                { "_id":filter.id}, 
                { $set: 
                    { ...body  } 
                },
                { upsert :  true  } 
            ).then((result) => {
                if (result) {
                    response.send(  'Se actualizo correctamente'  );
                } else {
                    response.status(400).send({ code: 'bloque_ERROR ', description: 'Verifique bloque' });
                }
            }).catch(function (err) {
                return response.send({ code: 'POST_Suggestedbloque_ERROR', description: err.toString() });
            });
    }
}

function deletebloque(request, response) {
    var filter = {};
    if (request.params.id) {
        filter._id = request.params.id;
    }
    mongo_bloque.findOneAndRemove(filter, (err, result) => {
        if (err) {
            console.log(err);
            response.send( 'error al conectar' );
        }
        if (result) {
            return response.send({ title: "SUCCESSFUL", description: "Bloque Eliminado" });
        } else {
            return response.send({ code: 'DELETE_ERROR ', description: 'Verifique Usuario' });
        }
    });
}

module.exports ={
    getBloques,
    createBloque,
    updatebloque,
    deletebloque
      
} 