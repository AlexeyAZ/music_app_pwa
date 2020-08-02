import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as SearchModule from 'modules/search'

import { ArtistCard, Text } from 'components'

import AutoLoadContainer from '../../containers/AutoLoadContainer'
import TracksGrid from '../../containers/TracksGrid'

class Search extends Component {
  state = {
    value: '',
    searchValue: null,
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ value })
  }

  handleSearchButtonClick = () => {
    const { value, searchValue } = this.state
    this.setState({ searchValue: null }, () => this.setState({ searchValue: value }))
  }

  render() {
    console.log('Render search')
    const { value, searchValue } = this.state
    const { searchContent } = this.props
    return (
      <div>
        <Text>Search</Text>
        <input value={value} onChange={this.handleInputChange} />
        <button onClick={this.handleSearchButtonClick}>Search</button>
        {searchValue && (
          <TracksGrid
            getTracksAction={searchContent}
            customParams={{ query: searchValue, per_type_limit: 10 }}
            storageId="searchTracks"
            dataPath="data.search.data.tracks"
            countPatch="data.meta.totalCount"
          />
        )}
      </div>
    )
  }
}

Search.propTypes = {
  searchContent: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  searchContent: bindActionCreators(SearchModule.searchContent, dispatch),
})

export default connect(
  null,
  mapDispatchToProps
)(Search)
