import { SongRow } from "../../persistence/songs/SongRow"

export interface PlaylistJoinedSongRow {
  readonly id: number
  readonly name: number
  readonly userId: number
  readonly createdAt: Date
  readonly songs: SongRow[]
}
