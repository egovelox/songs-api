export type Song = {
  name: string
  author: string
  duration: number
  description: string
  id: number
}

export type SongT = {
  name: string
  author: string
  duration: number
  description: string
  song_id: number
}

export type User = {
  id: number
  lastname: string
  firstname: string
  username: string
  email: string
  principalLang: string
  secondaryLang?: string
}

export type PlaylistRow = {
  id: number
  name: number
  userId: number
  createdAt: Date
}

export type Playlist = {
  id: number
  name: number
  userId: number
  createdAt: Date
  songs: Song[]
}

export type DescriptionTranslation = {
  value: string
  lang: string
  song_id: number
}
