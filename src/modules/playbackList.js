import { createAction, createReducer } from 'helpers'

export const setPlaybackList = createAction('SET_PLAYBACK_LIST')
export const addToListened = createAction('ADD_TO_LISTENED')

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
          }
        },
        [addToListened.start]: (state, payload) => {
          return {
            ...state,
            listened: [...state.listened, payload],
          }
        },
      },
    }
  ),
}

export default playbackListModule
