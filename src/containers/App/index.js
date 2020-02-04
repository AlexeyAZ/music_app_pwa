import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@xstyled/styled-components'

import { AVAILABLE_API } from 'constants'
import { store, persistor } from 'store'
import { history } from 'config'
import { setCurrentApi, getCurrentApi, initPlayer } from 'helpers'

import routes from '../../routes'

import Routing from '../Routing'
import Layout from '../Layout'

import AppContainer from './AppContainer'

const { apiName } = getCurrentApi()

const DEFAULT_API = 'NAPSTER'

const theme = {
  colors: {
    primary: '#bd4932',
    green: '#fff705',
  },
}

class App extends Component {
  componentDidMount() {
    // initPlayer()
  }
  
  render() {
    if (!apiName) {
      setCurrentApi(AVAILABLE_API[DEFAULT_API])
      window.location.reload()
      return null
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <AppContainer>
                <Layout>
                  <Routing routes={routes} />
                </Layout>
              </AppContainer>
            </Router>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
