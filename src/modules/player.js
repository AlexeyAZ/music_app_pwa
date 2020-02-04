import { createAction, createReducer } from 'helpers'

const playerInitialState = {
  loaded: false,
}

export const updatePlayerStatus = createAction('UPDATE_PLAYER_STATUS')

const playerModule = {
  playbackInstance: createReducer(updatePlayerStatus, {
    initialState: playerInitialState,
    customTypes: {
      [updatePlayerStatus.start]: (state, payload) => {
        return {
          ...state,
          loaded: payload.loaded,
        }
      },
    },
  }),
}

export default playerModule
