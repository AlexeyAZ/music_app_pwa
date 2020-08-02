import { napsterConfig, napsterImageSizes } from 'config'

const { imageServerUrl } = napsterConfig
const extension = 'jpg'

const getNapsterImage = ({ type, id, size = 's' }) => {
  const imageSize = napsterImageSizes[type][size]
  if (type === 'artist') {
    return `${imageServerUrl}/v2/artists/${id}/images/${imageSize}.${extension}`
  }
  if (type === 'album') {
    return `${imageServerUrl}/v2/albums/${id}/images/${imageSize}.${extension}`
  }
  if (type === 'playlist') {
    return `${imageServerUrl}/v2/playlists/${id}/artists/images/${imageSize}.${extension}`
  }
  if (type === 'genre') {
    return `${imageServerUrl}/images/${id}/${imageSize}.${extension}`
  }
  if (type === 'station') {
    return `${imageServerUrl}/v2/stations/${id}/images/${imageSize}.${extension}`
  }
  return null
}

export default getNapsterImage
