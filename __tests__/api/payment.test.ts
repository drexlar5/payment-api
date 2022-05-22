import express from "express";
import bodyParser from "body-parser";
import request from "supertest";

import { testConnection, disconnectTest } from "../../src/config/connection";
import paymentRoute from "../../src/routes/payment";
import userRoute from "../../src/routes/auth";
import PaymentModel from "../../src/models/payment";
import UserModel from "../../src/models/auth";

const app = express();

app.use(bodyParser.json());
app.use("/api/v1", paymentRoute);
app.use("/api/v1", userRoute);

describe("Bits Api Integration Test", () => {
  beforeAll(async () => {
    testConnection()
      .then(async () => console.log("Connected to the database"))
      .catch((err) => console.log("connection error", err));
  });

  afterAll(async () => {
    try {
      await PaymentModel.deleteMany({ __v: 0 });
      await UserModel.deleteMany({ __v: 0 });
      await disconnectTest();
    } catch (error) {
      console.log("mongo error", error);
    }
  });

  describe("Payments Integration Test", () => {
    const userRequestBody = {
      email: "johndoe@gmail.com",
      password: "1234",
    };

    let paymentRequestBody = {
      paymentId: "1u2y4t5f3f",
      paymentDescription: "Netflix subscription",
      currency: "USD",
      amount: 100,
    };

    beforeEach(async () => {
      await PaymentModel.deleteMany({ __v: 0 });
      await UserModel.deleteMany({ __v: 0 });
    });

    async function createPayment(jwtToken: string, amount?, paymentDescription?, paymentId?) {
      paymentRequestBody.amount = amount || paymentRequestBody.amount;
      paymentRequestBody.paymentDescription = paymentDescription || paymentRequestBody.paymentDescription;
      paymentRequestBody.paymentId = paymentId || paymentRequestBody.paymentId;

      const { body } = await request(app)
        .post("/api/v1/payment")
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(paymentRequestBody);

      return { body };
    }

    async function getPaymentById(jwtToken: string, paymentId: string) {
      const { body } = await request(app)
        .get(`/api/v1/payments/${paymentId}`)
        .set("Authorization", `Bearer ${jwtToken}`)

      return { body };
    }

    async function getPaymentByUserId(jwtToken: string) {
      const { body } = await request(app)
        .get("/api/v1/payments")
        .set("Authorization", `Bearer ${jwtToken}`)

      return { body };
    }

    async function createUser() {
      const { body } = await request(app)
        .post("/api/v1/register")
        .send(userRequestBody);

      return { body };
    }

    async function loginUser() {
      const { body } = await request(app)
        .post("/api/v1/login")
        .send(userRequestBody);

      return { body };
    }

    describe("Create recurring payment Test", () => {
      it("should create a user", async () => {
        await createUser();
        const { body } = await loginUser();

        const { body: responseBody } = await createPayment(body?.data);

        expect(responseBody).toBeObject();
        expect(responseBody.error).toBeFalsy();
        expect(responseBody.message).toEqual("Payment info created succesfully.");
        expect(responseBody.data.amount).toEqual(100);
      });
    });

    describe("Get recurring payment by id Test", () => {
      it("should fetch recurring payment object", async () => {
        await createUser();
        const { body } = await loginUser();

        await createPayment(body?.data);
        const { body: responseBody } = await getPaymentById(body?.data, "1u2y4t5f3f");

        expect(responseBody).toBeObject();
        expect(responseBody.error).toBeFalsy();
        expect(responseBody.message).toEqual("User Payment info fetched succesfully.");
      });
    });

    describe("Get recurring payment details for a user", () => {
      it("should return array of recurring payment details", async () => {
        await createUser();
        const { body } = await loginUser();

        await createPayment(body?.data);
        await createPayment(body?.data, 120, "Apple subscription", "2e3r4t5y6u");
        await createPayment(body?.data, 40, "Amazon subscription", "5t7b3h7du8");
        const { body: responseBody } = await getPaymentByUserId(body?.data);


        expect(responseBody).toBeObject();
        expect(responseBody.error).toBeFalsy();
        expect(responseBody.message).toEqual("User Payment infos fetched succesfully.");
        expect(responseBody.data.length).toBeGreaterThan(1);
        expect(responseBody.data.length).toEqual(3);
      });
    });
  });
});
