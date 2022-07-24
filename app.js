const express = require("express");
const cors = require("cors");
const middleware = require('./utils/middleware.js');
const keepalive = require('./controller/keepAlive.js')
const entryController = require('./controller/entry.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.consoleData);

app.use('/keepalive', keepalive);
app.use('/',entryController)

//app.use('/login',loginController);
//app.use('/post', postController);

//app.get('/',middleware.getIndex);
//app.get('/listadoPeliculas',middleware.getListadoPeliculas);

app.use(middleware.unknownEndpoint);


module.exports = app;