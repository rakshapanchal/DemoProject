// ========================================Load Internal Modules======================================================

let BaseDao = require('../../dao/baseDao');
const categoryModel = require('./categoryModel')
const catgryDao = new BaseDao(categoryModel)
const mongoClient = require('../../dao/mongoClient')
const db = require('../../config/dbConfig')
const mongoose = require('mongoose')

// ==========================================Load Modules End==========================================================



// ===========================userModel=======================================


/** category id push in users Data 
 * 
 * @param {*string} id userId
 * @param {*string} data Id of category and subcategory
 * @param {*string} type type of category or subCategory
 */
function updateAdminData(id, data, type) {
    let update = {};
    if (type == 'category') {
        update['$push'] = { category: data }
    } else {
        update['$push'] = { subCategory: data }
    }
    return mongoClient.findOneAndUpdate(id, update).then((result) => {
        return result
    })

}

/**find users data
 * 
 * @param {*string} id 
 */
function findUserData(id) {
    return mongoClient.findUser(id).then((result) => {
        return result
    })
}
// ===================================categoryModel==================================


/**add category and subCategory
 * 
 * @param {*object} categoryInfo category data
 */
async function addCategory(categoryInfo) {

    let newConnection = await db.createMongooseConnection();

    let data = new categoryModel(categoryInfo);

    return catgryDao.save(data).then(result => {
        newConnection.connection.close()
        return result;
    });;
}

/**this function check category already exist or not
 * 
 * @param {*string} categoryInfo (request category name)
 */
async function checkIfExist(categoryInfo) {
    let newConnection = await db.createMongooseConnection();

    let query = {};
    query.name = categoryInfo.name

    return catgryDao.findOne(query).then(result => {
        newConnection.connection.close()
        return result;
    });;
}

/**this function check category already exist or not on update time
 * 
 * @param { string} id
 * @param {*string} categoryInfo (request category name)
 */
async function checkIfExistName(id, categoryInfo) {
    let newConnection = await db.createMongooseConnection();

    let query = { $and: [{ _id: { $ne: id } }, { name: categoryInfo.name }] };
    return catgryDao.findOne(query).then(result => {
        newConnection.connection.close()
        return result;
    });;
}

/**update category and subCategory 
 * 
 * @param {*string} id request id
 * @param {*string} data  updated data 
 */
async function updateCategory(id, data) {
    let newConnection = await db.createMongooseConnection();
    let query = {};
    query._id = id

    var update = {};
    update['$set'] = data

    let option = {};
    option.new = true;
    return catgryDao.findOneAndUpdate(query, update, option).then(result => {
        newConnection.connection.close()
        return result;
    });;
}

/** for find category data 
 * 
 * @param {*string} id 
 */
async function findData(id) {
    let newConnection = await db.createMongooseConnection();
    return catgryDao.findOne(id).then(result => {
        newConnection.connection.close()
        return result;
    });;
}

/**for update subCategory status
 * @param {*string} id subCategory id
 * @param {*string} status subCategory status
 * @param {*string} adminId  userId
 */
async function updateSubCategory(id, status, adminId) {
    let newConnection = await db.createMongooseConnection();
    let query = {};
    query.category = id

    let update = {};
    update['$set'] = { status: status, editedBy: adminId }

    let option = {};
    option.multi = true

    return catgryDao.update(query, update, option).then(result => {
        newConnection.connection.close()
        return result;
    });;
}

/**for get All Category
 * 
 * @param {*string} type type
 * @param {*string} status status of category(delete)
 */
async function getAllCategory(type, status) {
    let newConnection = await db.createMongooseConnection()
    // let options = {}
    // var { page, size } = req.query
    // options.offset = parseInt(size) * (parseInt(page))
    // options.limit = parseInt(size)
    let data = [
        { $match: { $and: [{ status: { $ne: status } }, { type: type }] } },
        {
            $lookup: {
                from: 'admins',
                foreignField: '_id',
                localField: 'createdBy',
                as: 'createdBy'
            }
        },
        { $unwind: '$createdBy' },
        {
            $project: { 'createdBy.userName': 1, '_id': 1, 'status': 1, 'type': 1, 'createdAt': 1, 'name': 1, 'metaTags': 1 }
        }
    ]
    return catgryDao.aggregate(data).then(result => {
        newConnection.connection.close()
        return result;
    }).catch((err) => getAllCategory(type, status))
}


/**fetch all subCategory of category
 * 
 * @param {*string} id categoryId
 * @param {*string} type type
 */
async function getSubCategory(id, type, status) {
    let newConnection = await db.createMongooseConnection();
    let data = [
        { $match: { $and: [{ category: mongoose.Types.ObjectId(id) }, { type: type }, { status: { $ne: status } }] } },
        {
            $lookup: {
                from: 'admins',
                foreignField: '_id',
                localField: 'createdBy',
                as: 'createdBy'
            }
        },
        {
            $lookup: {
                from: 'categories',
                foreignField: '_id',
                localField: 'category',
                as: 'category'
            }
        },
        { $unwind: '$category' },
        { $unwind: '$createdBy' },
        {
            $project: { 'createdBy.userName': 1, '_id': 1, 'status': 1, 'type': 1, 'createdAt': 1, 'name': 1, 'category.name': 1, 'metaTags': 1 }
        }
    ]
    return catgryDao.aggregate(data).then(result => {
        newConnection.connection.close()
        return result;
    });;
}


// ========================================EXPORT Module============================================================================

module.exports = {

    updateAdminData, /** category id push in user Data */

    addCategory, /**save category and subCategory*/

    checkIfExist, /**this function check category already exist or not*/

    updateCategory, /**update category and subCategory */

    checkIfExistName,/**this function check category already exist or not on update time*/

    findData, /**find category data */

    updateSubCategory, /**for update subCategory status*/

    getAllCategory,/**for get All Category*/

    findUserData,/**find user data*/

    getSubCategory,/**fetch all subCategory of category*/

}