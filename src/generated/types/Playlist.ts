import * as t from "io-ts"

import { DateTimeFromISOString } from "./_support/date-time"
import { Song } from "./Song"

export const PlaylistSchema = JSON.parse(`{
    "type": "object",
    "required": [
        "id",
        "name",
        "user",
        "creationDate",
        "songs"
    ],
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "user": {
            "type": "string"
        },
        "creationDate": {
            "type": "string",
            "format": "date-time"
        },
        "songs": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "name",
                    "author",
                    "duration",
                    "description",
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "author": {
                        "type": "string"
                    },
                    "duration": {
                        "type": "number"
                    },
                    "description": {
                        "type": "string"
                    }
                }
            }
        }
    }
}`)

export const Playlist = t.type({
  id: t.string,
  name: t.string,
  user: t.string,
  creationDate: DateTimeFromISOString,
  songs: t.array(Song),
})

export type Playlist = t.TypeOf<typeof Playlist>
