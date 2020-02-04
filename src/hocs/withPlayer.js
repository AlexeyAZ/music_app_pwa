import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { Player } from 'config'
import { getCurrentApi } from 'helpers'

import * as PlayerModule from 'modules/player'

const { clientId } = getCurrentApi()

const withPlayer = WrappedComponent => {
  class WithPlayerHOC extends Component {
    initPlayer = () => {
      const { authOptions, updatePlayerStatus } = this.props
      Player.init({
        consumerKey: clientId,
        isHTML5Compatible: true
      })
      Player.player.on('ready', async () => {
        await updatePlayerStatus({ loaded: true })
        console.log('Player ready')
        Player.member.set({
          accessToken: authOptions.access_token,
          refreshToken: authOptions.refresh_token
        })
      })
    }

    render() {
      return (
        <WrappedComponent
          initPlayer={this.initPlayer}
          {...this.props}
        />
      )
    }
  }

  WithPlayerHOC.propTypes = {
    authOptions: PropTypes.object.isRequired,
    updatePlayerStatus: PropTypes.func.isRequired,
  }

  const mapStateToProps = ({ authOptions }) => ({
    authOptions,
  })

  const mapDispatchToProps = dispatch => ({
    updatePlayerStatus: bindActionCreators(PlayerModule.updatePlayerStatus, dispatch),
  })

  return compose(connect(mapStateToProps, mapDispatchToProps))(WithPlayerHOC)
}

export default withPlayer
