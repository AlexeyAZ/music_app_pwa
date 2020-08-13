import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import get from 'lodash/get'

import * as PlaylistsModule from '../../modules/playlists'

import { CommonCard } from '../../components'
import { TracksGrid } from '../../containers'
import { CARD_TYPES } from '../../constants'

const playlistTracksStorageId = 'playlistTracksStorageId'

const PlaylistDetail = () => {
  const { id: playlistId } = useParams()
  const dispatch = useDispatch()
  const playlistDetail = useSelector(PlaylistsModule.getPlaylistDetailSelector)
  const getPlaylistDetail = useCallback((id) => dispatch(PlaylistsModule.getPlaylistDetail(id)), [
    dispatch,
  ])
  const getPlaylistTracks = useCallback((id) => dispatch(PlaylistsModule.getPlaylistTracks(id)), [
    dispatch,
  ])

  const playlistName = get(playlistDetail, 'name')
  const playlistDescription = get(playlistDetail, 'description')

  useEffect(() => {
    getPlaylistDetail({ data: playlistId })
  }, [])

  return (
    <div>
      <div className="mb-2">
        <CommonCard
          borderRadius="s"
          imageSize="s"
          imageRatio={1}
          format="row"
          imageType={CARD_TYPES.PLAYLIST}
          napsterImageId={playlistId}
          title={playlistName}
          titleOverflow={false}
          subtitle={playlistDescription}
          subtitleOverflow={false}
        />
      </div>
      <TracksGrid
        getTracksAction={getPlaylistTracks}
        requestParams={{ limit: 30 }}
        requestData={playlistId}
        storageId={`${playlistTracksStorageId}:${playlistId}`}
      />
    </div>
  )
}

PlaylistDetail.propTypes = {}

export default PlaylistDetail
