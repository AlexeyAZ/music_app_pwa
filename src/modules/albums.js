import { createAction, createReducer } from 'helpers'

export const getNewAlbums = createAction('GET_NEW_ALBUMS_REQUEST', {
  url: `/albums/new`,
})

export const getTopAlbums = createAction('GET_TOP_ALBUMS_REQUEST', {
  url: `/albums/top`,
})

export const getAlbumImages = createAction('GET_ALBUM_IMAGES_REQUEST', albumId => ({
  url: `/albums/${albumId}/images`,
}))

const albumsModule = {
  newAlbums: createReducer(getNewAlbums),
  topAlbums: createReducer(getTopAlbums),
  albumImages: createReducer(getAlbumImages),
}

export default albumsModule
