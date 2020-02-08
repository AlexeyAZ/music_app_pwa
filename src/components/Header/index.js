import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Box from '../Box'

class Header extends Component {
  renderBackButton = () => {
    const { backButtonText, onBackButtonClick } = this.props
    return (
      <button type="button" onClick={onBackButtonClick}>
        {backButtonText}
      </button>
    )
  }

  renderLeftContent = () => {
    const { hideBackButton, renderLeftContent } = this.props
    if (renderLeftContent) {
      return renderLeftContent()
    }
    if (hideBackButton) {
      return this.renderBackButton()
    }
    return null
  }

  render() {
    const { title, renderRightContent } = this.props
    return (
      <Box display="flex" height={50} justifyContent="space-between" boxShadow="blockShadow">
        <Box>{this.renderLeftContent()}</Box>
        <Box>
          <p>{title}</p>
        </Box>
        <Box>{renderRightContent()}</Box>
      </Box>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  hideBackButton: PropTypes.bool,
  backButtonText: PropTypes.string,
  onBackButtonClick: PropTypes.func,
  renderLeftContent: PropTypes.func,
  renderRightContent: PropTypes.func,
}
Header.defaultProps = {
  title: '',
  hideBackButton: false,
  backButtonText: 'Back',
  onBackButtonClick: noop,
  renderLeftContent: null,
  renderRightContent: noop,
}

export default Header
