import { createAction, createReducer } from 'helpers'

export const getTopPlaylists = createAction('GET_TOP_PLAYLISTS_REQUEST', {
  url: `/playlists/top`,
})

const playlistsModule = {
  topPlaylists: createReducer(getTopPlaylists),
}

export default playlistsModule
