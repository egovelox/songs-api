import { ErrorType, DomainError } from "./DomainError"

export type NotFoundError = {
    readonly type: ErrorType.NOT_FOUND_ERROR
    readonly clientMessage: string
}

export function NotFoundError(clientMessage: string): DomainError {
    return {
        type: ErrorType.NOT_FOUND_ERROR,
        clientMessage: clientMessage
    }
}