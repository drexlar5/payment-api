/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import { Response, NextFunction } from 'express';

export const sendFailureResponse = (error: any, next: NextFunction) => next(error);


export const sendSuccessResponse = (res: Response, message: string, data: any = null) => {
  res.json({
    error: false,
    message: message,
    data,
  });
}