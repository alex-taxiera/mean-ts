import {
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from 'http-status-codes'

export class ErrorResponse {

  constructor (
    public readonly code: number,
    public readonly message: string,
  ) {}

}

export class BadRequestError extends ErrorResponse {

  constructor (message: string) {
    super(BAD_REQUEST, `Bad Request: ${message}`)
  }

}

export class ForbiddenError extends ErrorResponse {

  constructor () {
    super(FORBIDDEN, 'Forbidden')
  }

}

export class NotFoundError extends ErrorResponse {

  constructor () {
    super(NOT_FOUND, 'Not Found')
  }

}

export class ServerError extends ErrorResponse {

  constructor (message?: string) {
    super(
      INTERNAL_SERVER_ERROR,
      message ?? 'There was a problem, please try again later',
    )
  }

}
