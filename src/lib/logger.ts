/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import winston from 'winston';

/* ---------------------------- internal imports ---------------------------- */
import {ErrorType} from '../utils/types'

class LoggerService {

  static myLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf((info) => {
        const {
          timestamp, level, message, ...args
        } = info;

        const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      }),
    ),
    transports: [
      (process.env.NODE_ENV === 'production') ?
        new winston.transports.Console({ format: winston.format.combine(winston.format.colorize())}) :
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.simple(),
            winston.format.colorize()
          )
        }),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });

  static error(msg: String, error: ErrorType) {
    console.log('\r');
    LoggerService.myLogger.error({
      message: msg,
      error
    })
  }

  static info(msg: String, data?: any) {
    console.log('\r');
    LoggerService.myLogger.info({
      message: msg,
      data
    })
  }
}

export default LoggerService;