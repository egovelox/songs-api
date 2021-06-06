import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import { TaskEither } from "fp-ts/lib/TaskEither"
import { DomainError } from "models/errors/DomainError"
import { Playlist, User } from "models/Types"
import { PlaylistReader } from "../../persistence/playlists/PlaylistReader"
import { UserReader } from "../../persistence/users/UserReader"
import { UserRow } from "persistence/users/UserRow"

export interface UserServiceReader {
    getOne(userID: string): TaskEither<DomainError, UserRow>
}

type Dependencies = {
    userReader: UserReader
}

export function UserServiceReaderImpl(
    deps: Dependencies
): UserServiceReader {
    return {
        getOne: getOne(deps)
    }
}

function getOne({ userReader }: Dependencies) {
    return (userID: string): TaskEither<DomainError, UserRow> => {
        return pipe(
            TE.Do,
            TE.bind("user", () => userReader.findOne(userID)),
            TE.map(({user}) => user[0] )
        )
    }
}