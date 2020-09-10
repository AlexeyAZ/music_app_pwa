import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import { RoutesContext } from '../../../routes'

import { Header, Text } from '../../../components'

class HeaderContainer extends Component {
  static contextType = RoutesContext

  getHeaderTitle = () => {
    const { location } = this.props
    // eslint-disable-next-line react/destructuring-assignment
    const flatRoutes = this.context.reduce((acc, route) => {
      if (route.routes) {
        const { routes: routeRoutes, ...newRoute } = route
        return [...acc, newRoute, ...route.routes]
      }
      return [...acc, route]
    }, [])
    return get(
      flatRoutes.find((route) => route.path === location.pathname),
      'title',
      ''
    )
  }

  showHeader = () => {
    const { location } = this.props
    return !location.pathname.includes('/login')
  }

  hideBackButton = () => {
    const { location } = this.props
    return !location.pathname.includes('/tracks/')
  }

  handleBackButtonClick = () => {
    const { history } = this.props
    return history.goBack()
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
          onBackButtonClick={this.handleBackButtonClick}
          renderRightContent={this.renderRightContent}
          hideBackButton={this.hideBackButton()}
          title={this.getHeaderTitle()}
        />
      )
    return null
  }
}

HeaderContainer.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(HeaderContainer)
