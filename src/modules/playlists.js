import get from 'lodash/get'

import { createAction, createReducer } from 'helpers'

export const getPlaylistDetailSelector = state => get(state, 'playlistDetail.data.items[0]')
export const getPlaylistTracksSelector = state => get(state, 'playlistTracks.data')

export const getTopPlaylists = createAction('GET_TOP_PLAYLISTS_REQUEST', {
  url: `/playlists/top`,
})

export const getPlaylistDetail = createAction('GET_PLAYLISTS_DETAIL_REQUEST', playlistId => ({
  url: `/playlists/${playlistId}`,
}))

export const getPlaylistTracks = createAction('GET_PLAYLISTS_TRACKS_REQUEST', playlistId => ({
  url: `/playlists/${playlistId}/tracks`,
}))

const playlistsModule = {
  topPlaylists: createReducer(getTopPlaylists),
  playlistDetail: createReducer(getPlaylistDetail),
  playlistTracks: createReducer(getPlaylistTracks),
}

export default playlistsModule
