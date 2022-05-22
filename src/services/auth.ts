/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { uuid } from "uuidv4";

/* ---------------------------- internal imports ---------------------------- */
import User from "../models/auth"
import logger from "../lib/logger"
import { config } from "../config/config"
import { throwError } from "../utils/errors"
import { UserDataType } from "../utils/types"

type userInfo = {
  email: string,
  password: string,
  userId: string,
}


export default class AuthService {
  /**
   * Signs JWT token
   * @param userId
   * @returns jwt token - String
   */
  private static _signJwtToken = (userId: string): string =>
  jwt.sign(
    {
      userId,
    },
    config.secret,
    {
      expiresIn: "1h",
    }
  );

  
  /**
   * Creates a user
   * @param email
   * @param password
   * @returns savedUser - Object
   */
  static createUser = async (data: UserDataType): Promise<userInfo> => {
    try {
      const { email, password } = data;
      const formattedEmail = email.toLowerCase().trim();
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const userExists = await User.findOne({ email: formattedEmail })
  
      if (userExists) throwError("User already exists..", 401);
  
      const newUser = new User({
        email: formattedEmail,
        password: hashedPassword,
        userId: uuid(),
      });
  
      const savedUser = await newUser.save();
  
      if (!savedUser) throwError("User not created.", 501);
  
      return savedUser;
    } catch (error: any) {
      logger.error("Service::createUser::error", error);
      if (error.name === "MongoError" && error?.code === 11000) {
        throwError("User already exists.", 401);
      }
      throw error;
    }
  };
  
  /**
   * Authenticates a user
   * @param email
   * @param password
   * @returns token - String
   */
  static authenticateUser = async (data: UserDataType): Promise<String> => {
    try {
      const { email, password } = data;
      const formattedEmail = email.toLowerCase().trim();
  
      const user = await User.findOne({ email: formattedEmail }).lean();
      if (!user) throwError("User does not exist.", 401);
  
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) throwError("Wrong password.", 401);
  
      const token = this._signJwtToken(user.userId);
      if (!token) throwError("Error occured, could not create token.", 500);
  
      return token;
    } catch (error: any) {
      logger.error("Service::authenticateUser::error", error.message);
      throw error;
    }
  };
  
  
  /**
   * Get a user by Id
   * @param userId
   * @returns user details - String
   */
  static getUserById = async (userId: string): Promise<object> => {
    try {
      const userDetails = await User.findOne({ userId })
                                  .lean()
                                  .select("-_id -password -__v");
  
      if (!userDetails) throwError("User does not exist.", 401);
  
      return userDetails;
    } catch (error: any) {
      logger.error("Service::getUserById::error", error.message);
      throw error;
    }
  };
}