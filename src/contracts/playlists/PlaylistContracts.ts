import * as http from "http"

import { RouteGenericInterface, RouteHandlerMethod } from "fastify/types/route"
import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
} from "fastify/types/utils"

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
