import express from "express";
import bodyParser from "body-parser";
import request from "supertest";

import userRoute from "../../src/routes/auth";
import { testConnection, disconnectTest } from "../../src/config/connection";
import User from "../../src/models/auth";

const app = express();

app.use(bodyParser.json());
app.use("/api/v1", userRoute);

describe("Bits Api Integration Test", () => {
  beforeAll(async () => {
    testConnection()
      .then(async () => console.log("Connected to the database"))
      .catch((err) => console.log("connection error", err));
  });

  afterAll(async () => {
    try {
      await User.deleteMany({ __v: 0 });
      await disconnectTest();
    } catch (error) {
      console.log("mongo error", error);
    }
  });

  describe("User Integration Test", () => {
    const requestBody = {
      email: "johndoe@gmail.com",
      password: "1234",
    };

    beforeEach(async () => {
      await User.deleteMany({ __v: 0 });
    });

    async function registerUser() {
      const { body } = await request(app)
        .post("/api/v1/register")
        .send(requestBody);

      return { body };
    }

    async function loginUser() {
      const { body } = await request(app)
        .post("/api/v1/login")
        .send(requestBody);

      return { body };
    }

    async function getUserById(jwtToken: string) {
      const { body } = await request(app)
        .post("/api/v1/user")
        .set("Authorization", `Bearer ${jwtToken}`)
        .send(requestBody);

      return { body };
    }

    describe("Create user Test", () => {
      it("should create a user", async () => {
        const {body: response} = await registerUser();

        expect(response).toBeObject();
        expect(response.error).toBeFalsy();
        expect(response.message).toEqual("User created.");

      });
    });

    describe("Authenticate user Test", () => {
      it("should authenticate a user", async () => {
        await registerUser();
        const { body: responseBody } = await loginUser();

        expect(responseBody).toBeObject();
        expect(responseBody.error).toBeFalsy();
        expect(responseBody.message).toEqual("User authenticated");
        expect(responseBody.data).toBeString();
        expect(responseBody.data).toStartWith(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        );

      });
    });

    describe("Get user Test", () => {
      it("should return user details", async () => {
        try {
          await registerUser();
          const { body } = await loginUser();
          const { body: responseBody } = await getUserById(body?.data)

          expect(responseBody).toBeObject();
          expect(responseBody.error).toBeFalsy();
          expect(responseBody.message).toEqual("User details found.");
          expect(responseBody.data).toBeObject();
          expect(responseBody.data).toContainKeys([ "email"]);
          expect(responseBody.data.email).toMatch(requestBody.email);
        } catch (error) {
          console.log("error", error);
        }
      });
    });
  });
});

