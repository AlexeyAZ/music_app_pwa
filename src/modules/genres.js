import { createAction, createReducer } from 'helpers'

export const getAllGenres = createAction('GET_ALL_GENRES_REQUEST', {
	url: '/genres',
})
export const getGenre = createAction('GET_GENRE_REQUEST', {
	url: '/genre',
})
export const getTopArtistsByGenre = createAction('GET_TOP_ARTISTS_BY_GENRE_REQUEST', genre => ({
	url: `/genres/${genre}/artists/top`,
}))

const genresModule = {
	allGenres: createReducer(getAllGenres),
	genre: createReducer(getGenre),
	topArtistsByGenre: createReducer(getTopArtistsByGenre),
}

export default genresModule
