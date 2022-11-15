const express = require('express');
const user = require('../controllers/users');
const products = require('../controllers/products');
const branchs = require('../controllers/branchs');
const login = require('../controllers/login');
const categories = require('../controllers/categories');
const orders = require('../controllers/orders');
const roles = require('../controllers/roles');
const images = require('../configs/images');
const sessions = require('../controllers/sessions');
const infoDevice = require('../controllers/infoDevice');
const bloques = require('../controllers/bloques');

const app = express.Router();

// Login
app.post('/login', login.loginUser);

// User
app.get('/users', user.getUsers);
app.post('/users', user.createUser);
app.patch('/users/:id', user.updateUser);
app.delete('/users/:id', user.deleteUser);

// Branchs
app.get('/branchs', branchs.getBranchs);
app.post('/branchs', branchs.createBranchs);
app.patch('/branchs/:id', branchs.updateBranchs);

// Products
app.get('/products', products.getProducts);
app.post('/products', products.createProduct);
app.patch('/products/:id', products.updateProduct);
app.delete('/products/:id', products.deleteProduct);

// Categories
app.get('/categories', categories.getCategories);
app.post('/categories', categories.createCategories);
app.patch('/categories/:id', categories.updateCategories);

// Orders
app.get('/orders', orders.getOrders);
app.post('/ordersByStatusAdmin', orders.getOrdersByStatusAdmin);
app.post('/ordersByStatus', orders.getOrdersByStatus);
app.post('/ordersByBranch', orders.getOrdersByBranch);
app.post('/ordersByBranchAndBoard/', orders.getOrdersByBranchAndBoard);
app.post('/orders', orders.createOrder);
app.patch('/orderStatus/:id', orders.updateStatusOrder);
app.patch('/orderProducts/:id', orders.updateProductsOrder);
app.delete('/orders/:id', orders.deleteOrder);
app.get('/orders/:uid', orders.getOrders);

// Sessions
app.get('/sessions/:id', sessions.getSessions);
app.get('/sessionsbybranch/:id', sessions.getSessionsByBranch);
app.post('/sessions', sessions.createSessions);
app.patch('/sessions/:id', sessions.updateSessions);
app.delete('/sessions/:id', sessions.deleteSessions);

// infoDevice
app.get('/infoDevice/:id', infoDevice.getInfoDevice);
app.post('/infoDevice', infoDevice.createInfoDevice);
app.patch('/infoDevice/:id', infoDevice.updateInfoDevice);

//Roles
app.get('/roles', roles.getRoles);

//Images
app.get('/images', images.initClient);

// BLoques
app.get('/bloques', bloques.getBloques);
app.post('/bloques', bloques.createBloque);

module.exports = app;