
// ===================================Load Internal Modules================================================================================
const categoryRouter = require("express").Router()
const categoryFacade = require('./categoryFacade')
const Validators = require("./categoryValidators")
const resHndlr = require("../../responseHandler");
const jwtHandler = require("../../jwtHandler")

//  ====================================Load Modules End======================================================================

// ***************************************for admin pannel*****************************************************************

/**calling facade addCategory function from route */
categoryRouter.route('/addCategory')
    .post([Validators.validateBody, jwtHandler.verifyToken, Validators.checkAddPermissions], (req, res) => {
        categoryFacade.addCategory(req, res).then((result) => {
            resHndlr.sendSuccess(res, result);
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

/**calling  facade subCategories function from route */
categoryRouter.route('/addSubCategory/:id')
    .post([Validators.validateBody, jwtHandler.verifyToken, Validators.validateId, Validators.checkAddPermissions], (req, res) => {
        categoryFacade.addSubCategory(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })


/**calling facade updateCategory function from route */
categoryRouter.route('/updateCategory/:id')
    .put([Validators.validateBody, jwtHandler.verifyToken, Validators.validateId, Validators.checkEditPermissions], (req, res) => {
        categoryFacade.updateCategory(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

/**for active and Inactive category/subCategory  
 * calling facade updateCatgryStatus function from route
*/
categoryRouter.route('/updateCatgryStatus/:id')
    .get([jwtHandler.verifyToken, Validators.validateId, Validators.checkEditPermissions], (req, res) => {
        categoryFacade.updateCatgryStatus(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

/**calling facade getSubCategory function from route */
categoryRouter.route('/getSubCategory/:id')
    .get([jwtHandler.verifyToken, Validators.validateId, Validators.checkViewPermission], (req, res) => {
        categoryFacade.getSubCategory(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

/**calling facade getAllCategory function from route */
categoryRouter.route('/getAllCategory')
    .get([jwtHandler.verifyToken, Validators.checkViewPermission], (req, res) => {
        categoryFacade.getAllCategry(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })


/**calling facade categoryCount function from route */
categoryRouter.route('/categoryCount')
    .get([jwtHandler.verifyToken], (req, res) => {
        categoryFacade.categoryCount(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })


/**calling facade deleteCategory function from route */
categoryRouter.route('/deleteCategory/:id')
    .put([jwtHandler.verifyToken, Validators.validateId, Validators.checkDeletePermissions], (req, res) => {
        categoryFacade.deleteCategory(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

    
//*********************************for User panel***********************************************************/

/**calling facade getAllCategory function from route */
categoryRouter.route('/user/getAllCategory')
    .get([jwtHandler.verifyUsersToken, Validators.checkViewPermission], (req, res) => {
        categoryFacade.getAllCategry(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

/**calling facade getSubCategory function from route */
categoryRouter.route('/user/getSubCategory/:id')
    .get([jwtHandler.verifyUsersToken, Validators.validateId, Validators.checkViewPermission], (req, res) => {
        categoryFacade.getSubCategory(req, res).then((result) => {
            resHndlr.sendSuccess(res, result)
        }).catch((err) => {
            resHndlr.sendError(res, err)
        })
    })

// =====================================================EXPORT Module========================================================================  
// EXPORT categoryRouter  
module.exports = categoryRouter;