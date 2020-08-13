import { createAction, createReducer } from '../helpers'

import { REPEAT_BUTTON_STATUS_ALL } from '../constants'

const playbackStatusInitialState = {
  isPlaying: false,
  isTrackLoaded: null,
  isTrackEnded: null,
  isShuffle: false,
  repeat: REPEAT_BUTTON_STATUS_ALL,
  track: {
    id: null,
    playbackSeconds: null,
  },
}

export const trackIdSelector = (state) => state.playbackStatus.track.id
export const durationSelector = (state) => state.playbackStatus.track.playbackSeconds
export const trackNameSelector = (state) => state.playbackStatus.track.name
export const artistNameSelector = (state) => state.playbackStatus.track.artistName

export const updatePlaybackStatus = createAction('UPDATE_PLAYBACK_STATUS')

const playbackStatusModule = {
  playbackStatus: createReducer(updatePlaybackStatus, {
    initialState: playbackStatusInitialState,
    customTypes: {
      [updatePlaybackStatus.start]: (state, payload) => {
        return {
          ...state,
          ...payload,
        }
      },
    },
  }),
}

export default playbackStatusModule
