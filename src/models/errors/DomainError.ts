import { BadRequestError } from "./BadRequestError"
import { InternalError } from "./InternalError"

export enum ErrorType {
    BAD_REQUEST = "invalidrequest.validation.errors",
    INTERNAL_ERROR = "error_server_error"
}

export type DomainError = 
| BadRequestError
| InternalError