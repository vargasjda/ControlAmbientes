let mongo_user = require('../models/user');

function getUsers(request, response){
    mongo_user.find().exec((err, users) => {
        if (err) {
            console.log("Error Busqueda");
        }else if(users != 0){
            return response.send(users)
        }else{
            return response.send("Usuarios Vacios")
        }
    })
}

function createUser(request, response){
    var body = request.body;
    var filter = {};
    var campos = [];

    body.branchId != "" ? filter.branchId= body.branchId :  campos.push("Sucursal");
    body.userName != "" ? filter.userName= body.userName :  campos.push("Nombre");
    body.password != "" ? filter.password= body.password :  campos.push("Clave");
    body.rol      != "" ? filter.rol     = body.rol      :  campos.push("Rol");

    if (campos.length == 1){  return response.status(400).send({description: "El Campo:  " +JSON.stringify(campos) +" es Obligatorio. "})}
    if (campos.length > 1){  return response.status(400).send( {description: "Los Campos:  " +campos.toString() +" son Obligatorios."})}

    mongo_user.find(filter).exec()
    .then((user)=>{
        if(user){
            if(user.length>0){
                return response.send({ code: 'USER_ERROR', description: 'USUARIO YA EXISTENTE' });
            }else{  
                mongo_user.insertMany(body, (err, result) => {
                    if(result){
                        return response.status(201).send(result);
                    }else{
                        return response.status(204).send({ code: 'INSERT_ERROR', description: 'INSERT USER PROBLEMS' });
                    } 
                });
            }
        }else{
            return  response.status(400).send('Datos Erroneos!'); 
        }    
    }).catch(err => console.log("error:", err))
}

function updateUser(request, response) {
    var body = request.body;
    var filter = {};
        if(request.params.id == null ){
            return response.send({ code: 'CAMPOS_ERROR', description: 'Campo Obligatorio' });
        }else{
            filter.id = request.params.id ;
            mongo_user.findOneAndUpdate(
                { "_id":filter.id}, 
                { $set: 
                    { ...body  } 
                },
                { upsert :  true  } 
            ).then((result) => {
                if (result) {
                    response.send({ code: 'Actualizacion / Creacion ', description: result });
                } else {
                    response.status(400).send({ code: 'USER_ERROR ', description: 'Verifique User' });
                }
            }).catch(function (err) {
                return response.send({ code: 'POST_SuggestedUser_ERROR', description: err.toString() });
            });
    }
}

function deleteUser(request, response) {
    var filter = {};
    if (request.params.id) {
        filter._id = request.params.id;
    }
    mongo_user.findOneAndRemove(filter, (err, result) => {
        if (err) {
            console.log(err);
            response.send({ code: 'CONNECTION_ERROR', description: 'MONGODB CONNECTION PROBLEMS' });
        }
        if (result) {
            return response.send({ title: "SUCCESSFUL", description: "Usuario Eliminado" });
        } else {
            return response.send({ code: 'DELETE_ERROR ', description: 'Verifique Usuario' });
        }
    });
}

module.exports ={
    getUsers,
    createUser,
    updateUser,
    deleteUser  
} 