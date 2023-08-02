const http = require("http");
const express = require("express");
const app = express();
const httpServer = http.createServer(app); //server creation by http inbuit node module;
const { connection } = require("./Configs/Config");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000; //defined port 8080 (default 3000) excluding 27017 (reserved port by Mongod);

//Different Routers for different frontend pages in UI;
const { userRouter } = require("./Routes/users.route");
const { productRouter } = require("./Routes/product.route");
const { cartRouter } = require("./Routes/cart.route");
const { orderRouter } = require("./Routes/order.route");

// some custom middlewares
const { validate } = require("./Middlewares/validate.middleware");
const { limiter } = require("./Middlewares/apiRateLimit.middleware");

//Inbuilt middlewares;
app.use(express.text());
app.use(express.json());
app.use(cors());

app.use(limiter);

//Landing/default route;
app.get("/", async (req, res) => {
    const ip = req.ip;
    console.log(ip);
    res.send("Welcome in Ecommerce-API App😊!!!");
});

//Fixed starting end points for making nested dynamic route;
app.use('/users', userRouter);
app.use('/products', productRouter);

// Restricted Routes
app.use(validate);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);


//server code for start or live my server at defined port;
httpServer.listen(PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (e) {
        console.log({ message: e.message });
    }
    console.log(`Server is running at port ${PORT}`);
});


