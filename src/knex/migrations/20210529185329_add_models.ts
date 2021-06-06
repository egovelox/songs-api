import * as Knex from "knex"

const songsNameIndex = "songs_name_index"
const usersNameIndex = "users_name_index"
const playlistsNameIndex = "playlists_name_index"

const TableNames = {
  songs: "songs",
  users: "users",
  playlists: "playlists",
  songPlaylist: "song_playlist",
  descriptionsTranslations: "description_translations",
}

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
        ALTER DATABASE ${knex.client.database()} CHARACTER SET utf8
    `)

  await createSongsSchema(knex)

  await createUsersSchema(knex)

  await createPlaylistsSchema(knex)

  await createDescriptionTranslationsSchema(knex)

  await createSongPlaylistSchema(knex)

  await addConstraints(knex)
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP INDEX ${songsNameIndex} ON ${TableNames.songs}`)
  await knex.schema.raw(`DROP TABLE IF EXISTS ${TableNames.songs}`)
  await knex.schema.raw(`DROP INDEX ${usersNameIndex} ON ${TableNames.users}`)
  await knex.schema.raw(`DROP TABLE IF EXISTS ${TableNames.users}`)
  await knex.schema.raw(`DROP INDEX ${playlistsNameIndex} ON ${TableNames.playlists}`)
  await knex.schema.raw(`DROP TABLE IF EXISTS ${TableNames.playlists}`)
  await knex.schema.raw(`DROP TABLE IF EXISTS ${TableNames.songPlaylist}`)
  await knex.schema.raw(`DROP TABLE IF EXISTS ${TableNames.descriptionsTranslations}`)
}

async function createSongsSchema(knex: Knex<any, unknown[]>) {
  await knex.schema.raw(`
        CREATE TABLE ${TableNames.songs}
        (
            id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            duration FLOAT NOT NULL,
            description VARCHAR(255) DEFAULT NULL,

            PRIMARY KEY (id),
            INDEX ${songsNameIndex} (name)
        );
    `)
}

async function createUsersSchema(knex: Knex<any, unknown[]>) {
  await knex.schema.raw(`
        CREATE TABLE ${TableNames.users}
        (
            id VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            principal_lang VARCHAR(5) NOT NULL,
            secondary_lang VARCHAR(5) NULL,

            PRIMARY KEY(id, username),
            INDEX ${usersNameIndex} (username)
        );
    `)
}

async function createPlaylistsSchema(knex: Knex<any, unknown[]>) {
  await knex.schema.raw(`
        CREATE TABLE ${TableNames.playlists}
        (
            id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL,

            PRIMARY KEY (id, user_id),
            INDEX ${playlistsNameIndex} (name)
        );
    `)
}

async function createSongPlaylistSchema(knex: Knex<any, unknown[]>) {
  await knex.schema.raw(`
        CREATE TABLE ${TableNames.songPlaylist}
        (
            song_index VARCHAR(255) NOT NULL,
            song_id VARCHAR(255) NOT NULL,
            playlist_id VARCHAR(255) NOT NULL,

            PRIMARY KEY(song_index, song_id, playlist_id)
        );        
    `)
}

async function createDescriptionTranslationsSchema(knex: Knex<any, unknown[]>) {
  await knex.schema.raw(`
        CREATE TABLE ${TableNames.descriptionsTranslations}
        (
            id VARCHAR(255) NOT NULL,
            song_id VARCHAR(255) NOT NULL,
            lang VARCHAR(5),
            value VARCHAR(255),

            PRIMARY KEY (id)
        );
    `)
}

async function addConstraints(knex: Knex<any, unknown[]>) {
  await knex.schema.raw(`
        ALTER TABLE ${TableNames.playlists} ADD CONSTRAINT
            ct_${TableNames.playlists}_user_id FOREIGN KEY fk_user (user_id) REFERENCES ${TableNames.users}(id)
    `)
  await knex.schema.raw(`
        ALTER TABLE ${TableNames.descriptionsTranslations} ADD CONSTRAINT
            ct_${TableNames.descriptionsTranslations}_song_code FOREIGN KEY fk_song (song_id) REFERENCES ${TableNames.songs}(id)    
    `)
  await knex.schema.raw(`
        ALTER TABLE ${TableNames.songPlaylist} ADD CONSTRAINT
            ct_${TableNames.songPlaylist}_song_code FOREIGN KEY fk_song (song_id) REFERENCES ${TableNames.songs}(id)    
    `)
  await knex.schema.raw(`
        ALTER TABLE ${TableNames.songPlaylist} ADD CONSTRAINT
            ct_${TableNames.songPlaylist}_playlist_id FOREIGN KEY fk_playlist (playlist_id) REFERENCES ${TableNames.playlists}(id)    
    `)
}
