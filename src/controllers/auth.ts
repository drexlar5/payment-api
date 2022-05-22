/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from 'express';

/* ---------------------------- internal imports ---------------------------- */
import AuthService from "../services/auth"
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../utils/response"

export default class AuthController {
  static createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
  
      const data = await AuthService.createUser(body);
  
      sendSuccessResponse(res, "User created.", data);
    } catch (error) {
      sendFailureResponse(error, next);
    }
  };
  
  static authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
  
      const data = await AuthService.authenticateUser(body);
  
      sendSuccessResponse(res, "User authenticated", data);
    } catch (error) {
      sendFailureResponse(error, next);
    }
  };
  
  static getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
  
      const data = await AuthService.getUserById(userId);
  
      sendSuccessResponse(res, "User details found.", data);
    } catch (error) {
      sendFailureResponse(error, next);
    }
  };
}