const { Router } = require('express');
const ProductModel = require('../Models/product.model');
const productRouter = Router();

// **************** Used to retrieves all products   ****************
productRouter.get('/allProducts', async (req, res) => {
    let query = req.query;

    try {
        let products = await ProductModel.find(query);
        res.status(200).send(products);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// **************** Used to retrieves Particular products by id   ****************
productRouter.get('/particularProduct/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findOne({ _id: id });
        res.status(200).send({ "msg": `Successfully get Product which id is ${id}`, product });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// **************** Used to add a product and store in your mongoDB   ****************
productRouter.post('/addProduct', async (req, res) => {
    let payload = req.body;

    try {
        const product = new ProductModel(payload);
        await product.save();
        res.status(201).send({ msg: 'Successfully Added a Product', product });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { productRouter };