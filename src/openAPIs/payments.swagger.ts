
export const createPayment = {
    tags: ['Payments'],
    description: "Creates recurrring payment",
    operationId: 'createPayment',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        paymentId: {
                            type: 'string',
                            description: 'Payment ID',
                            example: 'random-payment-id'
                        },
                        paymentDescription: {
                            type: 'string',
                            description: 'Payment Description',
                            example: 'Netflix subscription'
                        },
                        currency: {
                            type: 'string',
                            description: 'Currency',
                            example: 'USD'
                        },
                        amount: {
                            type: 'number',
                            description: 'Amount',
                            example: '100'
                        },
                        paymentDate: {
                            type: 'string',
                            description: 'Payment Date',
                            example: '2020-01-01'
                        },
                    },
                    required: ['paymentId', 'paymentDescription', 'currency', 'amount', 'paymentDate'],
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Created payment information",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            paymentId: {
                                type: 'string',
                                description: 'Payment ID',
                                example: 'random-payment-id'
                            },
                            userId: {
                                type: 'string',
                                description: 'User Id',
                                example: '7fda6681-13c7-4770-9eb5-34b30633bff7'
                            },
                            paymentDescription: {
                                type: 'string',
                                description: 'Payment Description',
                                example: 'Netflix subscription'
                            },
                            paymentDate: {
                                type: 'string',
                                description: 'Date of payment',
                                example: '2022-05-21'
                            },
                            currency: {
                                type: 'string',
                                description: 'Currency',
                                example: 'USD'
                            },
                            amount: {
                                type: 'number',
                                description: 'Amount',
                                example: '100'
                            },
                            createdAt: {
                                type: 'string',
                                description: 'Created At',
                                example: '2022-05-21T15:16:09.274Z'
                            },
                        }
                    }
                }
            }
        }
    }
}

export const getPaymentById = {
    tags: ['Payments'],
    description: "Returns a single payment info from the database that the user has access to",
    operationId: 'getPaymentById',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: 'paymentId',
            in: 'path',
            description: 'Unique Payment Id',
            required: true,
            schema: {
                type: 'string',
                description: 'Payment Id',
                example: 'da66c74b306bff7'
            }
        }
    ],
    responses: {
        "200": {
            description: "Recurring payment information",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            paymentId: {
                                type: 'string',
                                description: 'Payment ID',
                                example: 'random-payment-id'
                            },
                            paymentDescription: {
                                type: 'string',
                                description: 'Payment Description',
                                example: 'Netflix subscription'
                            },
                            paymentDate: {
                                type: 'string',
                                description: 'Date of payment',
                                example: '2022-05-21'
                            },
                            currency: {
                                type: 'string',
                                description: 'Currency',
                                example: 'USD'
                            },
                            amount: {
                                type: 'number',
                                description: 'Amount',
                                example: '100'
                            },
                            createdAt: {
                                type: 'string',
                                description: 'Created At',
                                example: '2022-05-21T15:16:09.274Z'
                            },
                        }
                    }
                }
            }
        }
    }
}

export const getPaymentsByUserId = {
    tags: ['Payments'],
    description: "Returns all recurring payments from the database that the user has access to",
    operationId: 'getPaymentsByUserId',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {
            description: "A list of payments",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            paymentId: {
                                type: 'string',
                                description: 'Payment ID',
                                example: 'random-payment-id'
                            },
                            paymentDescription: {
                                type: 'string',
                                description: 'Payment Description',
                                example: 'Netflix subscription'
                            },
                            currency: {
                                type: 'string',
                                description: 'Currency',
                                example: 'USD'
                            },
                            amount: {
                                type: 'number',
                                description: 'Amount',
                                example: '100'
                            },
                            createdAt: {
                                type: 'string',
                                description: 'Created At',
                                example: '2022-05-21T15:16:09.274Z'
                            },
                        }
                    }
                }
            }
        }
    }
} 
