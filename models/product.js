const fs = require('fs')
const path = require('path')
const p = path.join(path.dirname(require.main.filename), 'data', 'product.json')

const Cart = require('./cart')

const getDatafromFile = cb => {
    fs.readFile(p, (err, data) => {
        if(err) {
           cb([]);
        }
        else {
          cb(JSON.parse(data));
        }
    });
};

module.exports = class Product {
    constructor(id, title, price, imageUrl, description) {
        this.id = id
        this.title = title
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
    }

    save() {
        getDatafromFile(products => {
            if(this.id) {
                const updatedPoduct = [...products];
                const prodIndex = products.findIndex(prod => prod.id === this.id);
                updatedPoduct[prodIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedPoduct), err => {
                    console.log(err);
                })
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                })
            }
        })
    }

    static deleteProduct(prodId) {
        getDatafromFile(products => {
            // const existingPrroducts = [...products];
            // const arr = [];
            // existingPrroducts.forEach(prod => {
            //     if (prod.id !== prodId)
            //     arr.push(prod)
            // });
            const product = products.find(prod => prod.id === prodId)
            const updatedPoduct = products.filter(prod => prod.id !== prodId)
            fs.writeFile(p, JSON.stringify(updatedPoduct), err => {
                if(!err) {
                    Cart.deleteProdFromCart(prodId, product.price)
                }
                console.log(err);
            })
        })
    }

    static fetchAll(cb) {
        getDatafromFile(cb)
    }

    static getById(pId, cb) {
        this.fetchAll(prdById => {
           const item = prdById.find(p => p.id === pId)
           cb(item)
        })
    }
}