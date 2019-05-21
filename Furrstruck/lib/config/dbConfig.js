// 'use strict';

// //=================================== Load Modules start ===================================

// //=================================== Load external modules=================================
const mongoose = require('mongoose');

// //=================================== Load Modules end =====================================

async function createMongooseConnection() {
    let db = await mongoose.connect(process.env.dbUrl + process.env.dbName, { useNewUrlParser: true })
    return db
}


module.exports = {
    createMongooseConnection
} 
