const path = require('path')
const express = require('express')
const bodyPaser = require('body-parser')
const errorsController = require('./controllers/404')
const db = require('./utils/database')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')
const routerAdmin = require('./routes/admin')
const shopRouter = require('./routes/shop')

db.execute('select * from products')
.then(result => {
    console.log(result);
})
.catch(err => {
    console.log(err);
})

app.use(bodyPaser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', routerAdmin);
app.use(shopRouter);

app.use(errorsController.pageNotFound)

app.listen(80);