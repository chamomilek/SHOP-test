const express = require('express')
const router = express.Router();
const shopConstroller = require('../controllers/shop')


router.get('/', shopConstroller.getIndex);

router.get('/cart', shopConstroller.getCart);

router.get('/orders', shopConstroller.getOrder);

router.get('/checkout', shopConstroller.getCheckout);

router.get('/products', shopConstroller.showAllProducts);

router.get('/product/:prodId', shopConstroller.getDetails);

router.post('/cart-delete-item', shopConstroller.postCartDeleteProduct);

router.post('/cart', shopConstroller.postCart);

module.exports = router;
