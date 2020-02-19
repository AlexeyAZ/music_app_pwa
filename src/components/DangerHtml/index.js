import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html'

class DangerHtml extends Component {
  cleanHtml = () => {
    const { html } = this.props
    return { __html: sanitizeHtml(html) }
  }

  render() {
    return <span dangerouslySetInnerHTML={this.cleanHtml()} />
  }
}

DangerHtml.propTypes = {
  html: PropTypes.string,
}
DangerHtml.defaultProps = {
  html: '',
}

export default DangerHtml
