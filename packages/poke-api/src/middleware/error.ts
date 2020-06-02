import {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} from 'http-status-codes'
import {
  Request,
  Response,
  NextFunction,
} from 'express'

import { InputValidationError } from 'openapi-validator-middleware'
import { ErrorResponse } from '@utils/error'
import { logger } from '@utils/logger'

export function logErrorAndStop (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
): void {
  if (error instanceof ErrorResponse) {
    logger.warn(`${error.constructor.name}: ${error.message}`)
    res
      .status(error.code)
      .json(error)
  } else if (error instanceof InputValidationError) {
    logger.warn(`Validation Error: ${error.message}`)
    res
      .status(BAD_REQUEST)
      .json({
        message: error.message,
        errors: error.errors,
      })
  } else {
    logger.error(`UNHANDLED ERROR: ${error.stack ?? ''}`)
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({
        message: 'Internal server error',
        route: req.originalUrl,
      })
  }
}
