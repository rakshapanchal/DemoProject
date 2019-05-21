
//Load category routes
const categoryRouter = require('../modules/category/categoryRoute')




//========================== Load Modules End ==============================================

//========================== Export Module Start ====== ========================

module.exports = function (app) {

    // Attach category Routes
    app.use('/furrstruck/category', categoryRouter);
   

};
