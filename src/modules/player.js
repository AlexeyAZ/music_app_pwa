import { createAction, createReducer } from '../helpers'

const playerInitialState = {
  instance: null,
}

export const setPlayerInstance = createAction('SET_PLAYER_INSTANCE')

const playerModule = {
  player: createReducer(
    {},
    {
      initialState: playerInitialState,
      customTypes: {
        [setPlayerInstance.start]: (state, payload) => {
          return {
            ...state,
            instance: payload,
          }
        },
      },
    }
  ),
}

export default playerModule
