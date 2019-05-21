
// ==========================================Load Internal Modules==================================================================

const categoryMapper = require('./categoryMapper')
const categoryService = require("./categoryService")
const resHndlr = require("../../responseHandler");
const categoryMsg = require('./categoryConstants').messages
var mongoose = require('mongoose');

// ===============================================Load Modules End====================================================================


/**check require field is validate */
function validateBody(req, res, next) {
   if (!req.body.name) {
      //for invalid body response
      return resHndlr.hndlError(res, categoryMapper.bedRequestRes(categoryMsg.nameNotEmpty))
   } else {
      next();
   }
}

/** check mongoose ObjectId is valid */
function validateId(req, res, next) {
   var id = req.params.id
   if (mongoose.Types.ObjectId.isValid(id) == true) {
      next()
   } else {
      //calling bedRequestRes for represent Invalid msg
      return resHndlr.sendError(res, categoryMapper.bedRequestRes(categoryMsg.invalidId))
   }
}

/**common function for check category permission is valid */
function checkPermissionValid(checkPermission, res, next) {
   if (checkPermission == true) {
      next()
   } else {
      return resHndlr.sendError(res, categoryMapper.forBidden())
   }
}

/** check Add Category Permission of login user  */
async function checkAddPermissions(req, res, next) {
   var checkPermission = await categoryService.checkRoleAndPermission(req, res, "add")
   checkPermissionValid(checkPermission, res, next)
}

/** check Edit Category Permission of login user  */
async function checkEditPermissions(req, res, next) {
   var checkPermission = await categoryService.checkRoleAndPermission(req, res, "update")
   checkPermissionValid(checkPermission, res, next)
}

/** check Delete Category Permission of login user  */
async function checkDeletePermissions(req, res, next) {
   var checkPermission = await categoryService.checkRoleAndPermission(req, res, "delete")
   checkPermissionValid(checkPermission, res, next)
}

/** check View Category Permission of login user  */
async function checkViewPermission(req, res, next) {
   var checkPermission = await categoryService.checkRoleAndPermission(req, res, "view")
   checkPermissionValid(checkPermission, res, next)
}



// ========================================EXPORT Module============================================================================

module.exports = {
   validateBody,/**check require field is validate */

   validateId,/** check mongoose ObjectId is valid */

   checkAddPermissions,/** check Add Category Permission of login user  */

   checkDeletePermissions,/** check Delete Category Permission of login user  */

   checkEditPermissions,/** check Edit Category Permission of login user  */

   checkViewPermission,/** check View Category Permission of login user  */

};
