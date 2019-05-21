// ========================================Load Internal Modules========================================================

const categoryService = require('./categoryService')

// ==========================================End Load Modules=============================================================


/**calling service addCategory function from facade  */
function addCategory(req, res) {
    return categoryService.addCategory(req, res)
        .then((result) => {
            return result;
        })
}

/**calling service addSubCategory function from facade*/
function addSubCategory(req, res) {
    return categoryService.addSubCategory(req, res)
        .then((result) => {
            return result
        })
}


/**add service updateCategory function from facade */
function updateCategory(req, res) {
    return categoryService.updateCategory(req, res)
        .then((result) => {
            return result
        })
}

/**calling service updateCatgryStatus function from facade */
function updateCatgryStatus(req, res) {
    return categoryService.updateCatgryStatus(req, res)
        .then((result) => {
            return result
        })
}

/**calling service getSubCategory function from facade */
function getSubCategory(req, res) {
    return categoryService.getSubCategory(req, res)
        .then((result) => {
            return result
        })
}

/**calling service getAllCategory function from facade */
function getAllCategry(req, res) {
    return categoryService.getAllCategory(req, res)
        .then((result) => {
            return result
        })
}

/**calling service categoryCount function from facade */
function categoryCount(req, res) {
    return categoryService.categoryCount(req, res)
        .then((result) => {
            return result
        })
}

/**calling service deleteCategory function from facade */
function deleteCategory(req, res) {
    return categoryService.deleteCategory(req, res)
        .then((result) => {
            return result
        })
}


// ======================================Export Modules=================================================================

module.exports = {
    addCategory,/**calling service addCategory function  */

    addSubCategory,/**calling service addSubCategory function*/

    updateCategory, /**calling service updateCategory function from facade */

    updateCatgryStatus,/**calling service updateCatgryStatus function from facade */

    getAllCategry,/**calling service getAllCategory function from facade */

    categoryCount,/**calling service categoryCount function from facade */

    getSubCategory,/**calling service getSubCategory function from facade */

    deleteCategory/**calling service deleteCategory function from facade */

}