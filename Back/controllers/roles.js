let mongo_roles = require('../models/roles');

function getRoles(request, response){
    mongo_roles.find().exec((err, roles) => {
        if (err) {
            console.log("Error Busqueda");
        }else if(roles != 0){
            return response.send(roles)
        }else{
            return response.send("Roles Vacios")
        }
    })
}


module.exports ={
    getRoles
} 