# bits-api

A sample bits payment api

**Author:** Michael Agboola

**Environments**

Node version - v14.15.0

**This application uses the following technologies:**

- nodeJs
- typescript
- expressJs
- mongoDb
- jest
- supertest

Note: `run all commands in the applications root directory.`
`you must have docker running to be able to run this application.`

**Install all dependencies**

```
docker-compose build
```

**Start the application**

```
docker-compose up
```

**Stop the application**

```
docker-compose down
```

**Test the application**

```
docker-compose run app npm run test
```

To view the Swagger API documentations visit the [localhost](http://127.0.0.1:3001/api/v1/api-docs) or [deployed app](http://ec2-107-20-9-140.compute-1.amazonaws.com:3001/api/v1/api-docs)

This code is deployed on AWS CodeDeploy using CodePipeline as the continuous deployment manager. To access the application on AWS you can use this [link](http://ec2-107-20-9-140.compute-1.amazonaws.com:3001/api/v1) as the base url.

><http://ec2-107-20-9-140.compute-1.amazonaws.com:3001/api/v1>

## Application flow diagram

![flow diagram](https://github.com/drexlar5/bits-api/raw/assets/flow%20diagram.png)

The user creates an identity on the application using the  `register` endpoint and then proceeds to authenticate the session using the `login` route. The login route returns a jwt token that shows that the user is permitted to access other routes on the application.

To create a recurring payment, the user makes use of the jwt token by adding it to the HTTP header when making a call to the `payment` route with the payment information the the body of the route.

Once this operation is done, the user can then verify that the payment creation is made by visiting the `payments/:paymentId` route with the uniqueId of the payment he/she wants to view.

The user can also view a list of all recurring payments saved on the application by visiting the `payments` route.

<NOTE:> all other routes apart from `register` and `login` routes can only be accessed by an authorized user of the applcation.

## System Architecture

![system architecture](https://github.com/drexlar5/bits-api/raw/assets/system%20architecture.png)

The application uses REST architecture to transfer data between the clientn and server. The API request goes through the API gateway to the load balancer which then routes the taffic to the ECS cluster.

The CloudFront caches the static pages to users access the app faster.

The CodePipeline gets the latest commit sent to github when a push or meger us made to the aster branch. It deploys the latest commit on CodeDeploy.

The ECS houses the fargat serverless resources from the docker image provided on the Elastic Container Registry.

The deployed services uses MongoDB as a database , Elastic Cache as a memory datastore for caching of request to make subsequent read requests faster and AWS Cognito for authentication.

```
This application is deployed on AWS EC2 using CodeDeploy but can be deployed on ECS using AWS Fargate serverless resources that auto scales on demand to cater for 100K monthly active users
```

## Bits APIs -

## Authentication endpoints

### Create a new user

**Endpoint** `http://localhost:3001/api/v1/register` - method (POST)

- Creates a new user

**Payload**

```json
{
  "email": "demo@gmail.com",
  "password": "password"
}
```

**Response format**

```json
{
  "error": false,
  "message": "User created.",
  "data": {
    "email": "demo@gmail.com",
    "password": "$2a$12$L5wmTsNlSxZ6tUSrJStuX.XRBaC7BAUKgnUZFMaxRoVMXQeWiYu46",
    "userId": "df857240-6ecf-4510-9352-90b000400c8f",
    "_id": "6288f18438e4d51992e75f34",
    "__v": 0
  }
}
```

### Authenticate a user

**Endpoint** `http://localhost:3001/api/v1/login` - method (POST)

- Authenticates a user

**Payload**

```json
{
  "email": "demo@gmail.com",
  "password": "password"
}
```

**Response format**

```json
{
  "error": false,
  "message": "User authenticated",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZjg1NzI0MC02ZWNmLTQ1MTAtOTM1Mi05MGIwMDA0MDBjOGYiLCJpYXQiOjE2NTMxNDU4NDksImV4cCI6MTY1MzE0OTQ0OX0.UxfmuvUcJqyVS0LKJG0CD_9oaDY8vQCKamdzNSdDrZk"
}
```

### Get user details

> authentication needed

**Endpoint** `http://localhost:3001/api/v1/user` - method (GET)

- Fetches user details

**Response format**

```json
{
  "error": false,
  "message": "User details found.",
  "data": {
    "email": "a@a.com",
    "userId": "df857240-6ecf-4510-9352-90b000400c8f"
  }
}
```

## Payment endpoints

### Create recurring payment

> authentication needed

**Endpoint** `http://localhost:3001/api/v1/payment` - method (POST)

- Creates new recurring payment

**Payload**

```json
{
  "paymentDescription": "Netflix Payment",
  "currency": "USD",
  "paymentId": "1234nono",
  "paymentDate": "2020-01-01",
  "amount": 1000
}
```

**Response format**

```json
{
  "error": false,
  "message": "Payment info created succesfully.",
  "data": {
    "paymentId": "1234nono",
    "userId": "df857240-6ecf-4510-9352-90b000400c8f",
    "paymentDescription": "Netflix Payment",
    "paymentDate": "2020-01-01",
    "currency": "USD",
    "amount": 1000,
    "_id": "628902398d6e9fb3ebaba07f",
    "createdAt": "2022-05-21T15:16:09.274Z",
    "updatedAt": "2022-05-21T15:16:09.274Z",
    "__v": 0
  }
}
```

### Get payment by Id

> authentication needed

**Endpoint** `http://localhost:3001/api/v1/payments/:paymentId` - method (GET)

- Fetches single payment detail by unique payment id

**Response format**

```json
{
  "error": false,
  "message": "User Payment info fetched succesfully.",
  "data": {
    "paymentId": "1234nono",
    "paymentDescription": "Netflix Payment",
    "paymentDate": "2020-01-01",
    "currency": "USD",
    "amount": 1000,
    "createdAt": "2022-05-21T15:16:09.274Z",
    "updatedAt": "2022-05-21T15:16:09.274Z"
  }
}
```

### Get all payment details for a particular user

> authentication needed

**Endpoint** `http://localhost:3001/api/v1/payments` - method (GET)

- Retrieves all payment info for a user from database

**Response format**

```json
{
    "error": false,
    "message": "User Payment infos fetched succesfully.",
    "data": [
        {
            "paymentId": "904oSsA80APN",
            "paymentDescription": "Netflix Payment",
            "paymentDate": "2020-01-01",
            "currency": "USD",
            "amount": 100,
            "createdAt": "2022-05-21T14:30:45.920Z",
            "updatedAt": "2022-05-21T14:30:45.920Z"
        },
        {
            "paymentId": "1234nono",
            "paymentDescription": "Amazon Payment",
            "paymentDate": "2020-02-05",
            "currency": "USD",
            "amount": 52,
            "createdAt": "2022-05-21T15:16:09.274Z",
            "updatedAt": "2022-05-21T15:16:09.274Z"
        }
    ]
}
```

### application/json
