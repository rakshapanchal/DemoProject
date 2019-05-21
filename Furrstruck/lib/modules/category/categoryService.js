// ======================================Load Internal Modules=============================================================
const categoryDao = require('./categoryDao')
const categoryMapper = require('./categoryMapper')
const jwthandler = require("../../jwtHandler")
const productDao = require('../product/productDao')
const types = require('./categoryConstants').types
const categoryMsg = require('./categoryConstants').messages
const status = require('../../constants').STATUS
// =====================================Load Modules End=================================================================*/

/** for addCategory */
function addCategory(req, res) {
    //use for decode admin token
    adminId = jwthandler.decodeToken(req).adminId
    var categoryInfo = req.body
    categoryInfo.createdBy = adminId
    //  calling categoryDao checkIfExist for the category is exist or not
    return categoryDao.checkIfExist(categoryInfo).then((exist) => {
        if (exist) {
            //calling categoryMapper bedRequestRes for category already exist response
            return categoryMapper.bedRequestRes(categoryMsg.exist);
        } else {
            //calling categoryDao addCategory for add category data
            return categoryDao.addCategory(categoryInfo)
                .then((result) => {
                    // for categoryId push in admin data
                    return categoryDao.updateAdminData(adminId, result._id, result.type).then((result1) => {
                        // calling addCategryRes for  success message
                        return categoryMapper.addCategryRes(result)
                    })
                })
        }
    })
}

/** for add  subCategory */
function addSubCategory(req, res) {
    //for find categorydata 
    return categoryDao.findData({ _id: req.params.id }).then((result) => {
        //for check category active/Inactive
        if (result.status != status.DELETE) {
            //use for decode admin token
            adminId = jwthandler.decodeToken(req).adminId
            var categoryInfo = req.body
            categoryInfo.createdBy = adminId
            categoryInfo.category = result._id
            categoryInfo.type = types.subCategory
            //  calling categoryDao checkIfExist for the subCategory is exist or not
            return categoryDao.checkIfExist(categoryInfo).then((exist) => {
                if (exist) {
                    //calling categoryMapper bedRequestRes for subCategory already exist response
                    return categoryMapper.bedRequestRes(categoryMsg.exist);
                } else {
                    // for add subCategory data
                    return categoryDao.addCategory(categoryInfo)
                        .then((result1) => {
                            // for categoryId push in admin data
                            return categoryDao.updateAdminData(adminId, result1._id, result1.type).then((result3) => {
                                // calling addCategryRes for success response
                                return categoryMapper.addCategryRes(result1)
                            })
                        })
                }
            })
        } else {
            return categoryMapper.dataNotFound()
        }
    })
}

/** for update category & subCategory */
function updateCategory(req, res) {
    //use for decode admin token
    adminId = jwthandler.decodeToken(req).adminId
    var categoryInfo = req.body
    categoryInfo.editedBy = adminId
    // for check category/subCategory is exist or not
    return categoryDao.checkIfExistName(req.params.id, categoryInfo).then((exist) => {
        if (exist) {
            //calling categoryMapper bedRequestRes for category already exist response
            return categoryMapper.bedRequestRes(categoryMsg.exist);
        } else {
            // calling categoryDao updateCategory for update data
            // here req.param.id=categoryId & categoryInfo= categoryData
            return categoryDao.updateCategory(req.params.id, categoryInfo).then((result) => {
                if (result) {
                    //  for success update response
                    return categoryMapper.updateCategryRes(result, categoryMsg.updated)
                } else {
                    return categoryMapper.dataNotFound()
                }
            })
        }
    })
}

/** for active/Inactive category and subCategory */
function updateCatgryStatus(req, res) {
    //for find category & subCategory data
    return categoryDao.findData({ _id: req.params.id }).then((result) => {
        if (!result) {
            return categoryMapper.dataNotFound()
        } else {
            // for decode admin token
            adminId = jwthandler.decodeToken(req).adminId
            result.editedBy = adminId
            if (result.status == status.ACTIVE) {
                result.status = status.INACTIVE
            } else if (result.status == status.INACTIVE) {
                result.status = status.ACTIVE
            } else {
                return categoryMapper.dataNotFound()
            }
            // for update category/subCategory  status 
            return categoryDao.updateCategory(result._id, result).then((data) => {
                // for update related product status
                productDao.updatePrductStatus(data._id, data.status, adminId, data.type).then((result1) => {
                    /**check type of data(category/subCategory) */
                    if (data.type == types.category) {
                        // for update subcategory status
                        return categoryDao.updateSubCategory(data._id, data.status, adminId).then((data1) => {
                            if (data1) {
                                //for updated success message
                                return categoryMapper.updateCategryRes(data, categoryMsg.updated)
                            } else {
                                return categoryMapper.dataNotFound()
                            }
                        })
                    }
                })
                return categoryMapper.updateCategryRes(data, categoryMsg.updated)
            })
        }
    })
}

/**fetch all subcategory of category */
function getSubCategory(req, res) {
    return categoryDao.getSubCategory(req.params.id, types.subCategory, status.DELETE).then((result) => {
        if (result.length > 0) {
            //for fetch response
            return categoryMapper.updateCategryRes(result, categoryMsg.ok)
        } else {
            //for data not found response
            return categoryMapper.dataNotFound()
        }
    })
}

/** for delete category and subCategory */
function deleteCategory(req, res) {
    //for decode admin token
    adminId = jwthandler.decodeToken(req).adminId
    // for delete the category/subCategory
    return categoryDao.updateCategory(req.params.id, { status: status.DELETE, editedBy: adminId }).then((result) => {
        if (!result) {
            return categoryMapper.dataNotFound()
        } else {
            //for deleted related product of category/subCategory
            productDao.updatePrductStatus(result._id, result.status, adminId, result.type).then((result1) => {
                /**check type of data(category/subCategory) */
                if (result.type == types.category) {
                    // for delete subcategory 
                    return categoryDao.updateSubCategory(result._id, result.status, adminId).then((data1) => {
                        if (data1) {
                            //for delete category response
                            return categoryMapper.updateCategryRes(result, categoryMsg.deleted)
                        } else {
                            //for data not found response
                            return categoryMapper.dataNotFound()
                        }
                    })
                }
            })

            return categoryMapper.updateCategryRes(result, categoryMsg.deleted)
        }
    })
}

/**for fetch All Category */
function getAllCategory(req, res) {
    //calling categoryDao findAllCategory function from service
    return categoryDao.getAllCategory(types.category, status.DELETE).then((result) => {
        //fetch all category response
        return categoryMapper.updateCategryRes(result, categoryMsg.ok)
    })
}

/**for Count Category */
function categoryCount(req, res) {
    //calling categoryDao findAllCategory function from service
    return categoryDao.getAllCategory(types.category, status.DELETE).then((result) => {
        //fetch all category length response
        return categoryMapper.updateCategryRes(result.length, categoryMsg.ok)
    })
}

/** for check role of login users */
function checkRoleAndPermission(req, res, action) {
    //use for decode admin token
    adminId = jwthandler.decodeToken(req).adminId
    //calling categoryDao findUserData function from service
    return categoryDao.findUserData(adminId).then((result) => {
        if (!result) {
            return false
        } else {
            //check role of users(result)
            if (result.role == "Admin") {
                return true;
            } else if (result.role == "User") {
                return this.checkPermission(result.catergoryPermission, action)
            } else if (result.role == "Subadmin") {
                return this.checkPermission(result.catergoryPermission, action)
            }
        }
    })

}

/** for check permission */
function checkPermission(data, action) {
    switch (action) {
        case 'add':
            if (data.add == true) {
                return true;
            } else {
                return false;
            }
        case 'update':
            if (data.update == true) {
                return true;
            } else {
                return false;
            }
        case 'view':
            if (data.view == true) {
                return true
            } else {
                return false;
            }
        case 'delete':
            if (data.delete == true) {
                return true
            } else {
                return false
            }
    }
}

// =====================================================EXPORT Module========================================================================  
module.exports = {

    checkRoleAndPermission,/**use for check role of login users */

    checkPermission,/**use for check permission */

    addCategory,/**use for add category */

    addSubCategory,/**use for add category */

    updateCategory,/**use for update category & subCategory */

    updateCatgryStatus,/** for active/Inactive category and subCategory */

    getAllCategory,/**for get All Category */

    getSubCategory,/**fetch all subcategory of category */

    deleteCategory, /** for delete category and subCategory */

    categoryCount/**for count category */
};