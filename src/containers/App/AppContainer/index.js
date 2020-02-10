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
import { axiosInstance } from 'helpers'

const PAGE_AFTER_LOGIN = '/library/playlists'

class AppContainer extends Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    const { initPlayer, history } = this.props
    const authActionSuccess = await this.getAuthAction()
    if (authActionSuccess) {
      initPlayer()
      // history.replace(PAGE_AFTER_LOGIN) TODO
      return
    }

    this.setState({ loading: false })
    history.push('/login')
  }

  getAuthAction = async () => {
    const {
      authUser,
      authOptions: { refresh_token },
      refreshToken,
      location: { search },
    } = this.props

    if (search.includes('code')) {
      const code = search.split('code=')[1]
      const authResponse = await authUser({ params: { code } })
      await this.saveTokensToStorage(authResponse)
      return 'Logged'
    }

    if (refresh_token) {
      const refreshTokenResponse = await refreshToken({ params: { refresh_token } })
      await this.saveTokensToStorage(refreshTokenResponse)
      return 'Token refreshed'
    }
    return false
  }

  setAuthorizationHeader = async token => {
    axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`
    this.setState({ loading: false })
  }

  saveTokensToStorage = async response => {
    console.log('AppContainer: saveTokensToStorage')
    const { setAuthOptions } = this.props
    const access_token = get(response, 'data.access_token')
    const refresh_token = get(response, 'data.refresh_token')
    const expires_in = get(response, 'data.expires_in')
    const expiration_date = String(+moment().add(expires_in, 's'))
    await setAuthOptions({ access_token, refresh_token, expiration_date })
    await this.setAuthorizationHeader(access_token)
    return true
  }

  render() {
    const { loading } = this.state
    const { children } = this.props
    if (loading) {
      return <div />
    }
    return <div>{children}</div>
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withPlayer
)(AppContainer)
