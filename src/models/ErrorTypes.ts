export type DomainError = {
  readonly type: "Domain Error"
  readonly clientMessage: string
}

export function DomainError(clientMessage: string): DomainError {
  return {
    type: "Domain Error",
    clientMessage,
  }
}
