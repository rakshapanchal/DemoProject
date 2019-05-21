'use strict';

/**
 * return user home
 * @returns {*}
 */
function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

function getNodeEnv() {
    return process.env.NODE_ENV;
}


//========================== Export Module Start ===========================

module.exports = {
    getUserHome, getNodeEnv
};

//========================== Export Module End===========================
