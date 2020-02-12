import { createAction, createReducer } from 'helpers'

export const setPlaybackList = createAction('SET_PLAYBACK_LIST')

export const addToListened = createAction('ADD_TO_LISTENED')
export const clearListened = createAction('CLEAR_LISTENED')

const playbackListModule = {
  playbackList: createReducer(
    {},
    {
      initialState: {
        tracks: [],
        favorites: [],
        listened: [],
      },
      customTypes: {
        [setPlaybackList.start]: (state, payload) => {
          return {
            ...state,
            tracks: payload,
            listened: [],
          }
        },
        [addToListened.start]: (state, payload) => {
          if (!payload || state.listened.find(item => item.id === payload.id)) {
            return { ...state }
          }
          return {
            ...state,
            listened: [...state.listened, payload],
          }
        },
        [clearListened.start]: state => {
          return {
            ...state,
            listened: [],
          }
        },
      },
    }
  ),
}

export default playbackListModule
