import { createAction, createReducer } from 'helpers'
import union from 'lodash/union'

export const getMyFavorites = createAction('GET_MY_FAVORITES_REQUEST', {
  url: '/me/favorites',
})
export const getFavoritesStatus = createAction('GET_FAVORITES_STATUS_REQUEST', {
  url: `/me/favorites/status`,
})
export const addToFavorites = createAction('ADD_TO_FAVORITES_REQUEST', {
  method: 'post',
  url: `/me/favorites`,
})
export const removeFromFavorites = createAction('REMOVE_FROM_FAVORITES_REQUEST', id => ({
  method: 'delete',
  url: `/me/favorites/${id}`,
}))

export const addToGeneralFavorites = createAction('ADD_TO_GENERAL_FAVORITES')
export const removeFromGeneralFavorites = createAction('REMOVE_FROM_GENERAL_FAVORITES')

export const checkTracksFavorites = async dispatch => {
  const myFavorites = await dispatch(getMyFavorites())
  const favoriteStatus = await dispatch(getFavoritesStatus({ data: ['tra.2035491', '2'] }))
}

const favoritesModule = {
  myFavorites: createReducer(getMyFavorites),
  favoritesStatus: createReducer(getFavoritesStatus),
  generalFavorites: createReducer(
    {},
    {
      initialState: [],
      customTypes: {
        [addToGeneralFavorites.start]: (state, payload) => {
          const data = union(payload, state)
          return [...data]
        },
        [removeFromGeneralFavorites.start]: (state, payload) => {
          const data = state.filter(item => !payload.includes(item))
          return [...data]
        },
      },
    }
  ),
}

export default favoritesModule
