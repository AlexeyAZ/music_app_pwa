import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as SearchModule from '../../modules/search'
import * as TempStorageModule from '../../modules/tempStorage'

import { Text } from '../../components'

import { TracksGrid } from '../../containers'

const SEARCH_STORAGE_ID = 'searchStorageId'

class Search extends Component {
  state = {
    value: '',
    searchValue: null,
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ value })
  }

  handleSearchButtonClick = async () => {
    const { value } = this.state
    const { clearTempStorage } = this.props
    await clearTempStorage(SEARCH_STORAGE_ID)
    this.setState({ searchValue: null }, () => this.setState({ searchValue: value }))
  }

  render() {
    const { value, searchValue } = this.state
    const { searchContent } = this.props
    return (
      <form>
        <Text>Search</Text>
        <input value={value} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleSearchButtonClick}>
          Search
        </button>
        {searchValue && (
          <TracksGrid
            getTracksAction={searchContent}
            requestParams={{ query: searchValue, per_type_limit: 50, limit: 50, type: 'track' }}
            storageId={SEARCH_STORAGE_ID}
          />
        )}
      </form>
    )
  }
}

Search.propTypes = {
  searchContent: PropTypes.func.isRequired,
  clearTempStorage: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  searchContent: bindActionCreators(SearchModule.searchContent, dispatch),
  clearTempStorage: bindActionCreators(TempStorageModule.clearTempStorage, dispatch),
})

export default connect(null, mapDispatchToProps)(Search)
