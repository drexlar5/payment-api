import AuthService from "../../src/services/auth";
import {testConnection, disconnectTest} from "../../src/config/connection";
import UserModel from "../../src/models/auth";

describe("Bits Api Unit Test", () => {
  beforeAll(async () => {
    testConnection()
      .then(async () => {})
      .catch((err) => console.error("connection error", err));
  });

  afterAll(async () => {
    try {
      await UserModel.deleteMany({ __v: 0 });
      await disconnectTest();
    } catch (error) {
      console.error("mongo error", error);
    }
  });

  describe("User service unit Test", () => {
    beforeEach(async () => {
      await UserModel.deleteMany({ __v: 0 });
    });

    async function createUser() {
      const user = await AuthService.createUser(
        {
          email:"demo@gmail.com",
          password: "1234",
        },
      );

      return user;
    }

    async function loginUser(email, password = "1234") {
      const user = await AuthService.authenticateUser({
        email,
        password,
      });

      return user
    }

    describe("Create user Test", () => {
      it("should create a user with no referral code", async () => {
        const data: any = await createUser();

        expect(data).toBeObject();
        expect(data.email).toMatch(data.email);
      });

      it("should throw an error if user is already registered", async () => {
        try {
          await createUser();
          await createUser();
        } catch (err) {
          expect(err.message).toMatch("User already exists.");
          expect(err.statusCode).toBe(401);
        }
      });
    });

    describe("Authenticate user Test", () => {
      it("should authenticate a user", async () => {
        await createUser();
        const data: any = await loginUser("demo@gmail.com");

        expect(data).toBeString();
        expect(data).toStartWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
      });

      it("should throw an error if user is not registered", async () => {
        try {
          await loginUser("janedoe@yahoo.com");
        } catch (err) {
          expect(err.message).toMatch("User does not exist.");
          expect(err.statusCode).toBe(401);
        }
      });

      it("should throw an error if user passes wrong password", async () => {
        try {
          await createUser();
          await loginUser("demo@gmail.com", "12345");
        } catch (err) {
          expect(err.message).toMatch("Wrong password.");
          expect(err.statusCode).toBe(401);
        }
      });
    });

    describe("Get user Test", () => {
      it("should return a single user detail", async () => {
        const user: any = await createUser();
        const data: any = await AuthService.getUserById(user.userId);

        expect(data).toBeObject();
        expect(data).toContainKeys([
          "userId",
          "email",
        ]);
        expect(data.email).toMatch(data.email);
      });

      it("should throw an error if no user is found", async () => {
        try {
          await AuthService.getUserById("601604531619190112400001");
        } catch (err) {
          expect(err.message).toMatch("User does not exist.");
          expect(err.statusCode).toBe(401);
        }
      });
    });
  });
});
