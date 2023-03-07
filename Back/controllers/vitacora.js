let mongo_vitacora = require('../models/vitacora');

function getVitacoras(request, response){
    mongo_vitacora.find().exec((err, vitacoras) => {
        if (err) {
            console.log("Error Busqueda");
        }else if(vitacoras != 0){
            return response.send(vitacoras)
        }else{
            return response.send("vitacoras Vacios")
        }
    })
}

function createVitacora(request, response){
    var body = request.body; 
       
    mongo_vitacora.find(body).exec()
    .then((vitacora)=>{
        if(vitacora){
            if(vitacoras.length>0){
                return response.send( 'vitacora YA EXISTENTE' );
            }else{  
                mongo_vitacora.insertMany(body, (err, result) => {
                    if(result){
                        return response.status(201).send(result);
                    }else{
                        return response.status(204).send( 'ERROR AL INSERTAR vitacora' );
                    } 
                });
            }
        }else{
            return  response.status(400).send('Datos Erroneos!'); 
        }    
    }).catch(err => console.log("error:", err))
}

function updateVitacora(request, response) {
    var body = request.body;
    var filter = {};
        if(request.params.id == null ){
            return response.send({ code: 'CAMPOS_ERROR', description: 'Campo Obligatorio' });
        }else{
            filter.id = request.params.id ;
            mongo_vitacora.findOneAndUpdate(
                { "_id":filter.id}, 
                { $set: 
                    { ...body  } 
                },
                { upsert :  true  } 
            ).then((result) => {
                if (result) {
                    response.send(  'Se actualizo correctamente'  );
                } else {
                    response.status(400).send({ code: 'vitacora_ERROR ', description: 'Verifique vitacora' });
                }
            }).catch(function (err) {
                return response.send({ code: 'POST_Suggestedambiente_ERROR', description: err.toString() });
            });
    }
}

function deleteVitacora(request, response) {
    var filter = {};
    if (request.params.id) {
        filter._id = request.params.id;
    }
    mongo_vitacora.findOneAndRemove(filter, (err, result) => {
        if (err) {
            console.log(err);
            response.send( 'error al conectar' );
        }
        if (result) {
            return response.send({ title: "SUCCESSFUL", description: "vitacora Eliminado" });
        } else {
            return response.send({ code: 'DELETE_ERROR ', description: 'Verifique vitacora' });
        }
    });
}

module.exports ={
    getVitacoras,
    createVitacora,
    updateVitacora,
    deleteVitacora
} 