let mongo_user = require('../models/user');

function loginUser(request, response, next){
    var body = request.body;
    var filter = {};
    if (body.userName && body.password) {
        filter.userName = body.userName;
        filter.password = body.password;
    }else{
        return response.send({ code: 'CAMPO_ERROR', description: 'Campo Obligatorio' });
    }
    mongo_user.find({$and: [{"userName":filter.userName }, {"password":filter.password}]}).exec((err, users) => {
        if (err) {
        }else if(users != 0){
            return response.send(users)
        }else{
            return  response.status(204).send('Datos Erroneos!'); 
        }
    })
}

module.exports ={
    loginUser
}