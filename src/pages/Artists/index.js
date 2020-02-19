import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'

import * as GridModule from 'modules/grid'
import * as ArtistsModule from 'modules/artists'

import { ArtistCard, Text } from 'components'

import BaseGrid from '../../containers/BaseGrid'

// eslint-disable-next-line react/prefer-stateless-function
class Artists extends Component {
  getTopArtists = async params => {
    const { getTopArtists, addItemsToGrid } = this.props
    const response = await getTopArtists({ params })
    const topArtistsData = get(response, 'data.artists', [])
    addItemsToGrid(topArtistsData)
  }

  render() {
    const {
      gridItems: { data: gridItemsData },
      topArtists: { loading },
    } = this.props
    return (
      <div>
        <Text>Top artists</Text>
        <BaseGrid isLoading={loading} customAction={this.getTopArtists}>
          {gridItemsData.map(({ id, name }) => {
            return <ArtistCard id={id} key={id} name={name} />
          })}
        </BaseGrid>
      </div>
    )
  }
}

Artists.propTypes = {
  gridItems: PropTypes.object.isRequired,
  topArtists: PropTypes.object.isRequired,
  addItemsToGrid: PropTypes.func.isRequired,
  getTopArtists: PropTypes.func.isRequired,
}

const mapStateToProps = ({ gridItems, topArtists }) => ({
  gridItems,
  topArtists,
})

const mapDispatchToProps = dispatch => ({
  addItemsToGrid: bindActionCreators(GridModule.addItemsToGrid, dispatch),
  getTopArtists: bindActionCreators(ArtistsModule.getTopArtists, dispatch),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Artists)
