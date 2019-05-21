// ========================================Load Internal Modules======================================================
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const con = require('../constants').DB_MODEL_REF

// ==========================================Load Modules End==========================================================
async function createConnection_ms(database) {
    return MongoClient.connect(process.env.dbUrl, { useNewUrlParser: true }).then((response) => {
        return { "response": response.db(database), "client": response }
    }).catch((err) => {
        return createConnection_ms(database);
    })
}


async function findUser(id) {
    let database = await createConnection_ms("furrstruck")
    var query = { _id: mongoose.Types.ObjectId(id) };
    return database.response.collection('admins').findOne(query).then(result => {
        database.client.close();
        return result;
    }).catch(e => findUser(id))
}

async function findOneAndUpdate(id, update) {
    option = { returnOriginal: false }
    let database = await createConnection_ms("furrstruck")
    var query = { _id: mongoose.Types.ObjectId(id) };
    return database.response.collection('admins').findOneAndUpdate(query, update, option).then(result => {
        database.client.close();
        return result;
    }).catch(e => findOneAndUpdate(id, update, option))
}

async function getFeatureProduct(id) {
    let data1 = [
        {
            $match: { _id: mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: 'products',
                foreignField: '_id',
                localField: 'featureProduct',
                as: 'featureProduct'
            }
        }, {
            $project: { 'featureProduct': 1 }
        }
    ]
    let database = await createConnection_ms("furrstruck")
    return database.response.collection('admins').aggregate(data1).toArray().then((result) => {
        database.client.close();
        return result;
    }).catch((err) => getFeatureProduct(id))

}

async function getCartProduct(id) {
    let data1 = [
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'products',
                foreignField: '_id',
                localField: 'cartProduct',
                as: 'cartProduct'
            }
        }, {
            $project: { 'cartProduct': 1 }
        }
    ]
    let database = await createConnection_ms("furrstruck")
    return database.response.collection('admins').aggregate(data1).toArray().then((result) => {
        database.client.close();
        return result;
    }).catch((err) => getCartProduct(id))
}

module.exports = {
    findUser,
    findOneAndUpdate,
    getFeatureProduct,
    getCartProduct
}
