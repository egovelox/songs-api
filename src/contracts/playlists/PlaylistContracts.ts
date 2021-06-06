import { RouteHandlerMethod, RouteGenericInterface } from "fastify/types/route"
import {
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    RawServerBase
} from "fastify/types/utils"
import * as http from "http"

export type GetOnePlaylistById_path = {
    user: string
    id: string
}

export type GetOnePlaylistById_generic = {
    Params: GetOnePlaylistById_path
}

export type GetOnePlaylistById<S extends RawServerBase = http.Server> = RouteHandlerMethod<
    S,
    RawRequestDefaultExpression<S>,
    RawReplyDefaultExpression<S>,
    Required<RouteGenericInterface> & GetOnePlaylistById_generic
>

interface PlaylistContract<S extends RawServerBase = http.Server> {
    getOnePlaylistById: GetOnePlaylistById<S>
}

export default PlaylistContract