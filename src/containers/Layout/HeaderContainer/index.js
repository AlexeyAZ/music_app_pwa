import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import routes from 'routes'

import { Header } from 'components'

class HeaderContainer extends Component {
  getHeaderTitle = () => {
    const { location } = this.props
    const flatRoutes = routes.reduce((acc, route) => {
      if (route.routes) {
        const { routes: routeRoutes, ...newRoute } = route
        return [...acc, newRoute, ...route.routes]
      }
      return [...acc, route]
    }, [])
    return get(flatRoutes.find(route => route.path === location.pathname), 'title', '')
  }

  showHeader = () => {
    const { location } = this.props
    return !location.pathname.includes('/login')
  }

  hideBackButton = () => {
    const { location } = this.props
    return !location.pathname.includes('/tracks/')
  }

  render() {
    if (this.showHeader())
      return (
        <Header
          renderLeftContent={this.renderLeftContent}
          hideBackButton={this.hideBackButton()}
          title={this.getHeaderTitle()}
        />
      )
    return null
  }
}

HeaderContainer.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(HeaderContainer)
