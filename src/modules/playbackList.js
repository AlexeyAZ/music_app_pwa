import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'
import { createAction, createReducer } from '../helpers'

export const setPlaybackList = createAction('SET_PLAYBACK_LIST')

export const addTracksToPlayback = createAction('ADD_TRACKS_TO_PLAYBACK')
export const removeTracksFromPlayback = createAction('REMOVE_TRACKS_FROM_PLAYBACK')

export const clearPlaybackListId = createAction('CLEAR_PLAYBACK_LIST_ID')

export const addToListened = createAction('ADD_TO_LISTENED')
export const clearListened = createAction('CLEAR_LISTENED')

export const getPlaybackListTracksSelector = (state) => state.playbackList.playbackTracks
export const getPlaybackListIdSelector = (state) => state.playbackList.playbackListId

const playbackListModule = {
  playbackList: createReducer(
    {},
    {
      initialState: {
        playbackListId: null,
        playbackTracks: [],
        listened: [],
      },
      customTypes: {
        [setPlaybackList.start]: (state, payload) => {
          const playbackTracks = get(payload, 'tracks') || state.playbackTracks
          const listened = playbackTracks.filter((track) => !track.isStreamable)
          return {
            ...state,
            playbackListId: payload.id,
            playbackTracks,
            listened,
          }
        },
        [addTracksToPlayback.start]: (state, payload) => {
          const playbackTracks = uniqBy([...state.playbackTracks, ...payload], 'id')
          const existListened = state.listened
          const newListened = playbackTracks.filter((track) => !track.isStreamable)
          const listened = uniqBy([...existListened, ...newListened], 'id')
          return {
            ...state,
            playbackTracks,
            listened,
          }
        },
        [removeTracksFromPlayback.start]: (state, { tracksIds }) => {
          const playbackTracks = state.playbackTracks.filter(
            (track) => !tracksIds.includes(track.id)
          )
          return {
            ...state,
            playbackTracks,
          }
        },
        [clearListened.start]: (state) => {
          return {
            ...state,
            listened: [],
          }
        },
        [addToListened.start]: (state, payload) => {
          if (!payload || state.listened.find((item) => item.id === payload.id)) {
            return { ...state }
          }
          return {
            ...state,
            listened: [...state.listened, payload],
          }
        },
        [clearPlaybackListId.start]: (state) => {
          return {
            ...state,
            playbackListId: null,
          }
        },
      },
    }
  ),
}

export default playbackListModule
