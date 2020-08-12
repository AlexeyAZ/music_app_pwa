import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import get from 'lodash/get'

import * as StationsModule from '../../modules/stations'

import { Row, Image, Text } from '../../components'
import { TracksGrid } from '../../containers'
import { CARD_TYPE_STATION } from '../../constants'

const playlistTracksStorageId = 'playlistTracksStorageId'

const StationDetail = () => {
  const { id: stationId } = useParams()
  const dispatch = useDispatch()
  const stationDetail = useSelector(StationsModule.getStationDetailSelector)
  const getStationDetail = useCallback(id => dispatch(StationsModule.getStationDetail(id)), [
    dispatch,
  ])
  const getStationTracks = useCallback(id => dispatch(StationsModule.getStationTracks(id)), [
    dispatch,
  ])

  const stationName = get(stationDetail, 'name')
  const stationArtists = get(stationDetail, 'artists')
  const stationAuthor = get(stationDetail, 'author')
  const stationDescription = get(stationDetail, 'description')

  useEffect(() => {
    getStationDetail({ data: stationId })
  }, [])

  return (
    <div>
      <Row className="ta-center mb-2">
        <Image
          cardSize="fullscreen"
          imageRatio={1}
          napsterImageId={stationId}
          type={CARD_TYPE_STATION}
          napsterImageSize="s"
        />
      </Row>
      <Text>{stationName}</Text>
      <Text>{stationDescription}</Text>
      <Text>Artists: {stationArtists}</Text>
      <Text>Author: {stationAuthor}</Text>
      <TracksGrid
        disableAutoLoad
        getTracksAction={getStationTracks}
        requestParams={{ limit: 5, count: 5 }}
        requestData={stationId}
        storageId={`${playlistTracksStorageId}:${stationId}`}
      />
    </div>
  )
}

StationDetail.propTypes = {}

export default StationDetail
