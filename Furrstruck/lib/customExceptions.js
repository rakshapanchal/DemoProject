//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
var Exception = require("./model/Exception");
var constants = require("./constants");

//========================== Load Modules End =============================

//========================== Export Module Start ===========================

module.exports = {
    intrnlSrvrErr: function (err) {
        return new Exception(1, constants.MESSAGES.intrnlSrvrErr, err);
    },
    inValidBody: function (err) {
        return new Exception(1, constants.MESSAGES.inValidBody, err);
    }
};

//========================== Export Module   End ===========================
