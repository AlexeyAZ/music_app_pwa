import hasIn from 'lodash/hasIn'

const entitiesNames = [
  'tracks',
  'albums',
  'artists',
  'genres',
  'stations',
  'playlists',
  'favorites.data.tracks',
  'search.data.tracks',
]

const getEntityDataPath = data => entitiesNames.find(entityName => hasIn(data, entityName))

export default getEntityDataPath
