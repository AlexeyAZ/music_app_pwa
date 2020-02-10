import { createAction, createReducer } from 'helpers'

const playbackStatusInitialState = {
  isPlaying: false,
  isTrackLoaded: null,
  isTrackEnded: null,
  isShuffle: false,
  isRepeat: 'none', // 'none', 'all', 'one'
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
