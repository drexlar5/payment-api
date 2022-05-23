import { createUser, authenticateUser, getUser } from './src/openAPIs/users.swagger';
import { createPayment, getPaymentById, getPaymentsByUserId } from './src/openAPIs/payments.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Bits API Document',
    description: 'A sample bits API document',
    termsOfService: '',
    contact: {
      name: 'Michael Agboola',
      email: 'drexlar37@gmail.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
        url: 'http://localhost:3001/api/v1',
        description: 'Local server'
    },
    {
        url: 'http://ec2-107-20-9-140.compute-1.amazonaws.com:3001/api/v1',
        description: 'PROD Env'
    },
  ],
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  tags: [
    {
      name: 'Auth'
    },
    {
      name: 'Payments'
    }
  ],
  paths: {
    "/register": {
      "post": createUser
    },
    "/login": {
      "post": authenticateUser
    },
    "/user": {
      "get": getUser
    },
    "/payment": {
      "post": createPayment
    },
    "/payments/{paymentId}": {
      "get":  getPaymentById
    },
    "/payments": {
      "get": getPaymentsByUserId
    },
  }
}