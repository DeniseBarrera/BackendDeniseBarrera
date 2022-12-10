const express = require("express");
const handlebars = require('express-handlebars');
const Container = require("./API/Container");

const router = express.Router();
const container = new Container();

router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/productos', (req, res) => {
    const productos = container.getAll();
    res.render('products', {productos, hayProductos: true});
});

router.post('/productos', (req, res) => {
    container.create(req.body);
    res.redirect('/productos');
});

module.exports = router;