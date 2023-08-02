const { Router } = require('express');
const ProductModel = require('../Models/product.model');
const productRouter = Router();
const expressFileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

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
productRouter.use(expressFileUpload({ useTempFiles: true }));
//  cloudinary setup
cloudinary.config({ cloud_name: process.env.cloud_name, api_key: process.env.api_key, api_secret: process.env.api_secret });

productRouter.post('/addProduct', async (req, res) => {
    let payload = req.body;
    const file = req.files.photo;

    try {
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if (result) {
                payload.image_link = result.url;
                payload.image_link1 = result.url;
                payload.id = Math.random() + Date.now();
                const product = new ProductModel(payload);
                await product.save();
                res.status(201).send({ msg: 'Successfully Added a Product', product });
            } else {
                console.log("error", err);
            }
        });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { productRouter };