import localforage from 'localforage'

const localStore = localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
  name: 'music_app_db'
})

export default localStorage