import { createAction, createReducer } from '../helpers'

const playbackPositionInitialState = {
  position: 0,
}

export const updatePlaybackPosition = createAction('UPDATE_PLAYBACK_POSITION')

const playbackPositionModule = {
  playbackPosition: createReducer(updatePlaybackPosition, {
    initialState: playbackPositionInitialState,
    customTypes: {
      [updatePlaybackPosition.start]: (state, payload) => {
        return {
          ...state,
          ...payload,
        }
      },
    },
  }),
}

export default playbackPositionModule
