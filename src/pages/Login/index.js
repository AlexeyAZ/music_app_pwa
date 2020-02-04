import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import get from 'lodash/get'
import moment from 'moment'

import * as AuthUserModule from 'modules/auth'
import * as ModalModule from 'modules/modal'

import { Button }from 'components'
import { AUTH, AVAILABLE_API } from 'constants'
import { localStore } from 'config'
import { axiosInstance, getCurrentApi } from 'helpers'

import logo from './logo.svg'

const PAGE_AFTER_LOGIN = '/Genres'

const { authUrl, baseUrl, clientId, apiName } = getCurrentApi()

class Login extends Component {
  // async componentDidMount() {
  //   const { authUser, setAuthTokens, refreshToken, history, location: { search } } = this.props
  //   const access_token = localStore.getItem(AUTH.ACCESS_TOKEN_NAME)
  //   const refresh_token = localStore.getItem(AUTH.REFRESH_TOKEN_NAME)
  //   const expiration_date = localStore.getItem(AUTH.EXPIRATION_DATE_NAME)
  //   if (search.includes('code')) {
  //     const code = search.split('code=')[1]
  //     const authResponse = await authUser({ params: { code } })
  //     await this.saveTokensToStorage(authResponse)
  //     console.log('Logged')
  //     history.replace(PAGE_AFTER_LOGIN)
  //     return
  //   }
  //   if (Number(expiration_date) && +moment(Number(expiration_date)) < +moment()) {
  //     const refreshTokenResponse = await refreshToken({ params: { refresh_token } })
  //     await this.saveTokensToStorage(refreshTokenResponse)
  //     console.log('Logged with refresh token')
  //     history.replace(PAGE_AFTER_LOGIN)
  //     return
  //   }
  //   if (access_token && refresh_token) {
  //     await setAuthTokens({ access_token, refresh_token })
  //     await this.setAuthorizationHeader(access_token)
  //     console.log('Already logged')
  //     history.replace(PAGE_AFTER_LOGIN)
  //     return
  //   }
  //   if (apiName === AVAILABLE_API.NAPSTER) {
  //     window.open(
  //       `${authUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/login&response_type=code`,
  //       '_self'
  //     )
  //     return
  //   }
  //   if (apiName === AVAILABLE_API.SPOTIFY) {
  //     const scopes = 'user-read-private user-read-email'
  //     const redirectUri = 'http://localhost:3000/login'
  //     window.open(
  //       `${authUrl}/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //         redirectUri
  //       )}&response_type=code&scope=${encodeURIComponent(scopes)}`,
  //       '_self'
  //     )
  //   }
  // }

  setAuthorizationHeader = async token => {
    return new Promise(resolve => {
      axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`
      resolve()
    })
  }

  saveTokensToStorage = async response => {
    console.log('saveTokensToStorage')
    const { setAuthOptions } = this.props
    const access_token = get(response, 'data.access_token')
    const refresh_token = get(response, 'data.refresh_token')
    const expires_in = get(response, 'data.expires_in')
    const expiration_date = String(+moment().add(expires_in, 's'))
    localStore.setItem(AUTH.ACCESS_TOKEN_NAME, access_token)
    localStore.setItem(AUTH.REFRESH_TOKEN_NAME, refresh_token)
    localStore.setItem(AUTH.EXPIRATION_DATE_NAME, expiration_date)
    await setAuthOptions({ access_token, refresh_token, expiration_date })
    await this.setAuthorizationHeader(access_token)
    return true
  }

  handleLoginButtonClick = () => {
    if (apiName === AVAILABLE_API.NAPSTER) {
      return window.open(`${authUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/login&response_type=code`, '_self')
    }
    if (apiName === AVAILABLE_API.SPOTIFY) {
      const scopes = 'user-read-private user-read-email'
      const redirectUri = 'http://localhost:3000/login'
      return window.open(`${authUrl}/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes)}`, '_self')
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Button onClick={this.handleLoginButtonClick}>
            Login
          </Button>
        </header>
      </div>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  authUser: PropTypes.func.isRequired,
  setAuthOptions: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired,
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => ({
  authUser: bindActionCreators(AuthUserModule.authUser, dispatch),
  setAuthOptions: bindActionCreators(AuthUserModule.setAuthOptions, dispatch),
  refreshToken: bindActionCreators(AuthUserModule.refreshToken, dispatch),
  openModal: bindActionCreators(ModalModule.openModal, dispatch),
  closeModal: bindActionCreators(ModalModule.closeModal, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Login)