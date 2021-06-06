export interface UserRow {
    readonly id: string
    readonly principal_lang: string
    readonly secondary_lang?: string
    readonly lastname: string
    readonly firstname: string
    readonly email: string
    readonly username: string
  }