let mongo_ambiente = require('../models/ambientes');

function getAmbientes(request, response){
    mongo_ambiente.find().exec((err, ambientes) => {
        if (err) {
            console.log("Error Busqueda");
        }else if(ambientes != 0){
            return response.send(ambientes)
        }else{
            return response.send("ambientes Vacios")
        }
    })
}

function createAmbiente(request, response){
    var body = request.body; 
       
    mongo_ambiente.find(body).exec()
    .then((ambiente)=>{
        if(ambiente){
            if(ambiente.length>0){
                return response.send( 'AMBIENTE YA EXISTENTE' );
            }else{  
                mongo_ambiente.insertMany(body, (err, result) => {
                    if(result){
                        return response.status(201).send(result);
                    }else{
                        return response.status(204).send( 'ERROR AL INSERTAR ambiente' );
                    } 
                });
            }
        }else{
            return  response.status(400).send('Datos Erroneos!'); 
        }    
    }).catch(err => console.log("error:", err))
}

function updateAmbiente(request, response) {
    var body = request.body;
    var filter = {};
        if(request.params.id == null ){
            return response.send({ code: 'CAMPOS_ERROR', description: 'Campo Obligatorio' });
        }else{
            filter.id = request.params.id ;
            mongo_ambiente.findOneAndUpdate(
                { "_id":filter.id}, 
                { $set: 
                    { ...body  } 
                },
                { upsert :  true  } 
            ).then((result) => {
                if (result) {
                    response.send(  'Se actualizo correctamente'  );
                } else {
                    response.status(400).send({ code: 'ambiente_ERROR ', description: 'Verifique ambiente' });
                }
            }).catch(function (err) {
                return response.send({ code: 'POST_Suggestedambiente_ERROR', description: err.toString() });
            });
    }
}

function deleteAmbiente(request, response) {
    var filter = {};
    if (request.params.id) {
        filter._id = request.params.id;
    }
    mongo_ambiente.findOneAndRemove(filter, (err, result) => {
        if (err) {
            console.log(err);
            response.send( 'error al conectar' );
        }
        if (result) {
            return response.send({ title: "SUCCESSFUL", description: "ambiente Eliminado" });
        } else {
            return response.send({ code: 'DELETE_ERROR ', description: 'Verifique AMBIENTE' });
        }
    });
}

module.exports ={
    getAmbientes,
    createAmbiente,
    updateAmbiente,
    deleteAmbiente
} 