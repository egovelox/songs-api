import { FastifyInstance, RawServerBase } from "fastify";
import * as http from "http"
import PlaylistContract from "../contracts/playlists/PlaylistContracts"
import { GlobalErrorResponseSchema } from "../models/errors/GlobalErrorResponseSchema"
import { PlaylistSchema } from "../generated/types/Playlist"

export interface Handlers<S extends RawServerBase = http.Server> {
    playlists: PlaylistContract<S>
}

export function registerFastify<S extends RawServerBase = http.Server, I extends FastifyInstance<S> = FastifyInstance<S>>(server: I, handlers: Handlers<S>) {
    server.get('/songsapi/:user/playlist/:id', {schema: {params: {"type": "object", "properties": {"id": {"type":"string"}, "user": {"type": "string"}}, "required":["id", "user"]}, response: {200: PlaylistSchema, 400: GlobalErrorResponseSchema, 500: GlobalErrorResponseSchema}} }, handlers.playlists.getOnePlaylistById)
} 