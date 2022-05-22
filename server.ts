import express, { Request, Response, NextFunction } from 'express';
import os from 'os';
import bodyParser from 'body-parser';
import formData from 'express-form-data';
import * as routeIndex from './src/routes';
import { cors } from './src/middleware/utils';
import { globalErrorHandler } from './src/utils/errors';
import {connectToDb} from './src/config/connection';

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

const app = express();

// CORS middleware
app.use(cors);

// parse data with connect-multiparty. 
app.use(formData.parse(options));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', routeIndex.authRouter);
app.use('/api/v1', routeIndex.paymentRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => res.status(404).json({ error: true, message: 'Not found.' }));

// Global error handler
app.use(globalErrorHandler);

connectToDb(app);