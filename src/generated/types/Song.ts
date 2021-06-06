import * as t from "io-ts"

export const Song = t.type({
  name: t.string,
  author: t.string,
  duration: t.number,
  description: t.string,
  song_id: t.string,
})
