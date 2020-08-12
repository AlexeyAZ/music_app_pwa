import { napsterConfig } from 'config'

const getCurrentApi = () => {
  return {
    ...napsterConfig,
  }
}

export default getCurrentApi
