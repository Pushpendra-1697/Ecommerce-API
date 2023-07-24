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
name --> String
password --> String

Collection/Model Name : UserModel





# Routes / End Points
1) /users/register:
Sample Input: 
name: "Pushpendra Singh"
password: "Push1697@"
Output: Success Message and data will store in mongodb

2) /users/login:
if you use same existing details for login then you got jwt token, Login Successfully Message and user_id
else you got Wrong Password || Wrong Username || Login failed (according to your wrong credential)




