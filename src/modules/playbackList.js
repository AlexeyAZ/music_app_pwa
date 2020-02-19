import uniqBy from 'lodash/uniqBy'
import { createAction, createReducer } from 'helpers'

export const setPlaybackList = createAction('SET_PLAYBACK_LIST')

export const addTracksToTemp = createAction('ADD_TRACKS_TO_TEMP')
export const addTracksToPlayback = createAction('ADD_TRACKS_TO_PLAYBACK')

export const clearPlaybackTracks = createAction('CLEAR_PLAYBACK_TRACKS')
export const clearTempTracks = createAction('CLEAR_TEMP_TRACKS')

export const setPlaybackListId = createAction('SET_PLAYBACK_LIST_ID')
export const setTempListId = createAction('SET_TEMP_LIST_ID')

export const addToListened = createAction('ADD_TO_LISTENED')
export const clearListened = createAction('CLEAR_LISTENED')

const playbackListModule = {
  playbackList: createReducer(
    {},
    {
      initialState: {
        playbackListId: null,
        tempListId: null,
        tracks: [],
        tempTracks: [],
        listened: [],
      },
      customTypes: {
        [setPlaybackList.start]: state => {
          return {
            ...state,
            playbackListId: state.tempListId,
            tracks: state.tempTracks,
            listened: [],
          }
        },

        [addTracksToPlayback.start]: (state, payload) => {
          const newTracks = uniqBy([...state.tracks, ...payload], 'id')
          return {
            ...state,
            tracks: newTracks,
          }
        },
        [addTracksToTemp.start]: (state, payload) => {
          return {
            ...state,
            tempTracks: [...state.tempTracks, ...payload],
          }
        },

        [setPlaybackListId.start]: (state, payload) => {
          return {
            ...state,
            playbackListId: payload,
          }
        },
        [setTempListId.start]: (state, payload) => {
          return {
            ...state,
            tempListId: payload,
          }
        },

        [clearPlaybackTracks.start]: state => {
          return {
            ...state,
            tracks: [],
          }
        },
        [clearTempTracks.start]: state => {
          return {
            ...state,
            tempTracks: [],
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
