import { pipe } from "fp-ts/lib/pipeable"
import * as TE from "fp-ts/lib/TaskEither"
import { TaskEither } from "fp-ts/lib/TaskEither"
import * as Knex from "knex"
import { InternalError } from "../../models/errors/InternalError"
import { executeQuery, isNonEmptyArray } from "../../knex/dbUtils"
import { DomainError } from "../../models/errors/DomainError"
import { Playlist } from "../../models/Types"
import { UserRow } from "../../persistence/users/UserRow"
import { SongRow } from "../../persistence/songs/SongRow"
import { PlaylistRow } from "../playlists/PlaylistRow"
import * as playlistSongSchema from "../playlist-song/PlaylistSongSchema"
import * as songSchema from "../songs/SongSchema"
import * as playlistSchema from "./PlaylistSchema"
import { getTranslatedDescriptions } from "../description-translations/DescriptionTranslationReader"

export interface PlaylistReader {
  findOne(user: UserRow, playlistID: string): TaskEither<DomainError, Playlist>
}

type Dependencies = {
  knex: Knex
}

export function PlaylistReaderImpl(deps: Dependencies): PlaylistReader {
  return {
    findOne: findOne(deps),
  }
}

function findOne({knex}: Dependencies) {
  return (user: UserRow, playlistID: string): TaskEither<DomainError, Playlist> => {
    const selectPlaylistQuery = buildSelectQueryPlaylist(knex)(selectPlaylistFields)
      .where(`${playlistSchema.columns.userId}`, user.id)
      .andWhere(`${playlistSchema.columns.id}`, playlistID)

    const selectSongsQuery = (id: string) =>
      buildSelectQuerySongs(knex).where({
        [songSchema.columns.playlistId]: id,
      })

    return pipe(
      TE.Do,
      TE.bind("playlistRows", () => executeQuery<PlaylistRow, PlaylistRow[]>(selectPlaylistQuery)),
      TE.filterOrElse(
        ({ playlistRows }) => isNonEmptyArray(playlistRows),
        (_) => InternalError("Check params, no result")
      ),
      TE.bind("songRows", ({ playlistRows: [playlistRow] }) =>
        executeQuery<SongRow, SongRow[]>(selectSongsQuery(playlistRow.id))
      ),
      TE.bind("translationRows", ({ songRows }) => getTranslatedDescriptions(knex, user, songRows)),
      TE.map(({ playlistRows, songRows, translationRows }) => {

        const songs: SongRow[] = songRows.map((s: SongRow) => {
          return translationRows.map((t) => t.song_id).includes(s.song_id)
            ? {
                ...s,
                description: translationRows
                  .filter((t) => t.song_id === s.song_id)
                  .map((t) => t.value)[0],
              }
            : s
        })
        return mapToPlaylist(playlistRows[0], songs)
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

const buildSelectQuerySongs = (knex: Knex): Knex.QueryBuilder<SongRow, SongRow[]> =>
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

 
function mapToPlaylist(playlist: PlaylistRow, songs: SongRow[]): Playlist {
  return {
    id: playlist.id,
    name: playlist.name,
    userId: playlist.user_id,
    createdAt: playlist.created_at,
    songs: songs.map((s) => ({...s, id: s.song_id }))
  }
}