const express = require("express");
const Container = require("./Container");


const router = express.Router();
const container = new Container();

router.get("/", (_req, res) => {
    const products = container.getAll();
    res.send(products);
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const product = container.getById(parseInt(id));
    res.send(product);
});
router.post("/", (req, res) => {
    const obj = req.body;
    const newProduct = container.create(obj);
    res.send(newProduct);
});
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    const updateProduct = container.updateById(parseInt(id));
    res.send(updateProduct);
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const deleteProduct = container.deleteById(parseInt(id));
    res.send(deleteProduct);
});


module.exports = router;