// 'use strict';

// //=================================== Load Modules start ===================================

// //=================================== Load external modules=================================
const mongoose = require('mongoose');

// //=================================== Load Modules end =====================================

async function createMongooseConnection() {
    let db = await mongoose.connect(process.env.dbUrl + process.env.dbName, { useNewUrlParser: true })
    return db
}

// // Connect to Db
// function connectDb(env, callback) {
//     console.log(env.mongo.dbName, env.mongo.dbUrl)
//     let dbName = env.mongo.dbName;
//     let dbUrl = env.mongo.dbUrl;
//     let dbOptions = env.mongo.options;

//     if (env.isProd) {
//         dbUrl = dbUrl + dbName;
//     } else {
//         dbUrl = dbUrl + dbName;
//         mongoose.set('debug', true);
//     }

//     mongoose.connect(dbUrl, dbOptions);

//     // When successfully connected
//     mongoose.connection.on('connected', function () {
//         console.info('connected to DB', dbName, 'at', dbUrl);
//         callback();
//     });

//     // If the connection throws an error
//     mongoose.connection.on('error', function (err) {
//         console.info('DB connection error: ' + err);
//         callback(err);
//     });

//     // When the connection is disconnected
//     mongoose.connection.on('disconnected', function () {
//         console.info('DB connection disconnected');
//         callback("DB connection disconnected");
//     });
// }

module.exports = {
    createMongooseConnection
} 
