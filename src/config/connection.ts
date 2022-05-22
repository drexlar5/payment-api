/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import mongoose from "mongoose";
import express from "express";

/* ---------------------------- internal imports ---------------------------- */
import { config } from "./config";
import logger from "../lib/logger";

const connection = () =>
  mongoose.connect(config.mongoConnection as string);

const testConnection = () =>
  mongoose.connect(config.mongoTestConnection as string);

const disconnectTest = () => mongoose.disconnect();

const connectToDb = (app: express.Application) =>
  connection()
    .then(() => {
      app.listen(config.port, () => logger.info(`server connected at port: ${config.port}`));
    })
    .catch((err) => logger.error("connection error", err));

export {
  connection,
  testConnection,
  disconnectTest,
  connectToDb,
}
