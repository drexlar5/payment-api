/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from 'express';

/* ---------------------------- internal imports ---------------------------- */
import { ErrorType } from './types';

export const globalErrorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {

  const status = error.statusCode || error.status || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    error: true,
    statusCode: status,
    message,
    data
  })
};

export const throwError = (message: string, statusCode: number) => {
  let error: ErrorType = new Error(message);
  error.statusCode = statusCode;
  throw error;
}