import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import routes from 'routes'

import { Header, Text } from 'components'

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

  renderRightContent = () => {
    return (
      <Text size="xs">
        <b>Napster ®</b>
      </Text>
    )
  }

  render() {
    if (this.showHeader())
      return (
        <Header
          renderRightContent={this.renderRightContent}
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
