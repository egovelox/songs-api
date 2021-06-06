import { either } from "fp-ts/lib/Either"
import * as t from "io-ts"

export class DateTimeFromISOStringType extends t.Type<Date, string, unknown> {
  readonly _tag: "DateTimeFromISOStringType" = "DateTimeFromISOStringType"
  constructor() {
    super(
      "DateTimeFromISOString",
      (u): u is Date => u instanceof Date,
      (u, c) =>
        either.chain(t.string.validate(u, c), (s) => {
          const d = new Date(s)
          return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
        }),
      (a) => a.toISOString()
    )
  }
}

export interface DateTimeFromISOString extends DateTimeFromISOStringType {}

export const DateTimeFromISOString: DateTimeFromISOString = new DateTimeFromISOStringType()
