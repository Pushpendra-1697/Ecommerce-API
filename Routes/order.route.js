const { Router } = require("express");
const jwt = require("jsonwebtoken");
const OrderModel = require("../Models/order.model");
const orderRouter = Router();


// orderRouter.get("/getall", async (req, res) => {
//     const { token } = req.headers;
//     try {
//         let delivered = await OrderModel.find().populate({
//             path: "cartId",
//             populate: { path: "products", populate: "productId" },
//         });
//         return res.status(201).send({ delivered, Message: "OK" });
//     } catch (e) {
//         return res.send({ "msg": "Some thing went wrong" });
//     }
// });

// // Get all the order  list  of delivered item *************
// orderRouter.get("/getdeliveredorder", async (req, res) => {
//     let { token } = req.headers;
//     try {
//         let delivered = await OrderModel.find({ OrderDelivered: true }).populate({
//             path: "cartId",
//             populate: { path: "products", populate: "productId" },
//         });
//         return res.status(201).send({ delivered, Message: "OK" });
//     } catch (e) {
//         return res.send("Some thing went wrong");
//     }
// });

// // Get list of Order Which is Not delivered
// orderRouter.get("/getnotdelivered", async (req, res) => {
//     let { token } = req.headers;
//     try {
//         let notDelivered = await OrderModel.find({
//             OrderDelivered: false,
//         }).populate({
//             path: "cartId",
//             populate: { path: "products", populate: "productId" },
//         });
//         return res.status(201).send({ notDelivered, Message: "OK" });
//     } catch (e) {
//         return res.send("Some thing went wrong");
//     }
// });

// // Get Order details of particluar user with particular order Id

// orderRouter.get("/getnotdeliveredofuser/", async (req, res) => {
//     let { token } = req.headers;

//     token = jwt.verify(token, process.env.token_password);
//     let userId = token.id;

//     try {
//         let notDelivered = await OrderModel.find({
//             //   OrderDelivered: false ,
//             userId,
//             //   _id: id,
//         }).populate({
//             path: "cartId",
//             populate: { path: "products", populate: "productId" },
//         });

//         return res.status(201).send({ notDelivered, Message: "OK" });
//     } catch (e) {
//         return res.send("Some thing went wrong");
//     }
// });

// *********************  orderconfirmed / Order Placement *********************
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

//     change the status of the item
// orderRouter.post("/changestatus", validate, async (req, res) => {
//     const { status, orderId } = req.body;
//     try {
//         if (status === "Delivered") {
//             const order = await OrderModel.updateOne(
//                 { _id: orderId },
//                 { $set: { currentStatus: status, OrderDelivered: true } }
//             );
//             return res.status(200).send("Order Delivered");
//         }

//         const order = await OrderModel.findByIdAndUpdate(
//             { _id: orderId },
//             { $set: { currentStatus: status } }
//         );
//         return res.send({ "msg": "Status of order has been changed", status });
//     } catch (e) {
//         return res.send(e.message);
//     }
// });


module.exports = { orderRouter };