# Ecommerce-API
# Overview
This project will deliver a comprehensive e-commerce API set that enables seamless product and category management, user authentication, secure cart management, and order processing. The integration of Mongodb as the database and token management system ensures efficient data storage and user authentication with minimal server-side setup.

# Live/deploy link on render


## Installation & Tech Stack

Clone the Repository from Github. Then do the following steps:

```bash
    npm init -y

    npm i express mongoose cors bcrypt dotenv jsonwebtoken nodemon express-rate-limit
```
# To run server (PORT = 8080)
```bash
    npm run server
```

## Some HTTP (Hyper Text Transfer Protocol) Status Code Which I used :
404 ---> Not Found/failure

200 --->  OK/Success/get/put

201 ---> Created/post

204 ----> Delete/reject

# NOTE: Used Timestamps & Date datatypes which allow by BSON.

# Database Name:
ecommerce
# Schema

1) Users: 
Collection Name : users

  name --> String

  password --> String

2) products:
  Collection Name : products

  id: Number,
  
  brand: String,
  
  name: String,
  
  price: Number,
  
  price_sign: String,
  
  image_link: String,
  
  image_link1: String,
  
  description: String,
  
  rating: Number,
  
  review: Number,
  
  category: String,
  
  product_type: String,
  
  quantity: Number,

3) carts:
Collection Name : carts

  userId : ObjectId as ref=user

  products: [{productId: ObjectId as ref=product, quantity: Number, default:1}]
  
  active: Boolean, default: true
  
  modifiedOn: Date, default: Date.now

5) orders:
Collection Name : orders

  userId : ObjectId as ref=user
  
  cartId : ObjectId as ref=cart
  
  status : Array
  
  currentStatus : String
  
  priceTotal: Number
  
  paymentMethod: String
  
  DeliveryAdress: String
  
  OrderDelivered: Boolean, default: false
  
  DeliveryDate: String,


# Routes / End Points
1) /users/register: (POST)

Sample Input: 

 name: "Pushpendra Singh"

 password: "Push1697@"
 
Output: Success Message and data will store in mongodb

3) /users/login: (POST)
if you use same existing details for login then you got jwt token, Login Successfully Message and user_id
else you got Wrong Password || Wrong Username || Login failed (according to your wrong credential)

Sample Input: 

 name: "Pushpendra Singh"
 
 password: "Push1697@"
 
Output: Success Message and jwt token

Sample Input: 

 name: "Pushpendra"
 
 password: "Push1697@"
 
Output: Wrong Username

Sample Input: 

 name: "Pushpendra Singh"
 
 password: "Push"
 
Output: Wrong Password

3) /products/addProduct: (POST)

Sample Input:

  {
  "id": 922,
  "brand": "nyx",
  "name": "High Definition Blush Pro Refills",
  "price": 6,
  "price_sign": "₹",
  "image_link": "https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dw587b93a7/ProductImages/Face/High_Definition_Pro_Blush_Refills/highdefinitionproblushrefills_main.jpg?sw=390&sh=390&sm=fit",
  "image_link1": "//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/915/original/open-uri20171224-4-uv4oww?1514082622",
  "description": "Add a touch of color with our creamy and extremely pigmented Stick Blush! Available in eight rich shades! Apply and receive the perfect glow every day!",
  "rating": 5,
  "review": 9,
  "category": "concealer",
  "product_type": "blush",
  "quantity": 5
  }

Output: Success Message and data will store in mongodb

4) /products/allProducts: (GET)
Output: Retrieves all products

5) /products/particularProduct/`${id}`: (GET)
output: Retrieves Particular products by id

# NOTE:  For Below routes pass the token from headers (Required)
6) /cart/addToCart: update quantities --> (POST)
Input Sample: 
  "productId":"64be95a1f0dd493feb5c8210",
  "qty": 3

Output:  
{
  "msg": "Product added in cart",
  "cart": {
    "userId": "64be861288ff9ba7252aa32e",
    "products": [
      {
        "productId": "64be95a1f0dd493feb5c8210",
        "quantity": 1,
        "_id": "64beab3bd64361dbbb125fa1"
      }
    ],
    "active": true,
    "_id": "64beab3bd64361dbbb125fa0",
    "modifiedOn": "2023-07-24T16:47:55.609Z",
    "createdAt": "2023-07-24T16:47:55.612Z",
    "updatedAt": "2023-07-24T16:47:55.612Z"
  }
}

7) /cart/deleteFromCart: (DELETE)
Input Sample: 
  productId: "64be95a1f0dd493feb5c8210"
  cartId: "64bebf684ac081d8292327a8"

Output: Particular Product will be deleted

8) /cart/fetchCartItems: (GET)
It will populate all cart Items || Empty Cart

# NOTE : Ignore Payment Gateway Methods API like Razorpay, Braintree etc.
9) /order/orderPlaced: (POST)
Input Sample: 
{
  "cartId": "64bebf684ac081d8292327a8",
  "priceTotal": 36, 
  "paymentMethod":"Net Banking",
  "DeliveryAdress":"Kanpur UP"
}

Output: 
{
  "msg": "OK",
  "newOrder": {
    "userId": "64be861288ff9ba7252aa32e",
    "cartId": "64bebf684ac081d8292327a8",
    "status": [
      "orderconfirmed"
    ],
    "currentStatus": "orderconfirmed",
    "priceTotal": 36,
    "paymentMethod": "Net Banking",
    "DeliveryAdress": "Kanpur UP",
    "OrderDelivered": false,
    "DeliveryDate": "29/07/2023",
    "_id": "64bf4d78a141a7319b7aa1e7",
    "createdAt": "2023-07-25T04:20:08.451Z",
    "updatedAt": "2023-07-25T04:20:08.451Z"
  }
}

10) /order/orderHistory : (GET)
Used to get all orders of authenticated users (notDelivered orders)

11) /order/orderDetails : (GET)
Used to get particular order's Details of any authenticated particular user by order's ID (notDelivered order)

# NOTE: Some Extra Routes

12) /order/changeStatusOfOrder: (POST)
Used for Change order's current Status by Admin --> This person should have token + role=="admin"

Input Sample-1: 
{
  "status": "Delivered",
  "orderId": "64bf4d78a141a7319b7aa1e7"
}

Output-1: 
{
  "msg": "Status of order has been changed",
  "status": "Delivered"
}

Input Sample-2: 
{
  "status": "Shipping",
  "orderId": "64bf4d78a141a7319b7aa1e7"
}

Output-2: 
{
  "msg": "Status of order has been changed",
  "status": "Shipping"
}

13) /order/getDeliveredOrders : (GET)
Used to get all the orders  list  of delivered item which have OrderDelivered===true


14) /order/getNotDeliveredOrders : (GET)
Used to get all the orders  list  of Not-delivered item which have OrderDelivered===false

# NOTE :  API rate limiting to prevent abuse and maintain server stability.
API RATE LIMIT use for amount of time and no.of req valid for yr app

middleware --> express-rate-limit

Example: 
const limiter = rateLimit({
    max: 2, //no. of req users can make with in time
    windowMs: 60000  // time frame in (ms)
});

app.use(limiter);

After 60000ms you got Error: "Too many requests, please try again later" with 429 status code if you try to make more than 2 requests.
