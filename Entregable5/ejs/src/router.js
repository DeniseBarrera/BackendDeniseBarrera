const express = require("express");
const Container = require("../API/Container");


const router = express.Router();
const container = new Container();


router.get('/productos', (req, res) => {
    const productos = container.getAll();
    res.render('index', {productos});
});

router.post("/productos", (req, res) => {
    container.create(req.body);
    res.redirect('/productos');
});

module.exports = router;