import * as E from "fp-ts/Either"
import { pipe } from "fp-ts/lib/pipeable"
import * as Knex from "knex"

import { knex } from "./knex/knex"
import { User } from "./models/Types"
import { PlaylistServiceReaderImpl } from "./services/playlists/PlaylistServiceReader"
import { loadConfig } from "./config/Config"
import { createFastifyInstance } from "./utils/FastifyFactory"
import { ApplyMigrations } from "./knex/dbUtils"
import { logger } from "./utils/Logger"
import { PlaylistController } from "./controllers/playlists/PlaylistController"
import { UserServiceReaderImpl } from "./services/users/UserServiceReader"
import { PlaylistReaderImpl } from "./persistence/playlists/PlaylistReader"
import { UserReaderImpl } from "./persistence/users/UserReader"
import { registerFastify } from "./contracts/registerFastify"

async function main(): Promise<{}> {
  const config = loadConfig("../.env")
  const app = createFastifyInstance()

  const knexInstance = Knex({ client: "mysql", connection: config.mysql })

  await ApplyMigrations(knexInstance)

  logger.info("starting server...")

  // Query Components
  const playlistReader = PlaylistReaderImpl({knex: knexInstance})
  const userReader = UserReaderImpl({knex: knexInstance})
  // Query Services
  const playlistServiceReader = PlaylistServiceReaderImpl({playlistReader, userReader})

  registerFastify(app, {
    playlists: PlaylistController({playlistServiceReader})
  })

  return app.listen(config.http.port, config.http.url)

}

main().catch(( err ) => {
  logger.error("Fatal error in fastify server")
  logger.error(err)
  process.exit(1)
})