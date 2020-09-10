import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cn from 'classnames'
import get from 'lodash/get'
import noop from 'lodash/noop'

import * as TempStorageModule from '../../modules/tempStorage'

import { ScrollActionContainer, SimpleButton } from '../../components'
import { getEntityDataPath } from '../../helpers'

import ThemedPlayerButton from '../ThemedPlayerButton'

import styles from './styles.module.scss'

const { HORIZONTAL_CONTAINER_TYPE, VERTICAL_CONTAINER_TYPE } = ScrollActionContainer
const defaultLimit = 100

class LoadContainer extends Component {
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
    return this.setState({ isLoading: false })
  }

  getEntity = () => {
    const { isLoading } = this.state
    const {
      requestParams,
      customAction,
      entityAction,
      storageId,
      disableAutoLoad,
      entityDataPatch,
      entityCountPatch,
      addItemsToTempStorage,
      requestData,
    } = this.props

    if (!isLoading && !disableAutoLoad) {
      this.setState({ isLoading: true }, async () => {
        const limit = get(requestParams, 'limit') || defaultLimit
        const params = { ...requestParams, limit, offset: limit * this.page }

        if (customAction) {
          await customAction(params)
          return this.increasePageNumber()
        }
        const requestOptions = requestData ? { data: requestData, params } : { params }
        const response = await entityAction(requestOptions)
        const dataPath = entityDataPatch || `data.${getEntityDataPath(response.data)}`
        const entityData = get(response, dataPath, [])
        const entityCount = get(response, entityCountPatch)
        await addItemsToTempStorage({ storageId, items: entityData, totalCount: entityCount })
        return this.increasePageNumber()
      })
    }
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
    const { disableLoadOnScroll } = this.props
    if (!disableLoadOnScroll) {
      this.getEntity()
    }
  }

  render() {
    const { isLoading } = this.state
    const { children, type } = this.props

    return (
      <div className={styles.loadContainerWrap}>
        {isLoading && <div className={styles.loaderCap} />}
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
                {/* {isLoading && this.renderLoaderContainer()} */}
                {!isScrollExist && !isLoading && (
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
  type: PropTypes.oneOf([HORIZONTAL_CONTAINER_TYPE, VERTICAL_CONTAINER_TYPE]),
  children: PropTypes.any,
  entityDataPatch: PropTypes.string,
  entityCountPatch: PropTypes.string,
  storageId: PropTypes.string,
  disableAutoLoad: PropTypes.bool,
  requestData: PropTypes.any,
  requestParams: PropTypes.object,
  addItemsToTempStorage: PropTypes.func.isRequired,
  entityAction: PropTypes.func,
  customAction: PropTypes.func,
}
LoadContainer.defaultProps = {
  disableLoadOnScroll: false,
  type: VERTICAL_CONTAINER_TYPE,
  children: null,
  entityDataPatch: null,
  entityCountPatch: null,
  storageId: '',
  disableAutoLoad: false,
  requestData: null,
  requestParams: {},
  entityAction: noop,
  customAction: null,
}

const mapDispatchToProps = (dispatch) => ({
  addItemsToTempStorage: bindActionCreators(TempStorageModule.addItemsToTempStorage, dispatch),
})

export default connect(null, mapDispatchToProps)(LoadContainer)
