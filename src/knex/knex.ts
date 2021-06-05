export const knex = require("knex")({
  client: "mysql",
  version: "5.7",
  connection: {
    host: "127.0.0.1",
    user: "user",
    password: "password",
    database: "songsdb",
    port: 6606,
  },
})
