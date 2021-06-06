import { TaskEither } from "fp-ts/lib/TaskEither"
import * as Knex from "knex"

import { executeQuery } from "../../knex/dbUtils"
import { DomainError } from "../../models/errors/DomainError"
import { UserRow } from "./UserRow"
import * as userSchema from "./UserSchema"

export interface UserReader {
  findOne(userID: string): TaskEither<DomainError, UserRow[]>
}

type Dependencies = {
  knex: Knex
}

export function UserReaderImpl(deps: Dependencies): UserReader {
  return {
    findOne: findOne(deps),
  }
}

function findOne({ knex }: Dependencies) {
  return (userID: string): TaskEither<DomainError, UserRow[]> => {
    const selectUserQuery = buildSelectQueryUser(knex)(selectUserFields).where(
      `${userSchema.columns.id}`,
      userID
    )

    return executeQuery<UserRow, UserRow[]>(selectUserQuery)
  }
}

const buildSelectQueryUser = (knex: Knex) => (
  baseQueryBuilder: (knex: Knex) => Knex.QueryBuilder
): Knex.QueryBuilder<UserRow, UserRow[]> => baseQueryBuilder(knex).from(userSchema.tableName)

const selectUserFields = (knex: Knex) =>
  knex
    .select(`${userSchema.columns.id}`)
    .select(`${userSchema.columns.principalLang}`)
    .select(`${userSchema.columns.secondaryLang}`)
    .select(`${userSchema.columns.firstname}`)
    .select(`${userSchema.columns.lastname}`)
    .select(`${userSchema.columns.username}`)
    .select(`${userSchema.columns.email}`)
