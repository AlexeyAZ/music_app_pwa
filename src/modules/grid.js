import { createAction, createReducer } from 'helpers'

const initialState = {
  data: [],
}

export const addItemsToGrid = createAction('ADD_ITEMS_TO_GRID')
export const clearGrid = createAction('CLEAR_GRID')

const gridModule = {
  gridItems: createReducer(
    {},
    {
      initialState,
      customTypes: {
        [addItemsToGrid.start]: (state, payload) => {
          return {
            ...state,
            data: [...state.data, ...payload],
          }
        },
        [clearGrid.start]: state => {
          return {
            ...state,
            data: [],
          }
        },
      },
    }
  ),
}

export default gridModule
