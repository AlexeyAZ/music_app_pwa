import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

import { HorizontalNavbar, Box } from 'components'

import * as TracksModule from 'modules/tracks'
import * as ThemesModule from 'modules/themes'

import PlayButton from '../../containers/PlayButton'

const navbarData = [
  {
    title: 'Playlists',
    key: 'playlists',
  },
  {
    title: 'Artists',
    key: 'artists',
  },
  {
    title: 'Albums',
    key: 'albums',
  },
  {
    title: 'Tracks',
    key: 'tracks',
  },
]

class Library extends Component {
  componentDidMount() {
    const { getTopTracks } = this.props

    getTopTracks()
  }

  handleNavbarItemClick = key => {
    const { history, match } = this.props
    history.push(`${match.path}/${key}`)
  }

  render() {
    const { topTracks, route, location } = this.props
    const topTracksData = get(topTracks, 'data.tracks', [])
    const navbarValue = location.pathname.split('/')[2]
    return (
      <Box pt={30}>
        <Box bg="white" position="fixed" top={50} left={0} width="100%" height={30}>
          <HorizontalNavbar
            value={navbarValue}
            data={navbarData}
            onItemClick={this.handleNavbarItemClick}
          />
        </Box>
        {renderRoutes(route.routes)}
        {topTracksData.map(track => {
          return (
            <div key={track.id}>
              <PlayButton id={track.id} />
              {track.name}:{track.playbackSeconds}
            </div>
          )
        })}
      </Box>
    )
  }
}

Library.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
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
  changeTheme: bindActionCreators(ThemesModule.changeTheme, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Library)
