import * as t from "io-ts"

export const GlobalErrorResponseSchema = JSON.parse(`{
    "type": "object",
    "required": [
        "error"
    ],
    "properties": {
        "error": {
            "type": "string"
        },
        "message": {
            "type": "string"
        }
    }
}`)

export const GlobalErrorResponse = t.intersection([
    t.type({
        error: t.string
    }),
    t.partial({
        message: t.string
    })
])