import axios from 'axios'

import getCurrentApi from './getCurrentApi'

const { baseUrl, baseVersion } = getCurrentApi()

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/${baseVersion}/`,
  transformResponse: [
    data => {
      // Do whatever you want to transform the data
      if (data.toLowerCase().includes('error')) {
        console.log(`Axios instance error: ${data}`)
      }
      return JSON.parse(data)
    },
  ],
})

export default axiosInstance
