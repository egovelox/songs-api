import * as http from "http"

import { FastifyInstance, RawServerBase } from "fastify"

import PlaylistContract from "../contracts/playlists/PlaylistContracts"
import { PlaylistSchema } from "../generated/types/Playlist"
import { GlobalErrorResponseSchema } from "../models/errors/GlobalErrorResponseSchema"

export interface Handlers<S extends RawServerBase = http.Server> {
  playlists: PlaylistContract<S>
}

export function registerFastify<
  S extends RawServerBase = http.Server,
  I extends FastifyInstance<S> = FastifyInstance<S>
>(server: I, handlers: Handlers<S>) {
  server.get(
    "/songsapi/:user/playlist/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
            user: { type: "string" },
          },
          required: ["id", "user"],
        },
        response: {
          200: PlaylistSchema,
          400: GlobalErrorResponseSchema,
          404: GlobalErrorResponseSchema,
          500: GlobalErrorResponseSchema,
        },
      },
    },
    handlers.playlists.getOnePlaylistById
  )
}
