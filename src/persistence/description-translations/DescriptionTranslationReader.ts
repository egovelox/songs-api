import { pipe } from "fp-ts/lib/pipeable"
import * as TE from "fp-ts/lib/TaskEither"
import * as Knex from "knex"
import { UserRow } from "../../persistence/users/UserRow"

import { executeQuery } from "../../knex/dbUtils"
import { DescriptionTranslation } from "../../models/Types"
import * as descriptionTranslationSchema from "./DescriptionTranslationSchema"
import { SongRow } from "../../persistence/songs/SongRow"

export function getTranslatedDescriptions(knex: Knex, user: UserRow, songs: SongRow[]) {

  const selectQuery = buildSelectQuerySong(knex)
    .whereIn(`${descriptionTranslationSchema.prefix}.${descriptionTranslationSchema.columns.lang}`, [
      user.principal_lang,
      user.secondary_lang ?? "",
    ])
    .whereIn(
      `${descriptionTranslationSchema.prefix}.${descriptionTranslationSchema.columns.songId}`,
      [...songs.map((s) => s.song_id)]
    )

  return pipe(
    TE.Do,
    TE.bind("translationRows", () =>
      executeQuery<DescriptionTranslation, DescriptionTranslation[]>(selectQuery)
    ),
    TE.map(({ translationRows }) => {
      const firstArr: DescriptionTranslation[] = translationRows.filter(
        (r) => r.lang === user.principal_lang
      )

      let secArr: DescriptionTranslation[] = []
      if (user.secondary_lang !== undefined) {
        secArr = translationRows.filter((r) => r.lang === user.secondary_lang)
      }

      const arr: DescriptionTranslation[] = []

      songs.map((song) => {
        firstArr.map((r) => {
          if (r.song_id === song.song_id && r.lang === user.principal_lang) {
            arr.push(r)
            secArr = secArr.filter((r) => r.song_id !== song.song_id)
          }
        })
      })
      return [...arr, ...secArr]
    })
  )
}

const selectSongFields = (knex: Knex) =>
  knex
    .select(`${descriptionTranslationSchema.prefix}.${descriptionTranslationSchema.columns.lang}`)
    .select(`${descriptionTranslationSchema.prefix}.${descriptionTranslationSchema.columns.value}`)
    .select(`${descriptionTranslationSchema.prefix}.${descriptionTranslationSchema.columns.songId}`)

const buildSelectQuerySong = (
  knex: Knex
): Knex.QueryBuilder<DescriptionTranslation, DescriptionTranslation[]> =>
  selectSongFields(knex).from(
    knex.ref(`${descriptionTranslationSchema.tableName}`).as(descriptionTranslationSchema.prefix)
  )
;