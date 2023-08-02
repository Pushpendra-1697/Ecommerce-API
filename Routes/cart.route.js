const { Router } = require("express");
const cartRouter = Router();
const jwt = require("jsonwebtoken");
let CartModel = require("../Models/cart.model");

// ************** fetching cart items of particular user *********************
cartRouter.get("/fetchCartItems", async (req, res) => {
    let { token } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let userId = token.id;
    let cartItem = await CartModel.find({ userId, active: true }).populate({
        path: "products",
        populate: { path: "productId" },
    });
    try {
        if (cartItem.length > 0) {
            res.status(200).send({ cart: cartItem });
        } else {
            res.status(200).send({ msg: "there is no item inside the cart" });
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// ************** add to cart / Update quantities (default 1 quantity at first addToCart) *********************
cartRouter.post("/addToCart", async (req, res) => {
    let { token } = req.headers;
    let { productId, qty } = req.body;
    token = jwt.decode(token, process.env.secret_key);
    let userId = token.id;
    let cart = await CartModel.findOne({ userId });

    try {
        if (!cart) {
            let newCartItem = new CartModel({ userId, products: [{ productId }] });
            await newCartItem.save();
            res.status(200).send({ msg: 'Product added in cart', cart: newCartItem });
        } else {
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);
            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity = productItem.quantity + qty;
                cart.products[itemIndex] = productItem;
            } else {
                cart.products.push({ productId });
            }
            await cart.save();
            res.status(201).send({ msg: 'Product added in cart with quentity updated', cart });
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// **************** Remove from Cart ******************
cartRouter.post("/deleteFromCart", async (req, res) => {
    let { token } = req.headers;
    let { productId, cartId } = req.body;
    token = jwt.decode(token, process.env.secret_key);
    let userId = token.id;
    let cart = await CartModel.findOne({ userId, _id: cartId });

    try {
        if (!cart) {
            res.status(401).send({ msg: "Cart is Empty" });
        } else {
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);
            if (cart.products.length === 1) {
                await CartModel.findByIdAndDelete({ _id: cartId });
            } else {
                cart.products.splice(itemIndex, 1);
            }
            await cart.save();
            res.status(202).send({ msg: "Remove a product from cart", cart });
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});


module.exports = { cartRouter };