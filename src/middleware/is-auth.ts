/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

/* ---------------------------- internal imports ---------------------------- */
import { config } from '../config/config';
import { ErrorType } from "../utils/types";


export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error: ErrorType = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken: any;

    try {
      decodedToken = jwt.verify(token, config.secret);
    } catch (error: any) {
      error.statusCode = 500;
      throw error;
    }

    if (!decodedToken) {
      const error: ErrorType = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }

    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    next(error)
  }
}