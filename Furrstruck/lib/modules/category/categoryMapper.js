// ===============================Load Internal Modules==================================================================

const categoryCode = require('./categoryConstants').http_codes
const categoryMsg = require('./categoryConstants').messages

// ===============================================Load Modules End====================================================================


/** add category & subCategory response
 *
 * @param {Object} result response data of addcategory and subCategory
 */
function addCategryRes(result) {
    var responseObj = {
        "responsecode": categoryCode.created,
        "responseMessage": categoryMsg.added,
        "result": result
    }
    return responseObj;
}

/**update,get,delete  category & subCategory response
 * 
 * @param {*Object} result response updated data of category and subCategory
 * @param {*string} message msg for perticular query
 */
function updateCategryRes(result, message) {
    var responseObj = {
        "responsecode": categoryCode.ok,
        "responseMessage": message,
        "result": result
      
    }
    return responseObj
}

/**Bed Request Response
 * 
 * @param {*string} message response message
 */
function bedRequestRes(message) {
    var responseObj = {
        "responsecode": categoryCode.badRequest,
        "responseMessage": message,
    }
    return responseObj;
}

/**for unAuthorized access
 * 
 * @param {*string} message response message
 */
function unAuthorized() {
    var responseObj = {
        "responsecode": categoryCode.unAuthorized,
        "responseMessage": categoryMsg.unAuthAccess,
    }
    return responseObj;
}

/**Permission Denied Response */
function forBidden() {
    var responseObj = {
        "responsecode": categoryCode.forbidden,
        "responseMessage": categoryMsg.permissionDenied
    }
    return responseObj;
}

/**Data Not Found response */
function dataNotFound() {
    var responseObj = {
        "responsecode": categoryCode.dataNotFound,
        "responseMessage": categoryMsg.dataNotFound
    }
    return responseObj;
}

// ========================================EXPORT Module============================================================================

module.exports = {
    addCategryRes, /* add category & subCategory response**/

    updateCategryRes,/**update,get,delete  category&subCategory response*/

    bedRequestRes,/**Bed Request Response */

    dataNotFound,/**Data Not Found response */

    unAuthorized,/**for unAuthorized access*/

    forBidden,  /**Permission Denied Response */

}