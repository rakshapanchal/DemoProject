// load all dependencies
var Promise = require("bluebird");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var resHndlr = require('./responseHandler')
var categoryMapper = require('./modules/category/categoryMapper')


/**for verify Token */
var verifyToken = function (req, res, next) {
  let token = req.headers['authorization']
  return jwt.verifyAsync(token, process.env.admin_secret)
    .then(function (tokenPayload) {
      next();
    })
    .catch(function (err) {
      return resHndlr.sendError(res, categoryMapper.unAuthorized())
    });
};


/**for verify  User Token */
var verifyUsersToken = function (req, res, next) {
  let token = req.headers['authorization']
  return jwt.verifyAsync(token, process.env.user_secret)
    .then(function (tokenPayload) {
      next();
    })
    .catch(function (err) {
      return resHndlr.sendError(res, categoryMapper.unAuthorized())
    });
};

/**for decode token */
var decodeToken = function (req) {
  let token = req.headers['authorization']
  return jwt.decode(token)
}

module.exports = {
 
  verifyToken: verifyToken,/**for verify Token */

  decodeToken: decodeToken,/**for decode token */

  verifyUsersToken:verifyUsersToken/**for verify user token */
};
