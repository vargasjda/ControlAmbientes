const express = require('express');
const user = require('../controllers/users');
const login = require('../controllers/login');
const roles = require('../controllers/roles');
const bloques = require('../controllers/bloques');
const ambientes = require('../controllers/ambientes');
const inventarios = require('../controllers/inventario');
const novedades = require('../controllers/novedades');

const app = express.Router();

// app.post('send-email', (req, res)=> {
//     console.log(req.body);
//     res.send('recibido');
// });

 
// Login
app.post('/login', login.loginUser);
app.get("/users", (req, res) => {
    
    if(!req.session.correo){
      res.end("No tienes permiso. Fuera de aquí");
    }else{
      
      res.end("Hola " + req.session.nombre);
    }
  });

// User
app.get('/users', user.getUsers);
app.post('/users', user.createUser);
app.patch('/users/:id', user.updateUser);
app.delete('/users/:id', user.deleteUser);


//Roles
app.get('/roles', roles.getRoles);


// BLoques
app.get('/bloques', bloques.getBloques);
app.post('/bloques', bloques.createBloque);
app.patch('/bloques/:id', bloques.updateBloque);
app.delete('/bloques/:id', bloques.deleteBloque);


// Ambientes
app.get('/ambientes', ambientes.getAmbientes);
app.post('/ambientes', ambientes.createAmbiente);
app.patch('/ambientes/:id', ambientes.updateAmbiente);
app.delete('/ambientes/:id', ambientes.deleteAmbiente);


// Inventario
app.get('/inventarios', inventarios.getInventarios);
app.post('/inventarios', inventarios.createInventario);
app.patch('/inventarios/:id', inventarios.updateInventario);
app.delete('/inventarios/:id', inventarios.deleteInventario);


// Novedades
app.get('/novedades', novedades.getNovedades);
app.post('/novedades', novedades.createNovedad);
app.patch('/novedades/:id', novedades.updateNovedad);
app.delete('/novedades/:id', novedades.deleteNovedad);





module.exports = app;