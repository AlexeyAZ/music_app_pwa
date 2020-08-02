import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cn from 'classnames'
import get from 'lodash/get'
import noop from 'lodash/noop'

import * as TempStorageModule from 'modules/tempStorage'

import { ScrollActionContainer, SimpleButton } from 'components'

import ThemedPlayerButton from '../ThemedPlayerButton'

import styles from './styles.module.scss'

const { horizontalContainerType, verticalContainerType } = ScrollActionContainer
const defaultLimit = 100

class AutoLoadContainer extends Component {
  page = 0

  isScrollExist = false

  isScrollLimit = noop

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    this.getEntity()
  }

  increasePageNumber = () => {
    this.page += 1
    return this.setState({ isLoading: false }, () => {
      if (this.isScrollLimit() && this.isScrollExist) {
        return this.getEntity()
      }
      return null
    })
  }

  getEntity = () => {
    const { isLoading } = this.state
    const {
      customParams,
      customAction,
      entityAction,
      storageId,
      disableAutoLoad,
      entityDataPatch,
      entityCountPatch,
      addItemsToTempStorage,
    } = this.props

    if (!isLoading && !disableAutoLoad) {
      this.setState({ isLoading: true }, async () => {
        const limit = get(customParams, 'limit') || defaultLimit
        const params = { limit, offset: limit * this.page }

        if (customAction) {
          await customAction(params)
          return this.increasePageNumber()
        }
        const response = await entityAction({ params })
        const entityData = get(response, entityDataPatch, [])
        const entityCount = get(response, entityCountPatch, [])
        await addItemsToTempStorage({ storageId, items: entityData, itemsCount: entityCount })
        return this.increasePageNumber()
      })
    }
  }

  renderLoaderContainer = () => {
    const { type } = this.props
    if (type === horizontalContainerType) {
      return (
        <div className={styles.horizontalLoadingContainer}>
          <ThemedPlayerButton iconName="Spinner" className={styles.spinner} />
        </div>
      )
    }
    if (type === verticalContainerType) {
      return (
        <div className={styles.verticalLoadingContainer}>
          <ThemedPlayerButton iconName="Spinner" className={styles.spinner} />
        </div>
      )
    }
    return null
  }

  render() {
    console.log('render AutoLoadContainer')
    const { isLoading } = this.state
    const { children, type } = this.props

    return (
      <ScrollActionContainer type={type} onScrollEnd={this.getEntity}>
        {({ isScrollExist, isScrollLimit }) => {
          this.isScrollExist = isScrollExist
          this.isScrollLimit = isScrollLimit
          return (
            <div
              className={cn({
                [styles.wrapHorizontal]: type === horizontalContainerType,
                [styles.wrapVertical]: type === verticalContainerType,
              })}
            >
              {children}
              {isLoading && this.renderLoaderContainer()}
              {!isScrollExist && !isLoading && (
                <SimpleButton onClick={this.getEntity}>Load more</SimpleButton>
              )}
            </div>
          )
        }}
      </ScrollActionContainer>
    )
  }
}

AutoLoadContainer.propTypes = {
  type: PropTypes.oneOf([horizontalContainerType, verticalContainerType]),
  children: PropTypes.any,
  entityDataPatch: PropTypes.string,
  entityCountPatch: PropTypes.string,
  storageId: PropTypes.string,
  disableAutoLoad: PropTypes.bool,
  customParams: PropTypes.object,
  addItemsToTempStorage: PropTypes.func.isRequired,
  entityAction: PropTypes.func,
  customAction: PropTypes.func,
}
AutoLoadContainer.defaultProps = {
  type: verticalContainerType,
  children: null,
  entityDataPatch: null,
  entityCountPatch: null,
  storageId: '',
  disableAutoLoad: false,
  customParams: {},
  entityAction: noop,
  customAction: null,
}

const mapDispatchToProps = dispatch => ({
  addItemsToTempStorage: bindActionCreators(TempStorageModule.addItemsToTempStorage, dispatch),
})

export default connect(
  null,
  mapDispatchToProps
)(AutoLoadContainer)
