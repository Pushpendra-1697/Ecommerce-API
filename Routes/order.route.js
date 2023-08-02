const { Router } = require("express");
const jwt = require("jsonwebtoken");
const OrderModel = require("../Models/order.model");
const { adminChecker } = require("../Middlewares/adminChecker.middleware");
const orderRouter = Router();


// *********************  User work *********************

// ********************* Get Order details of particluar authenticated user *********************
orderRouter.get("/orderDetails", async (req, res) => {
    let { token } = req.headers;
    token = jwt.decode(token, process.env.secret_key);
    let userId = token.id;

    try {
        let order = await OrderModel.find({ userId }).populate({
            path: "cartId",
            populate: { path: "products", populate: "productId" },
        });
        res.status(201).send({ order, msg: "OK" });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// *********************  orderconfirmed / Order Placement by particluar authenticated user *********************
orderRouter.post("/orderPlaced", async (req, res) => {
    let { token } = req.headers;
    const { priceTotal, paymentMethod, DeliveryAdress, cartId } = req.body;
    token = jwt.decode(token, process.env.secret_key);
    let userId = token.id;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0"); // max two length string with start from 0
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 01
    var yyyy = today.getFullYear();
    let DeliveryDate = (Number(dd) + Math.floor(Math.random() * 3 + 2)) + "/" + mm + "/" + yyyy;

    try {
        let newOrder = new OrderModel({
            userId,
            cartId,
            status: ["orderconfirmed"],
            currentStatus: "orderconfirmed",
            priceTotal,
            paymentMethod,
            DeliveryAdress,
            DeliveryDate
        });
        await newOrder.save();
        res.status(200).send({ msg: "OK", newOrder });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});






// *********************  Admin work *********************
orderRouter.use(adminChecker);
// *********************   Change order's current Status by Admin  *********************
orderRouter.post('/changeStatusOfOrder', async (req, res) => {
    const { status, orderId } = req.body;
    try {
        if (status === "Delivered") {
            const order = await OrderModel.updateOne(
                { _id: orderId },
                { $set: { currentStatus: status, OrderDelivered: true } } // order status change here
            );
            return res.status(200).send({ "msg": "Status of order has been changed", status });
        }
        const order = await OrderModel.findByIdAndUpdate(
            { _id: orderId },
            { $set: { currentStatus: status, OrderDelivered: false } }
        );
        res.status(200).send({ "msg": "Status of order has been changed", status });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// *********************   Get all orders of authenticated users by admin *********************
orderRouter.get("/orderHistory", async (req, res) => {
    try {
        let orders = await OrderModel.find().populate({
            path: "cartId",
            populate: { path: "products", populate: "productId" },
        });
        res.status(201).send({ orders, msg: "OK" });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// ********************* Get all the orders list of delivered item by admin *************
orderRouter.get("/getDeliveredOrders", async (req, res) => {
    try {
        let delivered = await OrderModel.find({ OrderDelivered: true }).populate({
            path: "cartId",
            populate: { path: "products", populate: "productId" },
        });
        res.status(201).send({ delivered, msg: "OK" });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

// ********************* Get all the orders list of Not-delivered item by admin *************
orderRouter.get("/getNotDeliveredOrders", async (req, res) => {
    try {
        let notDelivered = await OrderModel.find({ OrderDelivered: false }).populate({
            path: "cartId",
            populate: { path: "products", populate: "productId" },
        });
        res.status(201).send({ notDelivered, msg: "OK" });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { orderRouter };