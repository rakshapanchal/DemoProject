
//Load category routes
const categoryRouter = require('../modules/category/categoryRoute')

//load product routes
const productRouter = require('../modules/product/productRoute')


//========================== Load Modules End ==============================================

//========================== Export Module Start ====== ========================

module.exports = function (app) {

    // Attach category Routes
    app.use('/furrstruck/category', categoryRouter);
    // Attach product Routes
    app.use('/furrstruck/product', productRouter)

};
