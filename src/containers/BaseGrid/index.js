import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import get from 'lodash/get'
import noop from 'lodash/noop'

import * as GridModule from 'modules/grid'

import { Text } from 'components'

import styles from './styles.module.scss'

class BaseGrid extends Component {
  page = 0

  componentDidMount() {
    this.getEntity()

    window.addEventListener('scroll', this.handleWindowScroll)
  }

  componentWillUnmount() {
    const { clearGrid } = this.props
    window.removeEventListener('scroll', this.handleWindowScroll)
    clearGrid()
  }

  handleWindowScroll = () => {
    const { isLoading } = this.props
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
    if (
      (parseInt(scrollHeight - window.pageYOffset, 10) === document.documentElement.clientHeight ||
        parseInt(scrollHeight - window.pageYOffset, 10) ===
          document.documentElement.clientHeight - 1) &&
      !isLoading
    ) {
      this.getEntity()
    }
  }

  getEntity = async () => {
    const { customAction, entityAction, entityDataPatch, addItemsToGrid } = this.props

    const limit = 100
    const params = { limit, offset: limit * this.page }

    if (customAction) {
      await customAction(params)
      this.page += 1
      return
    }
    const response = await entityAction({ params })
    const topArtistsData = get(response, entityDataPatch, [])
    addItemsToGrid(topArtistsData)

    this.page += 1
  }

  render() {
    console.log('render BaseGrid')
    const { children, isLoading } = this.props

    return (
      <div className={styles.wrap}>
        <div className={styles.content}>{children}</div>
        {isLoading && (
          <div className={styles.loading}>
            <Text>Loading...</Text>
          </div>
        )}
      </div>
    )
  }
}

BaseGrid.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  entityDataPatch: PropTypes.string,
  addItemsToGrid: PropTypes.func.isRequired,
  clearGrid: PropTypes.func.isRequired,
  entityAction: PropTypes.func,
  customAction: PropTypes.func,
}
BaseGrid.defaultProps = {
  children: null,
  isLoading: false,
  entityDataPatch: null,
  entityAction: noop,
  customAction: null,
}

const mapDispatchToProps = dispatch => ({
  addItemsToGrid: bindActionCreators(GridModule.addItemsToGrid, dispatch),
  clearGrid: bindActionCreators(GridModule.clearGrid, dispatch),
})

export default connect(
  null,
  mapDispatchToProps
)(BaseGrid)
