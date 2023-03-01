const express = require("express");
const app = express();
const ControlRoutes = require('./routes/Routes');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const session = require('express-session');


app.use(logger('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(session({
    secret: 'RPvACp7kfkzBswd1',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 60000
    }
}));

app.use(bodyParser.json());

app.use(methodOverride());
app.use(cors());

// Use Control Routes
app.use('/app', ControlRoutes);

// Use Rekognition API
let port = process.env.PORT || 8081;

//mongo connect
const uri = "mongodb://mongoadmin:admin123@localhost:27017/?authMechanism=DEFAULT";
//mongoose.connect(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch(err => console.error('Error al conectar a la base de datos', err));

app.listen(port, function (){
    console.log("Server Port "+ port);
});