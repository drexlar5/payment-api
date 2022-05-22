/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import Joi from 'joi';

const paymentValidation = Joi.object({

    paymentDescription: Joi.string()
        .pattern(new RegExp('[a-zA-Z0-9]{3,10}$'))
        .required(),
    currency: Joi.string()
        .pattern(new RegExp('[a-zA-Z0-9]{3,10}$'))
        .required(),
    paymentId: Joi.string()
        .pattern(new RegExp('[a-zA-Z0-9]{3,15}$'))
        .required(),
    userId: Joi.string()
        .pattern(new RegExp('[a-zA-Z0-9]{3,20}$'))
        .required(),
    amount: Joi.number()
});

export {
    paymentValidation
}