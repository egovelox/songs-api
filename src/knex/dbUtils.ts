import { Domain } from "domain"

import * as TE from "fp-ts/lib/TaskEither"
import { TaskEither } from "fp-ts/lib/TaskEither"
import * as Knex from "knex"

import { DomainError } from "../models/ErrorTypes"

export const executeQuery = <T, R>(
  baseQuery: Knex.QueryBuilder<T, R>
): TaskEither<DomainError, R> => {
  return TE.tryCatch(
    () => baseQuery.clone().then(),
    (error) => DomainError(String(error))
  )
}

type NonEmptyArray<T> = [T, ...T[]]

export function isNonEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0
}

export async function ApplyMigrations(knex: Knex) {
  console.log("Applying migrations...")
  await knex.migrate.latest({ directory: "./knex/migrations" }).catch((reason) => {
    console.error("Unable to migrate DB.")
    console.error(reason)
    process.exit(1)
  })
  console.log("Applied migrations !")
}
