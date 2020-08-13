import { createAction, createReducer } from '../helpers'

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
        [addItemsToGrid.start]: (state, { gridName, items }) => {
          if (state.data.find((item) => item.name === gridName)) {
            return {
              ...state,
              data: state.data.map((item) => {
                if (item.name === gridName) {
                  return { ...item, items: [...item.items, ...items] }
                }
                return item
              }),
            }
          }
          return {
            ...state,
            data: [...state.data, { name: gridName, items }],
          }
        },

        [clearGrid.start]: (state, gridName) => {
          if (state.data.find((item) => item.name === gridName)) {
            return {
              ...state,
              data: state.data.filter((item) => item.name !== gridName),
            }
          }
          return {
            ...state,
          }
        },
      },
    }
  ),
}

export default gridModule
