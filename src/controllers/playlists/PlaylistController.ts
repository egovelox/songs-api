import PlaylistContract from "../../generated/contracts/PlaylistsContract"
import { PlaylistServiceReader } from "../../services/playlists/PlaylistServiceReader"
import { getOnePlaylistById } from "./query/PlaylistQueryController"

export type Dependency = {
  playlistServiceReader: PlaylistServiceReader
}

export function PlaylistController(dependency: Dependency): PlaylistContract {
  return {
    getOnePlaylistById: getOnePlaylistById(dependency),
  }
}
