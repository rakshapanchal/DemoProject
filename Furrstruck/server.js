console.log("");
console.log("//************************* Furrstruck **************************//");
console.log("");




//Import Config
var env = require('dotenv').config();
const config = require('./lib/config');
// load external modules
const express = require("express");

// init express app
const app = express();
const morgan=require('morgan');
app.use(morgan('combined'))

// set server home directory
app.locals.rootDir = __dirname;

// config express
config.expressConfig(app, config.cfg.environment);

// attach the routes to the app
require("./lib/route")(app);

// start server
app.listen(config.cfg.port, () => {
   console.info(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
});


