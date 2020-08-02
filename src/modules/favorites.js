import { createAction, createReducer } from 'helpers'
import union from 'lodash/union'

export const getMyFavorites = createAction('GET_MY_FAVORITES_REQUEST', {
  url: '/me/favorites',
})
export const getFavoritesStatus = createAction('GET_FAVORITES_STATUS_REQUEST', ids => ({
  url: `/me/favorites/status`,
  params: { ids },
}))
export const addToFavorites = createAction('ADD_TO_FAVORITES_REQUEST', id => ({
  method: 'post',
  url: `/me/favorites`,
  data: { favorites: [{ id }] },
}))

export const addToFavoritesMultiple = createAction('ADD_TO_FAVORITES_MULTIPLE_REQUEST', ids => ({
  method: 'post',
  url: `/me/favorites`,
  data: { favorites: ids.map(id => ({ id })) },
}))

export const removeFromFavorites = createAction('REMOVE_FROM_FAVORITES_REQUEST', id => ({
  method: 'delete',
  url: `/me/favorites/${id}`,
}))

export const addToGeneralFavorites = createAction('ADD_TO_GENERAL_FAVORITES')
export const removeFromGeneralFavorites = createAction('REMOVE_FROM_GENERAL_FAVORITES')

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
