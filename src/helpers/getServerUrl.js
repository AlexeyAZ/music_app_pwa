import getCurrentApi from './getCurrentApi'

const { localServerUrl, remoteServerUrl } = getCurrentApi()

const getServerUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return localServerUrl
  }
  return remoteServerUrl
}

export default getServerUrl
