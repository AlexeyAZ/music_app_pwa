import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from 'store'
import { history } from 'config'
import { GlobalStyle } from 'styles'

import routes from '../../routes'

import { Routing } from '../Routing'
import Layout from '../Layout'

import AppThemeProvider from './AppThemeProvider'
import AppContainer from './AppContainer'

class App extends Component {
  componentDidMount() {
    // initPlayer()
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppThemeProvider>
            <Router history={history}>
              <AppContainer>
                <GlobalStyle />
                <Layout>{renderRoutes(routes)}</Layout>
              </AppContainer>
            </Router>
          </AppThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
