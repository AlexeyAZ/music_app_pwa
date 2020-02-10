import { createAction, createReducer } from 'helpers'

const playbackInfoInitialState = {
  id: null,
}

export const updatePlaybackInfo = createAction('UPDATE_PLAYBACK_INFO')

const playbackInfoModule = {
  playbackInfo: createReducer(updatePlaybackInfo, {
    initialState: playbackInfoInitialState,
    customTypes: {
      [updatePlaybackInfo.start]: (state, payload) => {
        return {
          ...state,
          ...payload,
        }
      },
    },
  }),
}

export default playbackInfoModule
