import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import cn from 'classnames'
import get from 'lodash/get'
import noop from 'lodash/noop'

import * as TempStorageModule from '../../modules/tempStorage'

import { ScrollActionContainer, SimpleButton } from '../../components'

import ThemedPlayerButton from '../ThemedPlayerButton'

import styles from './styles.module.scss'

const { HORIZONTAL_CONTAINER_TYPE, VERTICAL_CONTAINER_TYPE } = ScrollActionContainer
const defaultLimit = 100

class LoadContainer extends Component {
  isScrollExist = false

  isScrollLimit = noop

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    const { tempStorage } = this.props
    const id = get(tempStorage, 'id')
    if (!id) {
      this.getEntity()
    }
  }

  isAllItemsLoaded = () => {
    const { tempStorage } = this.props

    const tempStorageItems = get(tempStorage, 'items')
    const tempStorageTotalCount = get(tempStorage, 'totalCount')
    const tempStorageReturnedCount = get(tempStorage, 'returnedCount')

    if (tempStorageReturnedCount === 0) {
      return true
    }

    if (tempStorageTotalCount) {
      return tempStorageItems.length >= tempStorageTotalCount
    }

    return false
  }

  makeRequest = async () => {
    const {
      requestParams,
      requestAction,
      storageId,
      addItemsToTempStorage,
      requestData,
      tempStorage,
      onResponseDataAction,
    } = this.props

    const tempStoragePage = get(tempStorage, 'page') || 0
    const page = tempStoragePage + 1
    const limit = get(requestParams, 'limit') || defaultLimit
    const params = { ...requestParams, limit, offset: limit * tempStoragePage }

    const requestOptions = requestData ? { data: requestData, params } : { params }
    const response = await requestAction(requestOptions)
    const responseData = get(response, 'transformedData.items', [])
    const responseCount = get(response, 'transformedData.totalCount')
    const responseReturnedCount = get(response, 'transformedData.returnedCount')
    if (onResponseDataAction) {
      onResponseDataAction({
        storageId,
        responseData,
        responseCount,
        responseReturnedCount,
        query: params,
        page,
      })
      return
    }
    await addItemsToTempStorage({
      storageId,
      items: responseData,
      totalCount: responseCount,
      returnedCount: responseReturnedCount,
      query: params,
      page,
    })
  }

  getEntity = () => {
    this.setState({ isLoading: true }, async () => {
      const allItemsLoaded = this.isAllItemsLoaded()

      if (!allItemsLoaded) {
        await this.makeRequest()
      }

      this.setState({ isLoading: false })
    })
  }

  renderLoaderContainer = () => {
    const { type } = this.props
    if (type === HORIZONTAL_CONTAINER_TYPE) {
      return (
        <div className={styles.horizontalLoadingContainer}>
          <ThemedPlayerButton iconName="Spinner" className={styles.spinner} />
        </div>
      )
    }
    if (type === VERTICAL_CONTAINER_TYPE) {
      return (
        <div className={styles.verticalLoadingContainer}>
          <ThemedPlayerButton iconName="Spinner" className={styles.spinner} />
        </div>
      )
    }
    return null
  }

  handleScrollEnd = () => {
    const { isLoading } = this.state
    const { disableLoadOnScroll, disableAutoLoad } = this.props
    if (!disableLoadOnScroll && !isLoading && !disableAutoLoad) {
      this.getEntity()
    }
  }

  render() {
    const { isLoading } = this.state
    const { children, type, disableAutoLoad } = this.props
    const allItemsLoaded = this.isAllItemsLoaded()

    return (
      <div className={styles.loadContainerWrap}>
        {/* {isLoading && <div className={styles.loaderCap} />} */}
        <ScrollActionContainer type={type} onScrollEnd={this.handleScrollEnd}>
          {({ isScrollExist, isScrollLimit }) => {
            this.isScrollExist = isScrollExist
            this.isScrollLimit = isScrollLimit
            return (
              <div
                className={cn({
                  [styles.wrapHorizontal]: type === HORIZONTAL_CONTAINER_TYPE,
                  [styles.wrapVertical]: type === VERTICAL_CONTAINER_TYPE,
                })}
              >
                {children}
                {isLoading && this.renderLoaderContainer()}
                {!isScrollExist && !isLoading && !allItemsLoaded && !disableAutoLoad && (
                  <SimpleButton onClick={this.getEntity}>Load more</SimpleButton>
                )}
              </div>
            )
          }}
        </ScrollActionContainer>
      </div>
    )
  }
}

LoadContainer.propTypes = {
  disableLoadOnScroll: PropTypes.bool,
  disableAutoLoad: PropTypes.bool,
  type: PropTypes.oneOf([HORIZONTAL_CONTAINER_TYPE, VERTICAL_CONTAINER_TYPE]),
  children: PropTypes.any,
  storageId: PropTypes.string,
  requestData: PropTypes.any,
  requestParams: PropTypes.object,
  addItemsToTempStorage: PropTypes.func.isRequired,
  requestAction: PropTypes.func,
  tempStorage: PropTypes.object,
  onResponseDataAction: PropTypes.func,
}
LoadContainer.defaultProps = {
  disableLoadOnScroll: false,
  disableAutoLoad: false,
  type: VERTICAL_CONTAINER_TYPE,
  children: null,
  storageId: '',
  requestData: null,
  requestParams: {},
  requestAction: noop,
  tempStorage: {},
  onResponseDataAction: null,
}

const mapStateToProps = (state, props) => ({
  tempStorage: TempStorageModule.getTempStorageByIdSelector(state, props.storageId),
})

const mapDispatchToProps = (dispatch) => ({
  addItemsToTempStorage: bindActionCreators(TempStorageModule.addItemsToTempStorage, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoadContainer)
