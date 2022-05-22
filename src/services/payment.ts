/* ---------------------------- internal imports ---------------------------- */
import PaymentModel from "../models/payment"
import { throwError } from "../utils/errors";
import logger from "../lib/logger";

export default class PaymentService {
  /**
   * Creates recurring payment
   * @param paymentId
   * @param userId
   * @param paymentDescription
   * @param currency
   * @param amount
   * @returns savedPaymentInfo - Object
   */
  static async createRecurringPayment(paymentInfo: any) {
    try {

      const paymentExists = await PaymentModel.findOne({
        paymentId: paymentInfo.paymentId,
      });

      if (paymentExists) throwError("Payment already exists.", 401);

      const newPaymentObject = new PaymentModel({
        paymentId: paymentInfo.paymentId,
        userId: paymentInfo.userId,
        paymentDescription: paymentInfo.paymentDescription,
        currency: paymentInfo.currency,
        amount: paymentInfo.amount,
      });

      const savedPaymentInfo = await newPaymentObject.save();

      if (!savedPaymentInfo) throwError("Payment not created!", 501);

      return savedPaymentInfo;
    } catch (error: any) {
      logger.error('service::createRecurringPayment::error', error);
      throw error;
    }

  }

  /**
   * Get payment info by paymentId
   * @param paymentId
   * @returns payment info - Object
   */
  static async getRecurringPaymentById(paymentId: string) {
    try {
      const paymentInfo = await PaymentModel.findOne({ paymentId })
                                  .lean()
                                  .select("-_id -userId -__v");;

      if (!paymentInfo) throwError("Payment record does not exist.", 401);

      return paymentInfo;
    } catch (error: any) {
      logger.error('service::getRecurringPaymentById::error', error);
      throw error;
    }

  }

  /**
   * Get payments by userId
   * @param userId
   * @returns payment details - Array
   */
  static async getRecurringPaymentsbyUserId(userId: string) {
    try {
      const paymentInfos = await PaymentModel.find({ userId })
                                  .lean()
                                  .select("-_id -userId -__v");

      return paymentInfos;
    } catch (error: any) {
      logger.error('service::getRecurringPaymentbyId::error', error);
      throw error;
    }

  }
}