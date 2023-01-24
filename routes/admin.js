const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../utils/path')
const adminConstoller = require('../controllers/admin')

router.get('/add-product', adminConstoller.getAddProductPage);

router.get('/products', adminConstoller.getProduct)

router.get('/edit-product/:prodId', adminConstoller.getEditProduct)

router.post('/edit-product',adminConstoller.postEditProduct)

router.post('/add-product', adminConstoller.postNewProduct);

router.post('/delete-product', adminConstoller.deleteProduct)

module.exports = router