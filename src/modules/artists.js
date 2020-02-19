import { createAction, createReducer } from 'helpers'

export const getTopArtists = createAction('GET_TOP_ARTIST_REQUEST', {
  url: `/artists/top`,
})

export const getArtistAlbums = createAction('GET_ARTIST_ALBUMS_REQUEST', artistId => ({
  url: `/artists/${artistId}/albums`,
}))

export const getTopArtistAlbums = createAction('GET_TOP_ARTIST_ALBUMS_REQUEST', artistId => ({
  url: `/artists/${artistId}/albums/top`,
}))

export const getArtistTracks = createAction('GET_ARTIST_TRACKS_REQUEST', artistId => ({
  url: `/artists/${artistId}/tracks`,
}))

export const getTopArtistTracks = createAction('GET_TOP_ARTIST_TRACKS_REQUEST', artistId => ({
  url: `/artists/${artistId}/tracks/top`,
}))

const artistsModule = {
  topArtists: createReducer(getTopArtists),
  artistAlbums: createReducer(getArtistAlbums),
  topArtistAlbums: createReducer(getTopArtistAlbums),
  artistTracks: createReducer(getArtistTracks),
  topArtistTracks: createReducer(getTopArtistTracks),
}

export default artistsModule
