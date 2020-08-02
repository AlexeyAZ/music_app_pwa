import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import * as AlbumsModule from 'modules/albums'

import { Image, Row } from 'components'

import TracksGrid from '../../containers/TracksGrid'

class Album extends Component {
  render() {
    const { match, getAlbumTracks } = this.props
    const id = get(match, 'params.id')

    return (
      <div>
        <Row>
          <Image type="album" size="xl" id={id} imageRatio={0.9} />
          <TracksGrid
            disableAutoload
            getTracksAction={getAlbumTracks}
            data={id}
            storageId="albumTracks"
            dataPath="data.tracks"
          />
        </Row>
      </div>
    )
  }
}

Album.propTypes = {
  match: PropTypes.object.isRequired,
  getAlbumTracks: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  getAlbumTracks: bindActionCreators(AlbumsModule.getAlbumTracks, dispatch),
})

export default connect(
  null,
  mapDispatchToProps
)(Album)
