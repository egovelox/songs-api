import { ErrorType, DomainError } from "./DomainError"

export type InternalError = {
    readonly type: ErrorType.INTERNAL_ERROR
    readonly clientMessage: string
}

export function InternalError(clientMessage: string): DomainError {
    return {
        type: ErrorType.INTERNAL_ERROR,
        clientMessage: clientMessage
    }
}