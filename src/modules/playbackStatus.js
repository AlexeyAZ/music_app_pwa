import { createAction, createReducer } from 'helpers'

const playbackStatusInitialState = {
  isPlaying: false,
  trackId: null,
  isTrackLoaded: null,
  duration: null,
}

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
