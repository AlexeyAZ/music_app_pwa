import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

import styles from './styles.module.scss'

// eslint-disable-next-line react/prefer-stateless-function
class Library extends Component {
  render() {
    const { route } = this.props
    return <div className={styles.wrap}>{renderRoutes(route.routes)}</div>
  }
}

Library.propTypes = {
  route: PropTypes.object.isRequired,
}

export default withRouter(Library)
