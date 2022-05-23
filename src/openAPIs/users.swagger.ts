
export const createUser = {
    tags: ['Auth'],
    description: "Create a new user",
    operationId: 'createUser',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email address',
                            example: 'demo@gmail.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Password',
                            example: 'password'
                        },
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Created user information",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: 'string',
                                description: 'Email address',
                                example: 'demo@gmail.com'
                            },
                            password: {
                                type: 'string',
                                description: 'Password',
                                example: 'password'
                            },
                            userId: {
                                type: 'string',
                                description: 'User Id',
                                example: '7fda6681-13c7-4770-9eb5-34b30633bff7'
                            },
                        }
                    }
                }
            }
        }
    }
}
export const authenticateUser = {
    tags: ['Auth'],
    description: "Authenticate a user",
    operationId: 'authenticateUser',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'Email address',
                            example: 'demo@gmail.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Password',
                            example: 'password'
                        },
                    }
                }
            }
        }
    },
    responses: {
        "200": {
            description: "Authenticated user information",
            "content": {
                "application/json": {
                    schema: {
                        type: "string",
                        description: "JWT Token"
                    }
                }
            }
        }
    }
}
export const getUser = {
    tags: ['Auth'],
    description: "Returns user details",
    operationId: 'getUser',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {
            description: "User details",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: 'string',
                                description: 'Email address',
                                example: 'demo@gmail.com'
                            },
                            userId: {
                                type: 'string',
                                description: 'User Id',
                                example: '7fda6681-13c7-4770-9eb5-34b30633bff7'
                            },
                        }
                    }
                }
            }
        }
    }
} 
