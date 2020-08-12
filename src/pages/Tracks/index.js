import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as TracksModule from 'modules/tracks'

import { Text } from 'components'

import TracksGrid from '../../containers/TracksGrid'

// eslint-disable-next-line react/prefer-stateless-function
class Tracks extends Component {
  render() {
    const { getTopTracks } = this.props
    return (
      <div>
        <Text>Top artists</Text>
        <TracksGrid getTracksAction={getTopTracks} gridId="tracks" />
      </div>
    )
  }
}

Tracks.propTypes = {
  getTopTracks: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  getTopTracks: bindActionCreators(TracksModule.getTopTracks, dispatch),
})

export default connect(
  null,
  mapDispatchToProps
)(Tracks)
