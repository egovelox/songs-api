import * as E from "fp-ts/Either"
import { pipe } from "fp-ts/lib/pipeable"

import { knex } from "./knex/knex"
import { User } from "./models/Types"
import { PlaylistReaderImpl } from "./persistence/playlists/PlaylistReader"

const user1: User = {
  id: 1,
  lastname: "Guardi",
  firstname: "Antonio",
  username: "anto",
  email: "anto@guardi.it",
  principalLang: "en",
  //secondaryLang: 'it'
}

PlaylistReaderImpl(knex)
  .findOne(user1, 6)()
  .then((eitherPlaylist) =>
    pipe(
      eitherPlaylist,
      E.fold(
        (error) => console.log(error),
        (playlist) => console.log(playlist)
      )
    )
  )
