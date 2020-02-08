import { createAction, createReducer } from 'helpers'

const initialState = {
  activeTheme: 'material',
}

export const changeIconTheme = createAction('CHANGE_ICON_THEME')

const iconThemesModule = {
  iconThemes: createReducer(changeIconTheme, {
    initialState,
    customTypes: {
      [changeIconTheme.start]: (state, payload) => {
        return {
          ...state,
          activeTheme: payload.activeTheme,
        }
      },
    },
  }),
}

export default iconThemesModule
