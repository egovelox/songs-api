import { PlaylistServiceReader } from "../../services/playlists/PlaylistServiceReader"
import { getOnePlaylistById } from "./query/PlaylistQueryController"
import { UserServiceReader } from "../../services/users/UserServiceReader"
import PlaylistContract from "../../contracts/playlists/PlaylistContracts"

export type Dependency = {
    playlistServiceReader: PlaylistServiceReader
}

export function PlaylistController(dependency: Dependency): PlaylistContract {
    return {
        getOnePlaylistById: getOnePlaylistById(dependency)
    }
}