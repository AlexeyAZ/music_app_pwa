import get from 'lodash/get'

import { createAction, createReducer } from '../helpers'

export const getGenreDetailSelector = (state) => get(state, 'genreDetail.data.items[0]')

export const getAllGenres = createAction('GET_ALL_GENRES_REQUEST', {
  url: '/genres',
})
export const getGenreDetail = createAction('GET_GENRE_DETAIL_REQUEST', (genreId) => ({
  url: `/genres/${genreId}`,
}))
export const getTopArtistsByGenre = createAction('GET_TOP_ARTISTS_BY_GENRE_REQUEST', (genreId) => ({
  url: `/genres/${genreId}/artists/top`,
}))
export const getTopAlbumsByGenre = createAction('GET_TOP_ALBUMS_BY_GENRE_REQUEST', (genreId) => ({
  url: `/genres/${genreId}/albums/top`,
}))
export const getTopTracksByGenre = createAction('GET_TOP_TRACKS_BY_GENRE_REQUEST', (genreId) => ({
  url: `/genres/${genreId}/tracks/top`,
}))

const genresModule = {
  allGenres: createReducer(getAllGenres),
  genreDetail: createReducer(getGenreDetail),
  topArtistsByGenre: createReducer(getTopArtistsByGenre),
  topAlbumsByGenre: createReducer(getTopAlbumsByGenre),
  topTracksByGenre: createReducer(getTopTracksByGenre),
}

export default genresModule
