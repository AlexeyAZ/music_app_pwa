import { createAction, createReducer } from 'helpers'

const initialState = {
	data: [],
	loading: false,
	error: null,
}

const getAllUsers = createAction('GET_ALL_USERS_REQUEST', () => ({ url: 'app/profile/view-all' }))

const allUsersReducer = createReducer(initialState, getAllUsers)

// const allUsersReducer = createReducer(initialState, {
// 	[getAllUsers.start]: state => ({ ...state, loading: true, error: null }),
// 	[getAllUsers.success]: (state, payload) => ({
// 		...state,
// 		data: payload,
// 		loading: false,
// 		error: null,
// 	}),
// 	[getAllUsers.error]: (state, payload) => ({ ...state, loading: false, error: payload }),
// })

export { getAllUsers }

export default allUsersReducer
