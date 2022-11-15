const express = require('express');
const user = require('../controllers/users');
const login = require('../controllers/login');
const roles = require('../controllers/roles');
const bloques = require('../controllers/bloques');

const app = express.Router();

// Login
app.post('/login', login.loginUser);

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
app.patch('/bloques/:id', bloques.updatebloque);
app.delete('/bloques/:id', bloques.deletebloque);

module.exports = app;