/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from 'express';

/* ---------------------------- internal imports ---------------------------- */
import PaymentService from '../services/payment';
import { sendSuccessResponse, sendFailureResponse } from '../utils/response';
import logger from '../lib/logger';


export default class Payment {
  static createRecurringPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = req;

      const response = await PaymentService.createRecurringPayment(body);

      if (response) sendSuccessResponse(res, "Payment info created succesfully.", response);
    } catch (error: any) {
      logger.error('Controller::createRecurringPayment::error', error);
      sendFailureResponse(error, next);
    }
  }

  static getRecurringPaymentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { paymentId } = req.params;

      const response = await PaymentService.getRecurringPaymentById(paymentId);

      if (response) sendSuccessResponse(res, "User Payment info fetched succesfully.", response);
    } catch (error: any) {
      logger.error('Controller::getRecurringPaymentById::error', error);
      sendFailureResponse(error, next);
    }
  }

  static getRecurringPaymentsbyUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.body;

      const response = await PaymentService.getRecurringPaymentsbyUserId(userId);

      if (response) sendSuccessResponse(res, "User Payment infos fetched succesfully.", response);
    } catch (error: any) {
      logger.error('Controller::getRecurringPaymentsbyUserId::error', error);
      sendFailureResponse(error, next);
    }
  }
}