import { pipe } from "fp-ts/lib/function"
import { TaskEither } from "fp-ts/lib/TaskEither"
import * as TE from "fp-ts/TaskEither"
import { DomainError } from "models/errors/DomainError"
import { Playlist, User } from "models/Types"
import { UserRow } from "persistence/users/UserRow"

import { PlaylistReader } from "../../persistence/playlists/PlaylistReader"
import { UserReader } from "../../persistence/users/UserReader"

export interface UserServiceReader {
  getOne(userID: string): TaskEither<DomainError, UserRow>
}

type Dependencies = {
  userReader: UserReader
}

export function UserServiceReaderImpl(deps: Dependencies): UserServiceReader {
  return {
    getOne: getOne(deps),
  }
}

function getOne({ userReader }: Dependencies) {
  return (userID: string): TaskEither<DomainError, UserRow> => {
    return pipe(
      TE.Do,
      TE.bind("user", () => userReader.findOne(userID)),
      TE.map(({ user }) => user[0])
    )
  }
}
