let mongo_user = require('../models/user');

function loginUser(request, response){
    var body = request.body;
    var filter = {};
    if (body.username && body.password) {
        filter.userName = body.username;
        filter.password = body.password;
    }else{
        return response.send({ code: 'CAMPO_ERROR', description: 'Campo Obligatorio' });
    }
    mongo_user.find(filter).exec((err, users) => {
        if (err) {
            return  response.send({ "status": false, "user": null }); 
        }else if(users != 0){
            console.log(users)
            return response.send({ "status": true, "user": users[0] });
        }else{
            return  response.send({ "status": false, "user": null }); 
        }
    })
}

module.exports ={
    loginUser
}
