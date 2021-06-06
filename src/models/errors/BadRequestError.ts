import { DomainError, ErrorType } from "./DomainError"

export type BadRequestError = {
  readonly type: ErrorType.BAD_REQUEST
  readonly clientMessage: string
}

export function BadRequestError(clientMessage: string): DomainError {
  return {
    type: ErrorType.BAD_REQUEST,
    clientMessage: clientMessage,
  }
}
