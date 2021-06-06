import PlaylistContract from "../../contracts/playlists/PlaylistContracts"
import { PlaylistServiceReader } from "../../services/playlists/PlaylistServiceReader"
import { UserServiceReader } from "../../services/users/UserServiceReader"
import { getOnePlaylistById } from "./query/PlaylistQueryController"

export type Dependency = {
  playlistServiceReader: PlaylistServiceReader
}

export function PlaylistController(dependency: Dependency): PlaylistContract {
  return {
    getOnePlaylistById: getOnePlaylistById(dependency),
  }
}
