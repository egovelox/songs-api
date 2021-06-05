import { SongT } from "../../models/Types"

export interface PlaylistJoinedSongRow {
  readonly id: number
  readonly name: number
  readonly userId: number
  readonly createdAt: Date
  readonly songs: SongT[]
}
