import express, { Request, Response, NextFunction } from 'express';
import os from 'os';
import bodyParser from 'body-parser';
import formData from 'express-form-data';
import * as routeIndex from './src/routes';
import { cors } from './src/middleware/utils';
import { globalErrorHandler } from './src/utils/errors';
import {connectToDb} from './src/config/connection';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';

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

// app routes
app.use('/api/v1', routeIndex.authRouter);
app.use('/api/v1', routeIndex.paymentRouter);

// swagger route
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('*', (req: Request, res: Response, next: NextFunction) => res.status(404).json({ error: true, message: 'Not found.' }));

// Global error handler
app.use(globalErrorHandler);

connectToDb(app);