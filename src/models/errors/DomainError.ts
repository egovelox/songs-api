import { BadRequestError } from "./BadRequestError"
import { InternalError } from "./InternalError"
import { NotFoundError } from "./NotFoundError"

export enum ErrorType {
    BAD_REQUEST = "invalidrequest.validation.errors",
    INTERNAL_ERROR = "error_server_error",
    NOT_FOUND_ERROR = "not_found_error"
}

export type DomainError = 
| BadRequestError
| InternalError
| NotFoundError