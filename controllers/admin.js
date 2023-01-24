const Product = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: "Add new book",
        editing: false
    })
}

exports.postNewProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const prod = new Product(null, title, price, imageUrl, description)
    prod.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const edit = req.query.edit;
    if (!edit) {
        res.redirect('/') 
     }
    const prodId = req.params.prodId
    Product.getById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: "Edit product",
            editing: edit,
            product: product
        })
    })
}

exports.postEditProduct = (req, res, err) => {
    const prodId = req.body.prodId
    const title = req.body.title;
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const prod = new Product(prodId, title, price, imageUrl, description);
    prod.save();
    res.redirect('/');
}

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            path: '/products',
            prods: products, 
            pageTitle: 'Admin page for products'})
        });
}

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.prodId
    Product.deleteProduct(prodId);
    res.redirect('/admin/products');
}