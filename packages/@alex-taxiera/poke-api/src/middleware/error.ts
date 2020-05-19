import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  BAD_REQUEST,
} from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

import { UnauthorizedError } from 'express-jwt'
import { Logger } from '@overnightjs/logger'
import { InputValidationError } from 'openapi-validator-middleware'
import { ErrorResponse } from '@utils/error'

export function logErrorAndStop (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
  if (error instanceof ErrorResponse) {
    Logger.Warn(`${error.constructor.name}: ${error.message}`)
    res
      .status(error.code)
      .json(error)
  } else if (error instanceof UnauthorizedError) {
    Logger.Warn(`Unauthorized: ${error.message}`)
    res
      .status(UNAUTHORIZED)
      .json({
        message: error.message,
        code: error.code,
      })
  } else if (error instanceof InputValidationError) {
    Logger.Warn(`Validation Error: ${error.message}`)
    res
      .status(BAD_REQUEST)
      .json({
        message: error.message,
        errors: error.errors,
      })
  } else {
    Logger.Err(`UNHANDLED ERROR: ${error.stack}`)
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({
        message: 'Internal server error',
        route: req.originalUrl,
      })
  }
}
