require("ts-node/register")

module.exports = {
  client: "mysql",
  version: "5.7",
  connection: "mysql://user:password@localhost:6606/songsdb",
  migrations: {
    tableName: "knex_migrations",
    directory: "migrations",
  },
  timezone: "UTC",
}

export {}
