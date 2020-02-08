import { napsterConfig, backendConfig } from 'config'

const getCurrentApi = () => {
  return {
    ...napsterConfig,
    ...backendConfig,
  }
}

export default getCurrentApi
