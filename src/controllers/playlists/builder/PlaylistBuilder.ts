import * as fastify from "fastify"
import { DateTimeFromISOString } from "generated/types/_support/date-time"

import { Playlist, Song } from "../../../models/Types"
export function responseBuilderPlaylist(reply: fastify.FastifyReply, playlist: Playlist) {
  return reply.status(200).send(playlistResponseBuilder(playlist))
}

export type PlaylistResponse = {
  id: string
  name: string
  user: string
  creationDate: Date
  songs: Song[]
}
function playlistResponseBuilder(playlist: Playlist): PlaylistResponse {
  return {
    id: playlist.id,
    name: playlist.name,
    user: playlist.userId,
    creationDate: playlist.createdAt,
    songs: playlist.songs,
  }
}
