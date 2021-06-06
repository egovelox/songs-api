export type Song = {
  name: string
  author: string
  duration: number
  description: string
  id: string
}

export type User = {
  id: string
  lastname: string
  firstname: string
  username: string
  email: string
  principalLang: string
  secondaryLang?: string
}

export type Playlist = {
  id: string
  name: string
  userId: string
  createdAt: Date
  songs: Song[]
}

export type DescriptionTranslation = {
  value: string
  lang: string
  song_id: string
}
