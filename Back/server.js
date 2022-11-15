const express = require("express");
const app = express();
const ControlRoutes = require('./routes/Routes');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');


app.use(logger('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(methodOverride());
app.use(cors());

// Use Control Routes
app.use('/app', ControlRoutes);



// Use Rekognition API
let port = process.env.PORT || 8081;

//mongo connect

mongoose.connect('mongodb://localhost:27017/ControlAmbientes');

app.listen(port, function (){
    console.log("Server Port "+ port);
});