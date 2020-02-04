import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router'
import get from 'lodash/get'
import moment from 'moment'

import * as AuthUserModule from 'modules/auth'
import * as ModalModule from 'modules/modal'

import { withPlayer } from 'hocs'
import { AUTH, AVAILABLE_API } from 'constants'
import { localStore } from 'config'
import { axiosInstance, getCurrentApi } from 'helpers'

const PAGE_AFTER_LOGIN = '/tracks'
const REDIRECT_URI = 'http://localhost:3000'

const { authUrl, clientId, apiName } = getCurrentApi()

class AppContainer extends Component {
  async componentDidMount() {
    const { initPlayer, history } = this.props
    const authActionSuccess = await this.getAuthAction()
    if (authActionSuccess) {
      initPlayer()
      history.replace(PAGE_AFTER_LOGIN)
      return
    }

    if (apiName === AVAILABLE_API.NAPSTER) {
      window.open(
        `${authUrl}/oauth/authorize?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=code`,
        '_self'
      )
    }
    if (apiName === AVAILABLE_API.SPOTIFY) {
      const scopes = 'user-read-private user-read-email'
      window.open(
        `${authUrl}/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
          REDIRECT_URI
        )}&response_type=code&scope=${encodeURIComponent(scopes)}`,
        '_self'
      )
    }
  }

  getAuthAction = async () => {
    const { authUser, authOptions: { access_token, refresh_token, expiration_date }, setAuthOptions, refreshToken, location: { search } } = this.props
    // const access_token = localStore.getItem(AUTH.ACCESS_TOKEN_NAME)
    // const refresh_token = localStore.getItem(AUTH.REFRESH_TOKEN_NAME)
    // const expiration_date = localStore.getItem(AUTH.EXPIRATION_DATE_NAME)
    if (search.includes('code')) {
      const code = search.split('code=')[1]
      const authResponse = await authUser({ params: { code } })
      await this.saveTokensToStorage(authResponse)
      return 'Logged'
    }
    if (Number(expiration_date) && +moment(Number(expiration_date)) < +moment()) {
      const refreshTokenResponse = await refreshToken({ params: { refresh_token } })
      await this.saveTokensToStorage(refreshTokenResponse)
      return 'Refresh token'
    }
    if (access_token && refresh_token && expiration_date) {
      await setAuthOptions({ access_token, refresh_token, expiration_date })
      await this.setAuthorizationHeader(access_token)
      return 'Already logged'
    }
    return false
  }

  setAuthorizationHeader = async token => {
    const { setAuthOptions } = this.props
    axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`
    await setAuthOptions({ loading: false })
  }

  saveTokensToStorage = async response => {
    console.log('saveTokensToStorage')
    const { setAuthOptions } = this.props
    const access_token = get(response, 'data.access_token')
    const refresh_token = get(response, 'data.refresh_token')
    const expires_in = get(response, 'data.expires_in')
    const expiration_date = String(+moment().add(expires_in, 's'))
    // localStore.setItem(AUTH.ACCESS_TOKEN_NAME, access_token)
    // localStore.setItem(AUTH.REFRESH_TOKEN_NAME, refresh_token)
    // localStore.setItem(AUTH.EXPIRATION_DATE_NAME, expiration_date)
    await setAuthOptions({ access_token, refresh_token, expiration_date })
    await this.setAuthorizationHeader(access_token)
    return true
  }

  render() {
    const { children, authOptions: { loading } } = this.props
    if (loading) {
      return <div />
    }
    return (
      <div>
        {children}
      </div>
    )
  }
}

AppContainer.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  authOptions: PropTypes.object.isRequired,
  authUser: PropTypes.func.isRequired,
  setAuthOptions: PropTypes.func.isRequired,
  refreshToken: PropTypes.func.isRequired,
  initPlayer: PropTypes.func.isRequired,
}
AppContainer.defaultProps = {
  children: null,
}

const mapStateToProps = ({ auth, authOptions }) => ({ auth, authOptions })

const mapDispatchToProps = dispatch => ({
  authUser: bindActionCreators(AuthUserModule.authUser, dispatch),
  setAuthOptions: bindActionCreators(AuthUserModule.setAuthOptions, dispatch),
  refreshToken: bindActionCreators(AuthUserModule.refreshToken, dispatch),
  openModal: bindActionCreators(ModalModule.openModal, dispatch),
  closeModal: bindActionCreators(ModalModule.closeModal, dispatch),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withPlayer,
)(AppContainer)