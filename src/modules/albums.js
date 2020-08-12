import get from 'lodash/get'

import { createAction, createReducer } from 'helpers'

export const getAlbumDetailSelector = state => get(state, 'albumDetail.data.items[0]')

export const getNewAlbums = createAction('GET_NEW_ALBUMS_REQUEST', {
  url: `/albums/new`,
})

export const getTopAlbums = createAction('GET_TOP_ALBUMS_REQUEST', {
  url: `/albums/top`,
})

export const getAlbumDetail = createAction('GET_ALBUM_DETAIL_REQUEST', albumId => ({
  url: `/albums/${albumId}`,
}))

export const getAlbumTracks = createAction('GET_ALBUM_TRACKS_REQUEST', albumId => ({
  url: `/albums/${albumId}/tracks`,
}))

export const getAlbumImages = createAction('GET_ALBUM_IMAGES_REQUEST', albumId => ({
  url: `/albums/${albumId}/images`,
}))

export const getSimilarAlbums = createAction('GET_SIMILAR_ALBUMS_REQUEST', albumId => ({
  url: `/albums/${albumId}/similar`,
}))

const albumsModule = {
  newAlbums: createReducer(getNewAlbums),
  topAlbums: createReducer(getTopAlbums),
  albumImages: createReducer(getAlbumImages),
  albumDetail: createReducer(getAlbumDetail),
  albumTracks: createReducer(getAlbumTracks),
  similarAlbums: createReducer(getSimilarAlbums),
}

export default albumsModule
