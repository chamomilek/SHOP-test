const Product = require('../models/product')
const Cart = require('../models/cart')

exports.showAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product_list', {
            path: '/products',
            prods: products, 
            pageTitle: 'All products'})
        });
 } 

 exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            path: '/',
            prods: products, 
            pageTitle: 'Shop'})
        });
 }

exports.getCart = (req, res, next) => {
    Cart.GetCartPoducts(cartProducts => {
        Product.fetchAll(products => {
            const dataCart = []
            products.forEach(prod => {
                const item = cartProducts.products.find(cartProd => cartProd.id === prod.id);
                if (item) {
                    dataCart.push({ productsCart: prod, qty: item.qty });
                 }
            });
            res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: dataCart,
            fullPrice: cartProducts.fullPrice
        })
        })
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId
    Product.getById(prodId, prodInfo => {
        Cart.addToCart(prodId, prodInfo.price)
    })
    // console.log(prodId)
    res.redirect('/cart')
}

exports.postCartDeleteProduct = (res, req, next) => {
    console.log('olo', req.body, req.body.prodId)
    const prodId = req.body.prodId;
    console.log(prodId)
    Product.getById(prodId, product => {
        Cart.deleteProdFromCart(prodId, product.price);
        res.redirect('/cart');
    })
}

exports.getOrder = (req, res, nex) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Order'
    })
}

exports.getCheckout = (req, res, nex) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.getDetails = (req, res, next) => {
    const prodId = req.params.prodId
    Product.getById(prodId, info => {
        res.render('shop/product-details', {
            pageTitle: 'Details',
            product: info
        })
    })
}