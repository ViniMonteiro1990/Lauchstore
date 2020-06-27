const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const productController = require('./app/constrollers/productController')
const homeController = require('./app/constrollers/homeController')
const searchController = require('./app/constrollers/searchController')

routes.get('/',homeController.index)

//SEARCH
routes.get('/products/search',searchController.index)

//Products
routes.get('/products/create', productController.create)
routes.get('/products/:id', productController.show)
routes.get('/products/:id/edit',productController.edit)

routes.post('/products',multer.array("photos", 6) ,productController.post)
routes.put('/products',multer.array("photos", 6) , productController.put)
routes.delete('/products', productController.delete)



//ALIAS = ATALHO
routes.get('/ads/create',function(req,res){
    return res.redirect("/products/create")
})

module.exports = routes