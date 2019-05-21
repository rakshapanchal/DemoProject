//===========================================Load External Modules=============================================================
const multer = require('multer');
const path = require('path')
//==========================================Load Modules End=================================================================

/**for store images using multer */
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        let file_Name = file.fieldname + ' ' + Date.now() + path.extname(file.originalname)
        //push fileName in array
        req.newFile_name.push(file_Name)
        callback(null, file_Name)
    }
})

/**upload images using multer */
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback)
    }
}).array('images', 5)


/**for check file types */
function checkFileType(file, callback) {
    const fileTypes = /jpeg|jpg|png/;
    const filecheck = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    if (filecheck) {
        return callback(null, true)
    } else {
        return callback('Error :Images Only')
    }
}

// =====================================Export Modules========================================================================
module.exports = {
    upload,/**upload images using multer */

    storage,/**for store images using multer */

    checkFileType /**for check file types */
}


