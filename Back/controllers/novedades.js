let mongo_novedad = require('../models/novedades');

function getNovedades(request, response){
    mongo_novedad.find().exec((err, novedades) => {
        if (err) {
            console.log("Error Busqueda");
        }else if(novedades != 0){
            return response.send(novedades)
        }else{
            return response.send("novedades Vacias")
        }
    })
}

function createNovedad(request, response){
    var body = request.body; 
    console.log(body) ;  
    mongo_novedad.find(body).exec()
    .then((novedad)=>{
        if(novedad){
            if(novedad.length>0){
                return response.send( 'NOVEDAD YA EXISTENTE' );
            }else{  
                mongo_novedad.insertMany(body, (err, result) => {
                    if(result){
                        console.log(result)
                        return response.status(201).send(result);
                        
                    }else{
                        console.log(err)
                        return response.status(204).send({"error": 'ERROR AL INSERTAR NOVEDAD' });
                    } 
                });
            }
        }else{
            return  response.status(400).send('Datos Erroneos!'); 
        }    
    }).catch(err => console.log("error:", err))
}

function updateNovedad(request, response) {
    var body = request.body;
    var filter = {};
        if(request.params.id == null ){
            return response.send({ code: 'CAMPOS_ERROR', description: 'Campo Obligatorio' });
        }else{
            filter.id = request.params.id ;
            mongo_novedad.findOneAndUpdate(
                { "_id":filter.id}, 
                { $set: 
                    { ...body  } 
                },
                { upsert :  true  } 
            ).then((result) => {
                if (result) {
                    response.send(  'Se actualizo correctamente'  );
                } else {
                    response.status(400).send({ code: 'novedad_ERROR ', description: 'Verifique novedad' });
                }
            }).catch(function (err) {
                return response.send({ code: 'POST_Suggestednovedad_ERROR', description: err.toString() });
            });
    }
}

function deleteNovedad(request, response) {
    var filter = {};
    if (request.params.id) {
        filter._id = request.params.id;
    }
    mongo_novedad.findOneAndRemove(filter, (err, result) => {
        if (err) {
            console.log(err);
            response.send( 'error al conectar' );
        }
        if (result) {
            return response.send({ title: "SUCCESSFUL", description: "novedad Eliminada" });
        } else {
            return response.send({ code: 'DELETE_ERROR ', description: 'Verifique novedad' });
        }
    });
}

module.exports ={
    getNovedades,
    createNovedad,
    updateNovedad,
    deleteNovedad
      
} 