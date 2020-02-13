import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'
import noop from 'lodash/noop'

import * as favoritesModule from 'modules/favorites'

import ThemedPlayerButton from '../ThemedPlayerButton'

class FavoriteButton extends Component {
  shouldComponentUpdate(nextProps) {
    const { generalFavorites: generalFavoritesNext } = nextProps
    const { generalFavorites, trackId } = this.props
    return generalFavoritesNext.includes(trackId) !== generalFavorites.includes(trackId)
  }

  addTrackToFavorites = async id => {
    const { addToFavorites, addToGeneralFavorites } = this.props
    const addToFavoritesResponse = await addToFavorites({
      reqData: { favorites: [{ id }] },
    })

    const favoritesData = get(addToFavoritesResponse, 'data.favorites[0]')
    const favoritesItem = favoritesData.acknowledged === true ? [favoritesData.id] : []

    await addToGeneralFavorites(favoritesItem)
  }

  removeTrackFromFavorites = async id => {
    const { removeFromFavorites, removeFromGeneralFavorites } = this.props
    const removeFromFavoritesResponse = await removeFromFavorites({
      data: id,
    })

    const favoritesData = get(removeFromFavoritesResponse, 'data.favorites[0]')
    const favoritesItem = favoritesData.acknowledged === true ? [favoritesData.id] : []

    await removeFromGeneralFavorites(favoritesItem)
  }

  handleFavoriteButtonClick = async isFavorite => {
    const { trackId, onFavoriteButtonClick } = this.props
    if (isFavorite) {
      await this.removeTrackFromFavorites(trackId)
      return onFavoriteButtonClick()
    }
    await this.addTrackToFavorites(trackId)
    return onFavoriteButtonClick()
  }

  render() {
    console.log('render FavoriteButton')
    const { generalFavorites, trackId, iconSize } = this.props
    const isFavorite = generalFavorites.includes(trackId)
    return (
      <ThemedPlayerButton
        iconSize={iconSize}
        iconColor={isFavorite ? 'black' : 'disabled'}
        onClick={() => this.handleFavoriteButtonClick(isFavorite)}
        iconName="Favorite"
      />
    )
  }
}

FavoriteButton.propTypes = {
  iconSize: PropTypes.string,
  trackId: PropTypes.string.isRequired,
  generalFavorites: PropTypes.array.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  removeFromGeneralFavorites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  addToGeneralFavorites: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func,
}
FavoriteButton.defaultProps = {
  iconSize: 's',
  onFavoriteButtonClick: noop,
}

const mapStateToProps = ({ generalFavorites }) => ({
  generalFavorites,
})
const mapDispatchToProps = dispatch => ({
  addToFavorites: bindActionCreators(favoritesModule.addToFavorites, dispatch),
  addToGeneralFavorites: bindActionCreators(favoritesModule.addToGeneralFavorites, dispatch),
  removeFromFavorites: bindActionCreators(favoritesModule.removeFromFavorites, dispatch),
  removeFromGeneralFavorites: bindActionCreators(
    favoritesModule.removeFromGeneralFavorites,
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteButton)
