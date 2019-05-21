var facade = require('../ms2-product/lib/modules/category/categoryFacade')
var facade1 = require('../ms2-product/lib/modules/product/productFacade')
var app = 'localhost:8600/furrstruck/category';
let chai = require('chai');
var expect = chai.expect;
var env = require('dotenv').config();

var auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiYWRtaW5JZCI6IjVjNWFiMGM0NGU1MDE5M2ZmYjM1NGZkNCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwic3RhdHVzIjoiQWN0aXZlIiwicHJvZHVjdFBlcm1pc3Npb24iOnsiYWRkIjp0cnVlLCJkZWxldGUiOnRydWUsInVwZGF0ZSI6dHJ1ZSwidmlldyI6dHJ1ZX0sImNhdGVyZ29yeVBlcm1pc3Npb24iOnsiYWRkIjp0cnVlLCJkZWxldGUiOnRydWUsInVwZGF0ZSI6dHJ1ZSwidmlldyI6dHJ1ZX0sInN1YkFkbWluUGVybWlzc2lvbiI6eyJhZGQiOnRydWUsImRlbGV0ZSI6dHJ1ZSwidXBkYXRlIjp0cnVlLCJ2aWV3Ijp0cnVlfSwiaWF0IjoxNTU3MzgyNDgwLCJleHAiOjE1NTc0Njg4ODB9.L8tIB9FPgT2_xJymlrbXA-kGMBedFDK-0igawrPEpwI"




describe(' category modules...', function () {
    it('add category', (done) => {
        req = {
            headers: {
                "authorization": auth
            },
            body: {
                "name": "eat5"
            }
        }
        facade.addCategory(req).then((response) => {
            if (response.responsecode == 400) {
                expect(response.responsecode).to.equal(400)
            } else {
                expect(response.responsecode).to.equal(201)
            }
            done()
        })
    })

    it('add subCategory', (done) => {
        req = {
            headers: {
                "authorization": auth
            },
            body: {
                "name": "pizza"
            },
            params: {
                "id": "5c9dff2b324bf57918402019"
            }

        }
        facade.addSubCategory(req).then((response) => {
            if (response.responsecode == 400) {
                expect(response.responsecode).to.equal(400)
            } else {
                expect(response.responsecode).to.equal(201)
            }
            done()
        })
    })

    it('update category/subCategory', (done) => {
        req = {
            headers: {
                "authorization": auth
            },
            body: {
                "name": "pizza1"
            },
            params: {
                "id": "5c9dff2b324bf57918402019"
            }

        }
        facade.updateCategory(req).then((response) => {
            if (response.responsecode == 400) {
                expect(response.responsecode).to.equal(400)
            } else {
                expect(response.responsecode).to.equal(200)
            }
            done()
        })
    })

    it('update status of category/subCategory', (done) => {
        req = {
            headers: {
                "authorization": auth
            },
            params: {
                "id": "5c9dff2b324bf57918402019"
            }
        }
        facade.updateCatgryStatus(req).then((response) => {
            expect(response.responsecode).to.equal(200)
            done()
        })
    })

    it('get category of subcategories', (done) => {
        req = {
            params: {
                "id": '5c9dff2b324bf57918402019'
            }
        }
        facade.getSubCategory(req).then((response) => {
            expect(response.responsecode).to.equal(200)
            done()
        })
    })

    it('get all category ', (done) => {
        req = {}
        facade.getAllCategry(req).then((response) => {
            expect(response.responsecode).to.equal(200)
            done()
        })
    })

    it('get all number of category ', (done) => {
        facade.categoryCount(req).then((response) => {
            expect(response.responsecode).to.equal(200)
            done()
        })
    })

    it('delete category/subcategory ', (done) => {
        req = {
            headers: {
                "authorization": auth
            },
            params: {
                "id": '5c9dff2b324bf57918402019'
            }
        }
        facade.deleteCategory(req).then((response) => {
            expect(response.responsecode).to.equal(200)
            done()
        })
    })

})

// describe(' Products modules...', function () {
//     it('add product', (done) => {
//         req = {
//             headers: {
//                 "authorization": auth
//             },
//             body: {
//                 "name": "45",
//                 "description": "good",
//                 "price": 560,
//                 "stockValue": "12",
//                 "category": "5c9e04bfa9a10c022b5200f1",
//                 "tags": ["wear"],
//                 "sizes": { "size": "10" },
//                 "brand": "xyz",
//                 "offers": "10",
//                 "calories": "12"
//             }
//         }
//         facade1.addProduct(req).then((response) => {
//             expect(response.responsecode).to.equal(201)
//             done()
//         })
//     })

//     it('update product', (done) => {
//         req = {
//             headers: {
//                 "authorization": auth
//             },
//             body: {
//                 "name": "45",
//                 "description": "good",
//                 "price": 560,
//                 "stockValue": "12",
//                 "category": "5c9e04bfa9a10c022b5200f1",
//                 "tags": ["wear"],
//                 "sizes": { "size": "10" },
//                 "brand": "xyz",
//                 "offers": "10",
//                 "calories": "12"
//             },
//             params: {
//                 "id": "5c9dff2b324bf57918402019"
//             }

//         }
//         facade1.updateProduct(req).then((response) => {
//             expect(response.responsecode).to.equal(200)
//             done()
//         })
//     })

//     it('delete product', (done) => {
//         req = {
//             headers: {
//                 "authorization": auth
//             },
//             params: {
//                 "id": "5c9dff2b324bf57918402019"
//             }
//         }
//         facade1.deleteProduct(req).then((response) => {
//             expect(response.responsecode).to.equal(200)
//             done()
//         })
//     })

//     it('get each product details', (done) => {
//         facade1.getAllProduct(req).then((response) => {
//             expect(response.responsecode).to.equal(200)
//             done()
//         })
//     })

//     it('get number of product', (done) => {
//         facade1.productCount(req).then((response) => {
//             expect(response.responsecode).to.equal(200)
//             done()
//         })
//     })

//     it('add product as feature product ', (done) => {
//         req = {
//             headers: {
//                 "authorization": auth
//             },
//             body: {
//                 "Id": ""
//             }
//         }
//         facade1.addFeatureProduct(req).then((response) => {
//             expect(response.responsecode).to.equal(201)
//             done()
//         })
//     })

//     it('remove feature products', (done) => {
//         req = {
//             headers: {
//                 "authorization": auth
//             },
//             body: {
//                 "Id": ''
//             }
//         }
//         facade.categoryCount(req).then((response) => {
//             expect(response.responsecode).to.equal(200)
//             done()
//         })
//     })

//     it('get all feature product', (done) => {
//         req = {
//             headers: {
//                 "authorization": auth
//             }
//         }
//         facade1.getFeatureProduct(req).then((response) => {
//             expect(response.responsecode).to.equal(200)
//             done()
//         })
//     })

// })
//    describe('user get default product',function(){
//        it("get ")
//    })