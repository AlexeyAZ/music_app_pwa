import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ReactNotification from 'react-notifications-component'

import { store, persistor } from 'store'
import { history } from 'config'

import routes from '../../routes'

import Layout from '../Layout'

import AppContainer from './AppContainer'

import 'react-notifications-component/dist/theme.css'

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <AppContainer>
              <ReactNotification />
              <Layout>{renderRoutes(routes)}</Layout>
            </AppContainer>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
