import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import { TaskEither } from "fp-ts/lib/TaskEither"
import { DomainError } from "models/errors/DomainError"
import { Playlist, User } from "models/Types"
import { PlaylistReader } from "../../persistence/playlists/PlaylistReader"
import { UserReader } from "persistence/users/UserReader"
import { Domain } from "domain"

export interface PlaylistServiceReader {
    getOne(userID: string, playlistID: string): TaskEither<DomainError, Playlist>
}

type Dependencies = {
    playlistReader: PlaylistReader
    userReader: UserReader
}

export function PlaylistServiceReaderImpl(
    deps: Dependencies
): PlaylistServiceReader {
    return {
        getOne: getOne(deps)
    }
}

function getOne({ playlistReader, userReader }: Dependencies) {
    return (userID: string, playlistID: string): TaskEither<DomainError, Playlist> => {
        return pipe(
            TE.Do,
            TE.bind("user", () => userReader.findOne(userID)),
            TE.bind("playlist", ({user}) => playlistReader.findOne(user[0], playlistID)),
            TE.map(({playlist}) => playlist)
        )
    }
}