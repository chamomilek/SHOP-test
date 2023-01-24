const fs = require('fs')
const path =require('path')
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json')

module.exports = class Cart {
    static addToCart(id, price) {
         //fetch all prod
         fs.readFile(p, (err, dataFile) => {
            let cart = {products: [], fullPrice: 0};
            if(!err){
                cart = JSON.parse(dataFile);
            }
            let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingProduct = cart.products[existingProductIndex];
            let updatedPoduct;
            if(existingProduct) {
                updatedPoduct = {...existingProduct};
                updatedPoduct.qty = updatedPoduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedPoduct;
            }
            else {
                updatedPoduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedPoduct];
            }
            cart.fullPrice = cart.fullPrice + +price;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
         })
    }

    static deleteProdFromCart(id, itemPrice) {
        fs.readFile(p, (err, dataFile) => {
            if (err) {
                return;
            }
            let cart = JSON.parse(dataFile);
            let updatedPoduct = {...cart};
            const delItem = updatedPoduct.products.find(prod => prod.id === id);
            if(!delItem) {
                return;
            }
            const productQty = delItem.qty;
            updatedPoduct.products.filter(prod => prod.id !== id);
            updatedPoduct.fullPrice = updatedPoduct.fullPrice - itemPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedPoduct), err => {
                console.log(err);
            })
        })
    }


    static GetCartPoducts(cb) {
        fs.readFile(p, (err, dataFile) => {
            if(err) {
                return null;
            }
            else {
                const cart = JSON.parse(dataFile);
                cb(cart);
            }
        })
    }
}