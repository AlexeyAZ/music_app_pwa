import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'

// eslint-disable-next-line no-restricted-globals
console.log(self.__WB_MANIFEST)
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST)

clientsClaim()
skipWaiting()