import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'

import { getTracks } from 'helpers'

import * as FavoritesModule from 'modules/favorites'

import TrackRow from '../../../containers/TrackRow'

class Favorites extends Component {
  componentDidMount() {
    this.getFavoriteTracks()
  }

  getFavoriteTracks = () => {
    const { getMyFavorites } = this.props
    getTracks(getMyFavorites, 'data.favorites.data.tracks', { limit: 20 })
  }

  handleFavoriteButtonClick = () => {
    const { generalFavorites } = this.props
    console.log(generalFavorites)
  }

  render() {
    const { myFavorites } = this.props
    const favoritesTracks = get(myFavorites, 'data.favorites.data.tracks', [])
    return (
      <div>
        {favoritesTracks.map(track => {
          return (
            <TrackRow
              key={track.id}
              track={track}
              onFavoriteButtonClick={this.handleFavoriteButtonClick}
            />
          )
        })}
      </div>
    )
  }
}

Favorites.propTypes = {
  myFavorites: PropTypes.object.isRequired,
  getMyFavorites: PropTypes.func.isRequired,
}

const mapStateToProps = ({ myFavorites, generalFavorites }) => ({
  myFavorites,
  generalFavorites,
})

const mapDispatchToProps = dispatch => ({
  getMyFavorites: bindActionCreators(FavoritesModule.getMyFavorites, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
