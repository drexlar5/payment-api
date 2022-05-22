/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from 'express';

/* ---------------------------- internal imports ---------------------------- */
import { ErrorType } from "../utils/types";

export default (Schema: any) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        // validation
        try {
            const options = { abortEarly: false };
            const { error } = Schema.validate(req.body, options);
            if (!error) return next();
            let err: ErrorType = new Error('Validation Error.');
            err.data = error.details?.map((errorObject: ErrorType) => errorObject.message)
            err.statusCode = 422;
            next(err);
        } catch (error) {
            next(error);
        }
    }
}