import { pipe } from "fp-ts/lib/pipeable"
import * as TE from "fp-ts/lib/TaskEither"
import { TaskEither } from "fp-ts/lib/TaskEither"
import * as Knex from "knex"

import { executeQuery, isNonEmptyArray } from "../../knex/dbUtils"
import { SongT, User } from "../../models/Types"
import { Song } from "../../models/Types"
import { DescriptionTranslation } from "../../models/Types"
import { PlaylistJoinedSongRow } from "../playlists/PlaylistJoinedSongRow"
import * as songSchema from "../songs/SongSchema"
import * as descriptionTranslationSchema from "./DescriptionTranslationSchema"

export function getTranslatedDescriptions(knex: Knex, user: User, songs: SongT[]) {
  const selectQuery = buildSelectQuerySong(knex)
    .whereIn(descriptionTranslationSchema.columns.lang, [
      user.principalLang,
      user.secondaryLang ?? "",
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
        (r) => r.lang === user.principalLang
      )

      let secArr: DescriptionTranslation[] = []
      if (user.secondaryLang !== undefined) {
        secArr = translationRows.filter((r) => r.lang === user.secondaryLang)
      }

      const arr: DescriptionTranslation[] = []

      songs.map((song) => {
        firstArr.map((r) => {
          if (r.song_id === song.song_id && r.lang === user.principalLang) {
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
    .select(descriptionTranslationSchema.columns.lang)
    .select(descriptionTranslationSchema.columns.value)
    .select(`${descriptionTranslationSchema.prefix}.${descriptionTranslationSchema.columns.songId}`)

const buildSelectQuerySong = (
  knex: Knex
): Knex.QueryBuilder<DescriptionTranslation, DescriptionTranslation[]> =>
  selectSongFields(knex).from(
    knex.ref(`${descriptionTranslationSchema.tableName}`).as(descriptionTranslationSchema.prefix)
  )
;