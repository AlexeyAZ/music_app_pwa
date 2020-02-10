import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

import * as TracksModule from 'modules/tracks'

import PlayButton from '../../containers/PlayButton'

import styles from './styles.module.scss'

class Library extends Component {
  componentDidMount() {
    const { getTopTracks } = this.props
    // getTopTracks()
  }

  handleNavbarItemClick = key => {
    const { history, match } = this.props
    history.push(`${match.path}/${key}`)
  }

  render() {
    const { topTracks, route } = this.props
    const topTracksData = get(topTracks, 'data.tracks', [])
    return (
      <div className={styles.wrap}>
        {renderRoutes(route.routes)}
        {topTracksData.map(track => {
          return (
            <div key={track.id}>
              <PlayButton id={track.id} />
              {track.name}:{track.playbackSeconds}
            </div>
          )
        })}
      </div>
    )
  }
}

Library.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  topTracks: PropTypes.object.isRequired,
  getTopTracks: PropTypes.func.isRequired,
}

const mapStateToProps = ({ topTracks, player, authOptions }) => ({
  topTracks,
  player,
  authOptions,
})

const mapDispatchToProps = dispatch => ({
  getTopTracks: bindActionCreators(TracksModule.getTopTracks, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Library)
