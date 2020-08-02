import get from 'lodash/get'

import { createAction, createReducer } from 'helpers'

const initialState = {
  data: [],
}

export const addItemsToTempStorage = createAction('ADD_ITEMS_TO_TEMP_STORAGE')
export const clearTempStorage = createAction('CLEAR_TEMP_STORAGE')
export const removeItemsFromTempStorage = createAction('REMOVE_ITEMS_FROM_TEMP_STORAGE')

export const getTempStorageDataSelector = state => state.tempStorage.data
export const getTempStorageItemsByIdSelector = (state, storageId) => {
  const data = getTempStorageDataSelector(state)
  return get(data.find(item => item.id === storageId), 'items') || []
}
export const getTempStorageItemsCountByIdSelector = (state, storageId) => {
  const data = getTempStorageDataSelector(state)
  return get(data.find(item => item.id === storageId), 'itemsCount')
}

const tempStorageModule = {
  tempStorage: createReducer(
    {},
    {
      initialState,
      customTypes: {
        [addItemsToTempStorage.start]: (state, { storageId, items, itemsCount }) => {
          if (state.data.find(item => item.id === storageId)) {
            return {
              ...state,
              data: state.data.map(item => {
                if (item.id === storageId) {
                  return { ...item, items: [...item.items, ...items], itemsCount }
                }
                return item
              }),
            }
          }
          return {
            ...state,
            data: [...state.data, { id: storageId, items, itemsCount }],
          }
        },

        [clearTempStorage.start]: (state, storageId) => {
          if (state.data.find(item => item.id === storageId)) {
            return {
              ...state,
              data: state.data.filter(item => item.id !== storageId),
            }
          }
          return {
            ...state,
          }
        },

        [removeItemsFromTempStorage.start]: (state, { storageId, itemsIds }) => {
          const data = state.data.map(storage => {
            if (storage.id === storageId) {
              const items = storage.items.filter(item => !itemsIds.includes(item.id))
              return { ...storage, items, itemsCount: items.length }
            }
            return storage
          })
          return {
            ...state,
            data,
          }
        },
      },
    }
  ),
}

export default tempStorageModule
