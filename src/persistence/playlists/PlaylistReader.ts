import { pipe } from "fp-ts/lib/pipeable"
import * as TE from "fp-ts/lib/TaskEither"
import { TaskEither } from "fp-ts/lib/TaskEither"
import * as Knex from "knex"

import { executeQuery, isNonEmptyArray } from "../../knex/dbUtils"
import { knex } from "../../knex/knex"
import { DomainError } from "../../models/ErrorTypes"
import { Song, SongT } from "../../models/Types"
import { User } from "../../models/Types"
import { Playlist } from "../../models/Types"
import { DescriptionTranslation } from "../../models/Types"
import { getTranslatedDescriptions } from "../description-translations/DescriptionTranslationReader"
import * as descriptionTranslationSchema from "../description-translations/DescriptionTranslationSchema"
import * as playlistSongSchema from "../playlist-song/PlaylistSongSchema"
import { PlaylistJoinedSongRow } from "../playlists/PlaylistJoinedSongRow"
import { PlaylistRow } from "../playlists/PlaylistRow"
import * as songSchema from "../songs/SongSchema"
import * as userSchema from "../users/userSchema"
import * as playlistSchema from "./PlaylistSchema"

export interface PlayListReader {
  findOne(user: User, playlistID: number): TaskEither<DomainError, SongT[]>
}

export function PlaylistReaderImpl(knex: Knex): PlayListReader {
  return {
    findOne: findOne(knex),
  }
}

function findOne(knex: Knex) {
  return (user: User, playlistID: number): TaskEither<DomainError, SongT[]> => {
    const selectPlaylistQuery = buildSelectQueryPlaylist(knex)(selectPlaylistFields)
      .where(`${playlistSchema.columns.userId}`, user.id)
      .andWhere(`${playlistSchema.columns.id}`, playlistID)

    const selectSongsQuery = (id: number) =>
      buildSelectQuerySongs(knex).where({
        [songSchema.columns.playlistId]: id,
      })

    return pipe(
      TE.Do,
      TE.bind("playlistRows", () => executeQuery<PlaylistRow, PlaylistRow[]>(selectPlaylistQuery)),
      TE.filterOrElse(
        ({ playlistRows }) => isNonEmptyArray(playlistRows),
        (_) => DomainError("Check params, no result")
      ),
      TE.bind("songRows", ({ playlistRows: [playlistRow] }) =>
        executeQuery<SongT, SongT[]>(selectSongsQuery(playlistRow.id))
      ),
      TE.bind("translationRows", ({ songRows }) => getTranslatedDescriptions(knex, user, songRows)),
      TE.map(({ playlistRows, songRows, translationRows }) => {
        const songs: SongT[] = songRows.map((s: SongT) => {
          return translationRows.map((t) => t.song_id).includes(s.song_id)
            ? {
                ...s,
                description: translationRows
                  .filter((t) => t.song_id === s.song_id)
                  .map((t) => t.value)[0],
              }
            : s
        })

        return songs
      })
    )
  }
}

const buildSelectQueryPlaylist = (knex: Knex) => (
  baseQueryBuilder: (knex: Knex) => Knex.QueryBuilder
): Knex.QueryBuilder<PlaylistRow, PlaylistRow[]> =>
  baseQueryBuilder(knex).from(playlistSchema.tableName)

const selectPlaylistFields = (knex: Knex) =>
  knex
    .select(`${playlistSchema.columns.id}`)
    .select(`${playlistSchema.columns.name}`)
    .select(`${playlistSchema.columns.createdAt}`)
    .select(`${playlistSchema.columns.userId}`)

const buildSelectQuerySongs = (knex: Knex): Knex.QueryBuilder<SongT, SongT[]> =>
  selectSongFields(knex)
    .from(knex.ref(`${playlistSongSchema.tableName}`).as(playlistSongSchema.prefix))
    .innerJoin(
      knex.ref(`${songSchema.tableName}`).as(songSchema.prefix),
      `${playlistSongSchema.prefix}.${playlistSongSchema.columns.songId}`,
      `${songSchema.prefix}.${songSchema.columns.id}`
    )
    .innerJoin(
      knex.ref(`${playlistSchema.tableName}`).as(playlistSchema.prefix),
      `${playlistSongSchema.prefix}.${playlistSongSchema.columns.playlistId}`,
      `${playlistSchema.prefix}.${playlistSchema.columns.id}`
    )

const selectSongFields = (knex: Knex) =>
  knex
    .select(knex.ref(`${songSchema.prefix}.${songSchema.columns.id}`).as(`${songSchema.SongId}`))
    .select(`${songSchema.prefix}.${songSchema.columns.name}`)
    .select(`${songSchema.prefix}.${songSchema.columns.author}`)
    .select(`${songSchema.prefix}.${songSchema.columns.description}`)
    .select(`${songSchema.prefix}.${songSchema.columns.duration}`)
