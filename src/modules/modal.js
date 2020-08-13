import { createAction, createReducer } from '../helpers'

const initialState = {
  name: '',
  isOpen: false,
}

export const openModal = createAction('OPEN_MODAL', (data) => {
  console.log('data', data)
  return {
    method: 'post',
  }
})
export const closeModal = createAction('CLOSE_MODAL')

const modalModule = {
  modal: createReducer(openModal, {
    initialState,
    customTypes: {
      [openModal.start]: (state, payload) => {
        return {
          ...state,
          isOpen: true,
          name: payload.name,
        }
      },
      [closeModal.start]: (state) => {
        return {
          ...state,
          isOpen: false,
        }
      },
    },
  }),
}

export default modalModule
