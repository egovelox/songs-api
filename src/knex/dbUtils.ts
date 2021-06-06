import * as TE from "fp-ts/lib/TaskEither"
import { TaskEither } from "fp-ts/lib/TaskEither"
import * as Knex from "knex"

import { DomainError } from "../models/errors/DomainError"
import { InternalError } from "../models/errors/InternalError"
import { logger } from "../utils/Logger"

export const executeQuery = <T, R>(
  baseQuery: Knex.QueryBuilder<T, R>
): TaskEither<DomainError, R> => {
  return TE.tryCatch(
    () => baseQuery.clone().then(),
    (error) => InternalError(String(error))
  )
}

type NonEmptyArray<T> = [T, ...T[]]

export function isNonEmptyArray<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0
}

export async function ApplyMigrations(knex: Knex) {
  logger.info("Applying migrations...")
  await knex.migrate.latest({ directory: "./knex/migrations" }).catch((reason) => {
    logger.error("Unable to migrate DB.")
    logger.error(reason)
    process.exit(1)
  })
  logger.info("Applied migrations !")
}
