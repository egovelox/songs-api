import { GetOnePlaylistById } from "contracts/playlists/PlaylistContracts"
import { Dependency } from "controllers/playlists/PlaylistController"
import * as fastify from "fastify"
import { RouteGenericInterface } from "fastify/types/route"
import { NegotiateResponseType } from "../../../config/DomainErrorNegotiator"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import { pipe } from "fp-ts/lib/function"
import * as http from "http"
import { responseBuilderPlaylist } from "../builder/PlaylistBuilder"



type RouteInterface<Query, Path, Body> = Required<RouteGenericInterface> & {
    Params: Path
    Querystring: Query,
    Body: Body
}

type Handler<Query, Path, Body> = fastify.RouteHandlerMethod<
    fastify.RawServerDefault,
    fastify.RawRequestDefaultExpression,
    fastify.RawReplyDefaultExpression,
    RouteInterface<Query, Path, Body>
>

const withAuthorizations = <Query, Path, Body>(
    handler: () => Handler<Query, Path, Body>
): Handler<Query, Path, Body> => {
    return async function (
        this: fastify.FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>,
        request,
        reply
    ) {
        return handler().call(this, request, reply)
    }
}

export function getOnePlaylistById({
    playlistServiceReader
}: Dependency): GetOnePlaylistById {
    return withAuthorizations(
        () => async ( { params, url }, reply ) => {
            playlistServiceReader.getOne(params.user, params.id)()
                .then((eitherPlaylist) => {
                    return pipe(
                        eitherPlaylist,
                        E.fold(
                            (error) => NegotiateResponseType(error, url,  reply),
                            (playlist) => responseBuilderPlaylist(reply, playlist)
                        )
                    )
                })
        }
    )
}