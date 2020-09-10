import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'

import * as GridModule from '../../modules/grid'
import * as ArtistsModule from '../../modules/artists'

import { Text } from '../../components'

import LoadContainer from '../../containers/LoadContainer'

// eslint-disable-next-line react/prefer-stateless-function
class Artists extends Component {
  getTopArtists = async (params) => {
    const { getTopArtists, addItemsToGrid } = this.props
    const response = await getTopArtists({ params })
    const topArtistsData = get(response, 'data.artists', [])
    addItemsToGrid(topArtistsData)
  }

  render() {
    const {
      topArtists: { loading },
    } = this.props
    return (
      <div>
        <Text>Top artists</Text>
        <LoadContainer isLoading={loading} customAction={this.getTopArtists} />
      </div>
    )
  }
}

Artists.propTypes = {
  topArtists: PropTypes.object.isRequired,
  addItemsToGrid: PropTypes.func.isRequired,
  getTopArtists: PropTypes.func.isRequired,
}

const mapStateToProps = ({ gridItems, topArtists }) => ({
  gridItems,
  topArtists,
})

const mapDispatchToProps = (dispatch) => ({
  addItemsToGrid: bindActionCreators(GridModule.addItemsToGrid, dispatch),
  getTopArtists: bindActionCreators(ArtistsModule.getTopArtists, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(Artists)
