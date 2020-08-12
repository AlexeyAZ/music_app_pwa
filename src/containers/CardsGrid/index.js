import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as TempStorageModule from '../../modules/tempStorage'

import { CommonCard, Grid, Container } from '../../components'

import LoadContainer from '../LoadContainerNew'

import styles from './styles.module.scss'

const { getTempStorageItemsByIdSelector } = TempStorageModule

const CardsGrid = ({
  cardType,
  cardImageType,
  cardSubtitleKey,
  cardBorderRadius,
  cardImageRatio,
  containerScrollType,
  gridDirection,
  storageId,
  requestAction,
  requestParams,
  requestData,
  disableAutoLoad,
  disableLoadOnScroll,
  onCardClick,
}) => {
  const tempStorageItems = useSelector(state => getTempStorageItemsByIdSelector(state, storageId))

  // const dispatch = useDispatch()
  // const clearTempStorage = useMemo(
  //   () => bindActionCreators(TempStorageModule.clearTempStorage, dispatch),
  //   [dispatch]
  // )

  // useEffect(() => {
  //   return () => {
  //     if (disableAutoLoad) {
  //       clearTempStorage(storageId)
  //     }
  //   }
  // }, [])

  const renderGrid = useCallback(() => {
    return (
      <Grid direction={gridDirection}>
        {tempStorageItems.map(item => {
          const subtitle = cardSubtitleKey ? item[cardSubtitleKey] : null
          return (
            <CommonCard
              type={cardType}
              borderRadius={cardBorderRadius}
              imageRatio={cardImageRatio}
              imageType={cardImageType}
              key={item.id}
              title={item.name}
              subtitle={subtitle}
              id={item.id}
              onClick={() => onCardClick(item.id)}
            />
          )
        })}
      </Grid>
    )
  }, [tempStorageItems])

  const renderContent = useCallback(() => {
    if (containerScrollType === 'horizontal') {
      return <Container>{renderGrid()}</Container>
    }
    if (containerScrollType === 'vertical') {
      return renderGrid()
    }
    return null
  }, [containerScrollType, tempStorageItems])

  return (
    <div>
      <LoadContainer
        type={containerScrollType}
        storageId={storageId}
        requestAction={requestAction}
        requestParams={requestParams}
        requestData={requestData}
        disableAutoLoad={disableAutoLoad}
        disableLoadOnScroll={disableLoadOnScroll}
      >
        {renderContent()}
      </LoadContainer>
    </div>
  )
}

CardsGrid.propTypes = {
  cardType: CommonCard.propTypes.type,
  cardImageType: PropTypes.string,
  cardSubtitleKey: PropTypes.string,
  cardBorderRadius: CommonCard.propTypes.borderRadius,
  cardImageRatio: PropTypes.number,
  containerScrollType: PropTypes.oneOf(['vertical', 'horizontal']),
  gridDirection: PropTypes.oneOf(['vertical', 'horizontal']),
  requestAction: PropTypes.func.isRequired,
  storageId: PropTypes.string.isRequired,
  requestData: PropTypes.any,
  requestParams: PropTypes.object,
  disableAutoLoad: PropTypes.bool,
  disableLoadOnScroll: PropTypes.bool,
  onCardClick: PropTypes.func,
}
CardsGrid.defaultProps = {
  cardType: null,
  cardImageType: null,
  cardSubtitleKey: null,
  cardBorderRadius: CommonCard.defaultProps.borderRadius,
  cardImageRatio: 0.8,
  containerScrollType: 'vertical',
  gridDirection: 'vertical',
  requestData: null,
  requestParams: {},
  disableAutoLoad: false,
  disableLoadOnScroll: false,
  onCardClick: noop,
}

export default CardsGrid
