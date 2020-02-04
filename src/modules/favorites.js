import { createAction, createReducer } from 'helpers'
import union from 'lodash/union'

export const getMyFavorites = createAction('GET_MY_FAVORITES_REQUEST', {
	url: '/me/favorites?limit=20',
})
export const getFavoriteStatus = createAction('GET_FAVORITE_STATUS_REQUEST', ids => {
	const idsAsString = ids.join()
	return {
		url: `/me/favorites/status?ids=${idsAsString}`,
	}
})
export const addToFavoritesRequest = createAction('ADD_TO_FAVORITES_REQUEST', {
	method: 'post',
	url: `/me/favorites`,
})
export const removeFromFavoritesRequest = createAction('REMOVE_FROM_FAVORITES_REQUEST', id => ({
	method: 'delete',
	url: `/me/favorites/${id}`,
}))

export const addToActiveFavorites = createAction('ADD_TO_ACTIVE_FAVORITES')
export const removeFromActiveFavorites = createAction('REMOVE_FROM_ACTIVE_FAVORITES')

export const checkTracksFavorites = async dispatch => {
	const myFavorites = await dispatch(getMyFavorites())
	const favoriteStatus = await dispatch(getFavoriteStatus({ data: ['tra.2035491', '2'] }))
	console.log('myFavorites', myFavorites)
	console.log('favoriteStatus', favoriteStatus)
}

const favoritesModule = {
	myFavorites: createReducer(getMyFavorites),
	myFavoriteStatus: createReducer(getFavoriteStatus),
	addToFavorites: createReducer(addToFavoritesRequest),
	activeFavorites: createReducer(
		{},
		{
			initialState: {
				data: [],
			},
			customTypes: {
				[addToActiveFavorites.start]: (state, payload) => {
					const data = union(payload.data, state.data)
					return {
						...state,
						data,
					}
				},
				[removeFromActiveFavorites.start]: (state, payload) => {
					const data = state.data.filter(item => !payload.data.includes(item))
					return {
						...state,
						data,
					}
				},
			},
		}
	),
}

export default favoritesModule
