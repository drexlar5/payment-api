import PaymentService from "../../src/services/payment";
import { testConnection, disconnectTest } from "../../src/config/connection";
import PaymentModel from "../../src/models/payment";

describe("Bits Api Unit Test", () => {
  beforeAll(async () => {
    testConnection()
      .then(async () => {})
      .catch((err) => console.error("connection error", err));
  });

  afterAll(async () => {
    try {
      await PaymentModel.deleteMany({ __v: 0 });
      await disconnectTest();
    } catch (error) {
      console.error("mongo error", error);
    }
  });

  describe("Payment service unit Test", () => {
    beforeEach(async () => {
      await PaymentModel.deleteMany({ __v: 0 });
    });

    async function createPayment(amount?, paymentDescription?, paymentId?) {
      const payment = await PaymentService.createRecurringPayment(
        {
          paymentId: paymentId || "1u2y4t5f3f",
          userId: "df857240-6ecf-4510-9352-90b000400c8f",
          paymentDescription: paymentDescription || "Netflix subscription",
          currency: "USD",
          amount: amount || 100,
        },
      );

      return payment;
    }

    type paymentInfo = {
      paymentId: string;
      userId: string;
      paymentDescription: string;
      currency: string;
      amount: number;
    }

    describe("Create recurring payment Test", () => {
      it("should create a user with no referral code", async () => {
        const data: paymentInfo = await createPayment();

        expect(data).toBeObject();
        expect(data.paymentId).toMatch('1u2y4t5f3f');
        expect(data.currency).toMatch('USD');
      });

      it("should throw an error if payment is already created", async () => {
        try {
          await createPayment();
          await createPayment();
        } catch (err) {
          expect(err.message).toMatch("Payment already exists.");
          expect(err.statusCode).toBe(401);
        }
        ;
      });
    });

    describe("Get recurring payment by id Test", () => {
      it("should get payment info using PaymentId", async () => {
        await createPayment();
        const data: paymentInfo = await PaymentService.getRecurringPaymentById("1u2y4t5f3f");

        expect(Object.keys(data)).toEqual([
          "paymentId",
          "paymentDescription",
          "currency",
          "amount",
          "createdAt",
          "updatedAt",
        ]);
        expect(data.amount).toEqual(100);
        expect(data.paymentDescription).toMatch('Netflix subscription');
      });

      it("should throw an error if payment info does not", async () => {
        try {
          await PaymentService.getRecurringPaymentById("unknownid");
        } catch (err) {
          expect(err.message).toMatch("Payment record does not exist.");
          expect(err.statusCode).toBe(401);
        }
      });
    });

    describe("Get recurring payments by userid Test", () => {
      it("should return an array of payment details", async () => {
        await createPayment();
        await createPayment(120, "Apple subscription", "2e3r4t5y6u");

        const userId = "df857240-6ecf-4510-9352-90b000400c8f";
        const data: any[] = await PaymentService.getRecurringPaymentsbyUserId(userId);

        expect(data.length).toBeGreaterThan(1);
        expect(data.length).toEqual(2);
      });
    });
  });
});
