import { createAction, createReducer, getServerUrl, getCurrentApi } from 'helpers'
import isNil from 'lodash/isNil'

const { authBackendUrl, refreshTokenBackendUrl } = getCurrentApi()

const authOptionsInitialState = {
  access_token: null,
  refresh_token: null,
  expiration_date: null,
}

export const authUser = createAction('AUTH_USER_REQUEST', {
  url: authBackendUrl,
  axiosOptions: {
    baseURL: getServerUrl(),
  },
})

export const refreshToken = createAction('REFRESH_TOKEN_REQUEST', {
  url: refreshTokenBackendUrl,
  axiosOptions: {
    baseURL: getServerUrl(),
  },
})

export const setAuthOptions = createAction('SET_AUTH_OPTIONS')
export const resetAuthOptions = createAction('RESET_AUTH_OPTIONS')

const authModule = {
  auth: createReducer(authUser),
  authOptions: createReducer(
    {},
    {
      initialState: authOptionsInitialState,
      customTypes: {
        [setAuthOptions.start]: (state, payload) => {
          return {
            ...state,
            access_token: payload.access_token || state.access_token,
            refresh_token: payload.refresh_token || state.refresh_token,
            expiration_date: payload.expiration_date || state.expiration_date,
          }
        },
        [resetAuthOptions.start]: state => {
          return {
            ...state,
            ...authOptionsInitialState,
          }
        },
      },
    }
  ),
}

export default authModule
