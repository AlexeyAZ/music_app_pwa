import { createAction, createReducer } from '../helpers'

const initialState = {
  active: 'primary',
}

export const changeTheme = createAction('CHANGE_THEME')

const themesModule = {
  modal: createReducer(changeTheme, {
    initialState,
    customTypes: {
      [changeTheme.start]: (state, payload) => {
        return {
          ...state,
          active: payload.active,
        }
      },
    },
  }),
}

export default themesModule
