import { createAction, createReducer, getServerUrl, getCurrentApi } from 'helpers'
import isNil from 'lodash/isNil'

const { authBackendUrl, refreshTokenBackendUrl } = getCurrentApi()

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

const authModule = {
  auth: createReducer(authUser),
  authOptions: createReducer(setAuthOptions, {
    initialState: {
      access_token: null,
      refresh_token: null,
      loading: true,
    },
    customTypes: {
      [setAuthOptions.start]: (state, payload) => {
        return {
          ...state,
          access_token: payload.access_token || state.access_token,
          refresh_token: payload.refresh_token || state.refresh_token,
          expiration_date: payload.expiration_date || state.expiration_date,
          loading: isNil(payload.loading) ? state.loading : payload.loading,
        }
      },
    },
  }),
}

export default authModule
