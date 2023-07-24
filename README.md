# Ecommerce-API

## Installation

Clone the Repository from Github. Then do the following steps:

```bash
    npm init -y

    npm i express mongoose cors bcrypt dotenv jsonwebtoken nodemon
```
# To run server (PORT = 8080)
```bash
    npm run server
```
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
  products: [{productId: ObjectId as ref=product, quantity: Number}]
  active: Boolean,
  modifiedOn: Date


# Routes / End Points
1) /users/register:
Sample Input: 
 name: "Pushpendra Singh"
 password: "Push1697@"
Output: Success Message and data will store in mongodb

2) /users/login:
if you use same existing details for login then you got jwt token, Login Successfully Message and user_id
else you got Wrong Password || Wrong Username || Login failed (according to your wrong credential)

3) /products/addProduct:
Sample Input:
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

Output: Success Message and data will store in mongodb

4) /products/allProducts:
Output: Retrieves all products

5) /products/particularProduct/`${id}`
output: Retrieves Particular products by id

# NOTE:  For Below routes pass the token from headers (Required)
6) /cart/addToCart: update quantities
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

7) /cart/deleteFromCart:
Input Sample: 
  productId: "64be95a1f0dd493feb5c8210"
  cartId: "64bebf684ac081d8292327a8"

Output: Particular Product will be deleted

8) /cart/fetchCartItems:
It will populate all cart Items || Empty Cart

