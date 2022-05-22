/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import express from 'express';

/* ---------------------------- internal imports ---------------------------- */
import isAuth from '../middleware/is-auth';
import validate from '../middleware/validation';
import { paymentValidation } from '../schema/payment';
import PaymentController from '../controllers/payment'

const router = express.Router();

router.post('/payment', isAuth, validate(paymentValidation), PaymentController.createRecurringPayment)
router.get('/payments/:paymentId', isAuth, PaymentController.getRecurringPaymentById)
router.get('/payments', isAuth, PaymentController.getRecurringPaymentsbyUserId)

export default router;