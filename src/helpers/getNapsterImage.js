import { napsterConfig, napsterImageSizes } from '../config'
import { CARD_TYPES } from '../constants'

const { imageServerUrl } = napsterConfig
const extension = 'jpg'

const getNapsterImage = ({ type, id, size = 's' }) => {
  const imageSize = napsterImageSizes[type][size]
  if (type === CARD_TYPES.ARTIST) {
    return `${imageServerUrl}/v2/artists/${id}/images/${imageSize}.${extension}`
  }
  if (type === CARD_TYPES.ALBUM) {
    return `${imageServerUrl}/v2/albums/${id}/images/${imageSize}.${extension}`
  }
  if (type === CARD_TYPES.PLAYLIST) {
    return `${imageServerUrl}/v2/playlists/${id}/artists/images/${imageSize}.${extension}`
  }
  if (type === CARD_TYPES.GENRE) {
    return `${imageServerUrl}/images/${id}/${imageSize}.${extension}`
  }
  if (type === CARD_TYPES.STATION) {
    return `${imageServerUrl}/v2/stations/${id}/images/${imageSize}.${extension}`
  }
  return null
}

export default getNapsterImage
