import { napsterConfig, napsterImageSizes } from 'config'
import {
  CARD_TYPE_ARTIST,
  CARD_TYPE_ALBUM,
  CARD_TYPE_PLAYLIST,
  CARD_TYPE_GENRE,
  CARD_TYPE_STATION,
} from '../constants'

const { imageServerUrl } = napsterConfig
const extension = 'jpg'

const getNapsterImage = ({ type, id, size = 's' }) => {
  const imageSize = napsterImageSizes[type][size]
  if (type === CARD_TYPE_ARTIST) {
    return `${imageServerUrl}/v2/artists/${id}/images/${imageSize}.${extension}`
  }
  if (type === CARD_TYPE_ALBUM) {
    return `${imageServerUrl}/v2/albums/${id}/images/${imageSize}.${extension}`
  }
  if (type === CARD_TYPE_PLAYLIST) {
    return `${imageServerUrl}/v2/playlists/${id}/artists/images/${imageSize}.${extension}`
  }
  if (type === CARD_TYPE_GENRE) {
    return `${imageServerUrl}/images/${id}/${imageSize}.${extension}`
  }
  if (type === CARD_TYPE_STATION) {
    return `${imageServerUrl}/v2/stations/${id}/images/${imageSize}.${extension}`
  }
  return null
}

export default getNapsterImage
