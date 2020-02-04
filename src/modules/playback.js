import { createSelector } from 'reselect'
import { createAction, createReducer } from 'helpers'

const playbackInstanceInitialState = {
  instance: null,
}

const playbackStatusInitialState = {
  status: {
    uri: null,
    isMuted: false,
    positionMillis: null,
    durationMillis: null,
    shouldPlay: false,
    isPlaying: false,
    isBuffering: false,
    isLoaded: null,
    shouldCorrectPitch: true,
    progressUpdateIntervalMillis: 1000,
    volume: 1.0,
    rate: 1.0,
  },
  meta: {
    id: null,
  },
}

const playbackStatusSelector = state => state.playbackStatus

export const playbackStatusWithoutPosition = createSelector(
  [playbackStatusSelector],
  playbackStatus => {
    return playbackStatus
  }
)

export const updatePlaybackInstance = createAction('UPDATE_PLAYBACK_INSTANCE')
export const updatePlaybackStatus = createAction('UPDATE_PLAYBACK_STATUS')

const playerModule = {
  playbackInstance: createReducer(updatePlaybackInstance, {
    initialState: playbackInstanceInitialState,
    customTypes: {
      [updatePlaybackInstance.start]: (state, payload) => {
        return {
          ...state,
          instance: payload,
        }
      },
    },
  }),
  playbackStatus: createReducer(updatePlaybackStatus, {
    initialState: playbackStatusInitialState,
    customTypes: {
      [updatePlaybackStatus.start]: (state, payload) => {
        const status = payload.status || { ...state.status }
        const meta = payload.meta || { ...state.meta }
        return {
          ...state,
          status,
          meta,
        }
      },
    },
  }),
}

export default playerModule
